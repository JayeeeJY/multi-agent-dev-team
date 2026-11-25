# [Feature] interface contract

- Revision — [version or commit]
- Owner — [lead]
- Consumers and implementers — [task IDs]

## Interface

| Field | Definition |
| --- | --- |
| Operation | `[METHOD] /path` |
| Request | [Headers, query, and body schema with required fields] |
| Success | [Status, response fields and types] |
| Errors | [Status and body for each expected error] |
| Compatibility | [Existing consumers or migration considerations] |

## Examples and acceptance

Provide a successful request and response, an error response, and a command that verifies the contract. Add a fixture the consumer can use while the implementation is in progress. Record and share interface changes before redispatching dependent tasks.
