import { test } from 'node:test';
import assert from 'node:assert/strict';
import { estimateFirestoreBytes, fitCoinImagesToFirestoreLimit, describeSyncError } from './firestorePayloadSize';

const shrinkByHalf = async (dataUrl: string) => dataUrl.slice(0, Math.ceil(dataUrl.length / 2));

test('a coin whose photos exceed the Firestore limit is shrunk until it fits', async () => {
  const big = 'data:image/jpeg;base64,' + 'A'.repeat(700_000);
  const result = await fitCoinImagesToFirestoreLimit({ name: 'China', imageUrl: big, reverseImageUrl: big }, shrinkByHalf);
  assert.ok(estimateFirestoreBytes(result) <= 900_000);
  assert.equal(result.name, 'China');
});

test('a small coin is saved unchanged', async () => {
  const coin = { name: 'Chiasso', imageUrl: 'data:image/jpeg;base64,AAAA', reverseImageUrl: '' };
  let calls = 0;
  const result = await fitCoinImagesToFirestoreLimit(coin, async value => { calls++; return value; });
  assert.deepEqual(result, coin);
  assert.equal(calls, 0);
});

test('photos that cannot be shrunk enough give a clear error instead of silently staying local', async () => {
  const big = 'data:image/jpeg;base64,' + 'A'.repeat(1_200_000);
  await assert.rejects(
    fitCoinImagesToFirestoreLimit({ imageUrl: big }, async value => value),
    /zu gross/,
  );
});

test('Firestore size errors are explained as photos too big', () => {
  assert.equal(describeSyncError('Document exceeds the maximum allowed size of 1,048,576 bytes'), 'Fotos zu gross');
});
