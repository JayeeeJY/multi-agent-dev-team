import assert from 'node:assert/strict';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import { responseFor } from './server.mjs';

test('GET hello returns the agreed JSON fields and an ISO timestamp', () => {
  const response = responseFor('GET', '/api/hello?example=true');
  assert.equal(response.status, 200);
  assert.match(response.headers['Content-Type'], /^application\/json/);
  const { message, timestamp } = JSON.parse(response.body);
  assert.equal(message, 'Hello from Multi-Agent Dev Team!');
  assert.equal(new Date(timestamp).toISOString(), timestamp);
});

test('unknown paths return 404 and unsupported methods advertise GET', () => {
  const missing = responseFor('GET', '/other');
  assert.equal(missing.status, 404);
  assert.deepEqual(JSON.parse(missing.body), { error: 'Not found' });
  const rejected = responseFor('POST', '/api/hello');
  assert.equal(rejected.status, 405);
  assert.equal(rejected.headers.Allow, 'GET');
});

test('the page uses the same-origin endpoint and recovers from an HTTP error', async () => {
  const page = responseFor('GET', '/');
  assert.equal(page.status, 200);
  assert.match(page.headers['Content-Type'], /^text\/html/);
  const script = page.body.toString().match(/<script>([\s\S]+)<\/script>/)[1];
  let click;
  let method = 'GET';
  const button = { addEventListener(event, callback) { assert.equal(event, 'click'); click = callback; } };
  const result = {};
  const elements = new Map([['#fetch-message', button], ['#result', result]]);
  runInNewContext(script, {
    document: { querySelector: selector => elements.get(selector) },
    fetch: async (target) => {
      assert.equal(target, '/api/hello');
      const response = responseFor(method, target);
      return { ok: response.status === 200, status: response.status, json: async () => JSON.parse(response.body) };
    },
  });
  await click();
  assert.match(result.textContent, /^Hello from Multi-Agent Dev Team!\n\d{4}-/);
  assert.equal(button.disabled, false);
  method = 'POST';
  await click();
  assert.match(result.textContent, /HTTP 405/);
  assert.equal(button.disabled, false);
});
