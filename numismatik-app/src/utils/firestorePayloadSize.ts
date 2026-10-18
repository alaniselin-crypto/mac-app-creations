// Firestore lehnt Dokumente über 1 MiB ab. Münzen speichern Fotos als Text im Dokument,
// darum werden die Fotos vor dem Speichern so lange verkleinert, bis das Dokument sicher passt.
export const FIRESTORE_SAFE_DOCUMENT_BYTES = 900_000;

export function estimateFirestoreBytes(value: unknown): number {
  return new TextEncoder().encode(JSON.stringify(value)).length;
}

export type ImageCompressor = (dataUrl: string, maxDim: number, quality: number) => Promise<string>;

const SHRINK_STEPS: Array<[number, number]> = [
  [1100, 0.75],
  [900, 0.7],
  [700, 0.65],
  [520, 0.6],
  [400, 0.55],
];

export async function fitCoinImagesToFirestoreLimit<T extends { imageUrl?: string; reverseImageUrl?: string }>(
  data: T,
  compress: ImageCompressor,
  limit = FIRESTORE_SAFE_DOCUMENT_BYTES,
): Promise<T> {
  let current = data;
  for (const [maxDim, quality] of SHRINK_STEPS) {
    if (estimateFirestoreBytes(current) <= limit) return current;
    const [imageUrl, reverseImageUrl] = await Promise.all([
      current.imageUrl ? compress(current.imageUrl, maxDim, quality) : Promise.resolve(current.imageUrl),
      current.reverseImageUrl ? compress(current.reverseImageUrl, maxDim, quality) : Promise.resolve(current.reverseImageUrl),
    ]);
    current = { ...current, imageUrl, reverseImageUrl };
  }
  if (estimateFirestoreBytes(current) > limit) {
    throw new Error('Die Fotos dieser Münze sind zu gross für die Cloud. Bitte kleinere Fotos verwenden.');
  }
  return current;
}

// Übersetzt technische Speicherfehler in einen kurzen, verständlichen Grund.
export function describeSyncError(message: string | undefined): string {
  const text = (message || '').toLowerCase();
  if (!text) return 'Noch nicht gesendet';
  if (text.includes('zu gross') || text.includes('maximum allowed size') || text.includes('exceeds')) return 'Fotos zu gross';
  if (text.includes('permission') || text.includes('insufficient')) return 'Keine Berechtigung (bitte neu anmelden)';
  if (text.includes('offline') || text.includes('unavailable') || text.includes('network')) return 'Keine Internetverbindung';
  if (text.includes('tombstone')) return 'Münze wurde auf einem anderen Gerät gelöscht';
  if (text.includes('undefined')) return 'Leeres Feld abgelehnt';
  return 'Speichern fehlgeschlagen';
}
