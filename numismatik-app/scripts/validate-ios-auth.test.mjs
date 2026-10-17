import assert from 'node:assert/strict';
import test from 'node:test';
import { validateIosAuthConfig } from './validate-ios-auth.mjs';

test('rejects a native config without the Google provider shown missing on iPhone', () => {
  assert.throws(() => validateIosAuthConfig({ plugins: { FirebaseAuthentication: { skipNativeAuth: true, providers: [] } } }), /Google fehlt/);
});

test('accepts Google enabled with the shared web Firebase session', () => {
  assert.doesNotThrow(() => validateIosAuthConfig({ plugins: { FirebaseAuthentication: { skipNativeAuth: true, providers: ['google.com'] } } }));
});

test('rejects a separate native Firebase session', () => {
  assert.throws(() => validateIosAuthConfig({ plugins: { FirebaseAuthentication: { skipNativeAuth: false, providers: ['google.com'] } } }), /dieselbe Firebase-Sitzung/);
});