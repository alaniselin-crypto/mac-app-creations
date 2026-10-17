import assert from 'node:assert/strict';
import test from 'node:test';
import { definedFirestoreFields } from './definedFirestoreFields';

test('coins without Google Drive IDs omit undefined fields before synchronization', () => {
  const result = definedFirestoreFields({ id: 'sync-coin', catalogNumber: '00010', driveFrontFileId: undefined, driveBackFileId: undefined });
  assert.deepEqual(result, { id: 'sync-coin', catalogNumber: '00010' });
});

test('synchronization retains existing Drive IDs, false flags and empty photos', () => {
  assert.deepEqual(definedFirestoreFields({ driveFrontFileId: 'front-id', driveBackFileId: 'back-id', driveFrontDirty: false, imageUrl: '' }), {
    driveFrontFileId: 'front-id', driveBackFileId: 'back-id', driveFrontDirty: false, imageUrl: '',
  });
});