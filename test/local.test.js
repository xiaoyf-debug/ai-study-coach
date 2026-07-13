import test from 'node:test';
import assert from 'node:assert/strict';

test('Node runtime supports fetch for optional AI requests', () => {
  assert.equal(typeof fetch, 'function');
});
