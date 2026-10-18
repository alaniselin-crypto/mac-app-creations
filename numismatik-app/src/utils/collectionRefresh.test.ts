import assert from 'node:assert/strict';
import { test } from 'node:test';
import { startCollectionRefresh } from './collectionRefresh';

const tick = () => new Promise(resolve => setTimeout(resolve, 0));

test('two open devices receive changed coin counts and corrected pictures without signing in again', async () => {
  let cloud = [{ id: 'a', imageUrl: 'wrong.jpg' }];
  const notifications: (() => void)[] = [];
  const devices: typeof cloud[] = [[], []];
  const controllers = devices.map((_, index) => startCollectionRefresh({
    refresh: async () => { devices[index] = cloud.map(coin => ({ ...coin })); },
    subscribe: changed => { notifications.push(changed); return () => {}; },
    onError: error => { throw error; },
  }));
  notifications.forEach(changed => changed());
  await tick();
  assert.equal(devices[0].length, 1);
  cloud = [{ id: 'a', imageUrl: 'correct.jpg' }, { id: 'b', imageUrl: 'second.jpg' }];
  notifications.forEach(changed => changed());
  await tick();
  assert.deepEqual(devices[0], cloud);
  assert.deepEqual(devices[1], cloud);
  controllers.forEach(controller => controller.stop());
});

test('notifications arriving during a fetch cause another fetch without concurrent requests', async () => {
  let notify = () => {};
  let release: (() => void) | undefined;
  let calls = 0;
  const controller = startCollectionRefresh({
    refresh: async () => {
      calls++;
      if (calls === 1) await new Promise<void>(resolve => { release = resolve; });
    },
    subscribe: changed => { notify = changed; return () => {}; },
    onError: error => { throw error; },
  });
  notify();
  notify();
  assert.equal(calls, 1);
  release?.();
  await tick();
  assert.equal(calls, 2);
  controller.stop();
  notify();
  await tick();
  assert.equal(calls, 2);
});

test('a failed fetch leaves previous data intact and a reconnect request can recover', async () => {
  let fail = true;
  let count = 1;
  let errors = 0;
  let unsubscribed = false;
  const controller = startCollectionRefresh({
    refresh: async () => {
      if (fail) throw new Error('offline');
      count = 2;
    },
    subscribe: () => () => { unsubscribed = true; },
    onError: () => { errors++; },
  });
  await controller.request();
  assert.equal(count, 1);
  assert.equal(errors, 1);
  fail = false;
  await controller.request();
  assert.equal(count, 2);
  controller.stop();
  assert.equal(unsubscribed, true);
});