/** Firestore rejects undefined values; omitted optional fields preserve merge semantics. */
export function definedFirestoreFields(data: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined));
}