import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const index = await readFile(new URL('./index.html', import.meta.url));

function json(status, payload, headers = {}) {
  return {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...headers },
    body: JSON.stringify(payload),
  };
}

export function responseFor(method, target) {
  const [pathname] = target.split('?', 1);
  if (pathname !== '/' && pathname !== '/api/hello') {
    return json(404, { error: 'Not found' });
  }
  if (method !== 'GET') {
    return json(405, { error: 'Method not allowed' }, { Allow: 'GET' });
  }
  if (pathname === '/') {
    return {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      body: index,
    };
  }
  return json(200, {
    message: 'Hello from Multi-Agent Dev Team!',
    timestamp: new Date().toISOString(),
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? '3000');
  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    console.error('PORT must be an integer between 0 and 65535.');
    process.exitCode = 1;
  } else {
    const server = createServer((request, response) => {
      const result = responseFor(request.method, request.url);
      response.writeHead(result.status, result.headers);
      response.end(result.body);
    });
    server.on('error', error => {
      console.error(`Hello API could not start: ${error.message}`);
      process.exitCode = 1;
    });
    server.listen(port, '127.0.0.1', () => {
      console.log(`Hello API · http://127.0.0.1:${server.address().port}`);
    });
  }
}
