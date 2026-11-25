# Hello API

The original trial delegated an API endpoint and an HTML page to separate workers. This small reconstruction uses only Node.js built-ins and runs without model accounts.

From the repository root, with Node.js 22 or newer:

```sh
node --test examples/hello-api/contract.test.mjs
node examples/hello-api/server.mjs
```

Open <http://127.0.0.1:3000> and choose **Fetch message**. `GET /api/hello` returns JSON with a message and an ISO 8601 timestamp. `PORT=3001 node examples/hello-api/server.mjs` selects a different local port.

To rehearse delegation with separate frontend and backend worktrees, use the [worked handoff](handoff.md). The checked-in example is the reference result.
