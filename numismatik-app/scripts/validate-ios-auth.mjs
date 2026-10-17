export function validateIosAuthConfig(config) {
  const auth = config?.plugins?.FirebaseAuthentication;
  if (!auth?.providers?.includes('google.com')) {
    throw new Error('Google fehlt in der iPhone-Konfiguration. Bitte npm run prepare:ios ausführen.');
  }
  if (auth.skipNativeAuth !== true) {
    throw new Error('Die iPhone-Anmeldung muss dieselbe Firebase-Sitzung wie die Sammlung verwenden.');
  }
}