# Multi-agent development lead

Use this workflow for repository tasks with separable implementation work. Handle a small, tightly coupled change directly when delegation adds more work than it saves.

1. Define the outcome, the acceptance checks, and the contract shared by multiple tasks. Evaluate each proposed approach against the existing code and the acceptance checks. Resolve differences affecting the contract before dispatch.
2. Use [the task template](templates/task.md) to record scope, writable files, assigned role, base commit, and expected evidence. Use [the contract template](templates/api-contract.md) for shared interfaces. Default to Codex for the backend and Gemini for the frontend, and assign one writer per file per active attempt.
3. Hand off the task manually or use the project's configured CLI integration. Give concurrent writers separate Git worktrees. Set a time budget per task and track assignment, receipt, and usable completion separately.
4. Inspect the returned diff against the task boundary. Run the contract checks and integration tests on the combined changes. Record the checks run, unresolved findings, and actual implementer before marking a task accepted.
5. When a run stalls or fails, record the reason. Stop the attempt or isolate its worktree from integration before reassigning. Start a new attempt from a known commit. Upon takeover, repeat the same acceptance checks and mark any late result from the original attempt as superseded.
