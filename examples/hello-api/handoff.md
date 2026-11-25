# Hello API · Worked handoff

This public example reconstructs the task boundaries from the March 2026 trial. Start two isolated worktrees from the same commit for the exercise, and keep the baseline outside both worktrees for comparison. The files in this directory show the finished example. [Historical notes](../../docs/history.md)

From the root of a clone with a committed baseline, run these commands to create sibling worktrees.

```sh
git worktree add -b hello/backend ../hello-backend HEAD
git worktree add -b hello/frontend ../hello-frontend HEAD
```

Give each worker its own directory and the matching task below. To practice a change against the shipped baseline, add a `version` string set to `"v1"` to the response and show it on the page. Write the contract update before sending both tasks.

## Contract · HELLO-API v1

| Field | Definition |
| --- | --- |
| Endpoint | `GET /api/hello`, served on the same origin as `/` |
| Request | No body |
| Success | `200` with JSON `{ "message": "Hello from Multi-Agent Dev Team!", "timestamp": "2026-03-18T00:00:00.000Z" }`, using the actual server time |
| Unsupported method | `405`, JSON error and `Allow: GET` |
| Unknown path | `404` with a JSON error |

## BE-001 · Backend

- Assign to Codex. Work only in `server.mjs` and the contract checks in `contract.test.mjs`.
- Implement `/api/hello`, serve the existing page at `/`, and bind to loopback.
- Run `node --test examples/hello-api/contract.test.mjs`. Report the changed files and test output to the lead.

## FE-001 · Frontend

- Assign to Gemini. Work only in `index.html`.
- Start with a sample response from the contract. The button calls `/api/hello`, displays both fields, shows an error on failure, and becomes available again when the request ends.
- Verify the success and error states. Report the changed file and any check that remains open.

## Lead review

Inspect each worktree's diff and combine the changes in an integration branch. Run the contract checks and try the button in a browser. Record both the assigned worker and the actual implementer. If the backend worker stalls, isolate or stop that attempt before assigning a replacement, then rerun the same checks on the replacement.
