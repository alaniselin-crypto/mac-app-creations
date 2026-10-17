import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { validateIosAuthConfig } from './validate-ios-auth.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
for (const args of [['run', 'build:ios'], ['exec', '--', 'cap', 'sync', 'ios']]) {
  const result = spawnSync(npm, args, { cwd: root, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

const config = JSON.parse(readFileSync(new URL('../ios/App/App/capacitor.config.json', import.meta.url), 'utf8'));
validateIosAuthConfig(config);
console.log('iPhone vorbereitet: Google-Anbieter enthalten. Jetzt in Xcode ein neues Archiv erstellen.');