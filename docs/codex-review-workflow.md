# Admin Web Codex Review Workflow

This document defines the current Codex workflow for `skin-analyzer-admin-web`. It supersedes older transient report and mandatory changed-files zip rules for Codex implementation/review work.

## 1. Formal Roles

- Codex Implementer: makes the scoped repository change, runs scoped validation, creates the frozen Compact Review Packet, then stops editing.
- Codex Independent Reviewer: verifies the frozen packet and reviews the exact scoped change. Reviewer is read-only.
- ChatGPT Final Gatekeeper: reviews `review-result.zip`, checks reviewer quality and evidence sufficiency, and decides whether the exact frozen target may proceed.

`Codex A` and `Codex B` are deprecated informal aliases. Do not use them as operative names in instructions, filenames, handoffs, or verdict rules.

## 2. Thread And Project Rules

New implementation Sprint:

- Role: Codex Implementer
- Thread: New Thread
- Thread Name: `Implementer — <Task Name>`
- Codex Project: the Project that owns the repository being modified

Fixes for findings in the same Sprint:

- Role: Codex Implementer
- Thread: Existing Implementer Thread
- Thread Name: original `Implementer — <Task Name>`

First independent review:

- Role: Codex Independent Reviewer
- Thread: New Thread
- Thread Name: `Independent Reviewer — <Task Name>`
- Codex Project: same Project/repository as the Implementer

Re-review after fixes:

- Role: Codex Independent Reviewer
- Thread: Existing Reviewer Thread
- Thread Name: original `Independent Reviewer — <Task Name>`

For an uncommitted frozen worktree, Reviewer uses a Local Thread in the same Project and Implementer must stop writing during review. For an exact committed checkpoint or feature branch, Reviewer may use a separate worktree pinned to the exact review commit SHA, and the base SHA plus review SHA must be recorded.

Do not recommend creating a second Codex Project pointing at the same live folder as an isolation mechanism.

## 3. Implementer Artifact Root

Implementer artifacts live under:

```text
/tmp/skin-analyzer-codex-reports/skin-analyzer-admin-web/
```

Use Bangkok time: `Asia/Bangkok`, UTC+07:00.

Do not duplicate long user-facing summaries into timestamped report files by default. Do not write transient Codex review reports into repository `docs/`; repository docs are persistent project documentation.

## 4. Compact Review Packet

For every implementation Sprint, Codex Implementer creates:

```text
Compact_Review_Packet_<TOPIC>_<DD-MM-YYYY_HH-MM-SS>/
```

The normal packet contains exactly:

```text
01-sprint-contract.txt
02-implementer-summary.md
03-changed-files.lst
04-task-diff.patch
05-automated-checks.txt
06-risk-flags.md
07-final-git-state.txt
08-review-packet-sha256.txt
review-packet.zip
```

Rules:

- `04-task-diff.patch` contains only the Sprint delta against its frozen base.
- `05-automated-checks.txt` records command, working directory, exit code, and result.
- `06-risk-flags.md` covers applicable areas: authentication/security, API contract, UI/runtime, camera, AI/model, dependency, migration/data, concurrency, accessibility, visual QA, and architecture boundary.
- `07-final-git-state.txt` records repository root, remote, branch, HEAD/base SHA, changed paths, staged paths, untracked paths, task-diff hash, and `worktree frozen: YES`.
- `08-review-packet-sha256.txt` is created last and hashes files 01 through 07.
- `review-packet.zip` contains only files 01 through 08.
- Do not include source files, screenshots, videos, Playwright traces, `test-results`, `.next`, `node_modules`, env files, or full artifacts in the Compact Review Packet.
- Final Implementer summary prints exact packet path, exact packet SHA-256, frozen diff or review SHA, and `worktree frozen: YES`.
- When exact packet path and SHA are available, Reviewer must not discover the packet by wildcard or `newest matching` lookup.
- Implementer stops editing after packet hash generation.

## 5. Changed-Files Zip Policy

`changed-files.zip` is conditional.

Create it only when:

- Sprint Contract requires it.
- ChatGPT Final Gatekeeper explicitly requests it.
- Reviewer cannot access the same frozen repository.
- A portable bundle is useful for high-risk changes, including authentication/security, API contract, dependency, migration/data, camera/runtime, AI/model, or architecture boundary.
- Checkpoint/release audit requires it.

When created, include only current Sprint changed repository files, preserve repository-relative paths, and exclude `.env*`, secrets, `node_modules`, `.next`, caches, build output, screenshots, videos, traces, Playwright reports, test results, uploaded assets, model files, generated review artifacts, and unrelated files. Do not include `__MACOSX`, `._*`, or `.DS_Store`.

Screenshots and browser evidence are separate artifacts, never source ZIP content unless the user explicitly requests otherwise.

## 6. Visual Evidence Integration

Admin Web visual requirements remain active:

- Screenshot artifacts remain under `/tmp/skin-analyzer-codex-reports/skin-analyzer-admin-web/`.
- UI tasks retain dedicated screenshot folders using Bangkok timestamps.
- Screenshots, traces, videos, Playwright reports, and `test-results` stay outside the repository.
- Screenshots are not placed in the Compact Review Packet.
- Implementer summary and Reviewer evidence index reference exact screenshot folder/file paths and hashes when applicable.
- `Documentation Impact Candidate` remains mandatory for Admin Web implementation/test/smoke/UI work and belongs in `02-implementer-summary.md`.
- If there is no documentation impact, use exactly: `Documentation Impact Candidate: none`.
- Technical test success remains distinct from visual acceptance.
- UI work without required screenshot evidence cannot receive Reviewer `PASS` unless the Sprint is docs-only, screenshots are demonstrably impossible with an accepted reason, or the user explicitly waives them.

## 7. Reviewer Rules

Reviewer receives:

- Exact absolute `review-packet.zip` path.
- Expected SHA-256.
- Base/frozen diff SHA or review commit SHA.

Path or hash mismatch means:

```text
Verdict:
BLOCKED
```

Reviewer reads, in order:

1. Sprint Contract.
2. Risk flags.
3. Changed files.
4. Exact diff.
5. Automated checks.
6. Changed source and adjacent call sites according to risk.
7. Implementer summary last.

Reviewer is read-only and must not edit, format, stage, commit, push, reset, restore, stash, or clean.

Reviewer output root:

```text
/tmp/skin-analyzer-codex-reports/skin-analyzer-admin-web_review/
```

Normal reviewer output:

```text
01-review-scope-and-packet-verification.md
02-evidence-checked.tsv
03-review-findings.tsv
04-reviewer-report.md
05-review-checks.txt
06-reviewed-input-sha256.txt
07-review-verdict.txt
review-result.zip
```

`review-result.zip` contains only files 01 through 07.

## 8. Risk-Based Review

Low risk:

- Sprint Contract.
- Exact diff.
- Changed files.
- Automated checks.
- Scope.

Medium risk:

- Add call sites.
- API/runtime wiring.
- Negative/error paths.
- Integration tests.
- Accessibility.
- Browser behavior.

High risk:

- Authentication/security.
- API contract.
- Dependency upgrade.
- Migration/data.
- Camera/runtime.
- AI/model.
- Concurrency.
- Architecture boundary.

High-risk review must inspect changed source plus necessary adjacent context and targeted tests.

Reviewer explicitly checks silent failures, including ignored errors, fail-open behavior, unintended fallback, invalid config accepted, partial remote success followed by local failure, missing security audit/telemetry, timeout or cancellation not propagated, lost promise rejection or async error, unsafe retry of non-idempotent action, response/state update before validation completes, stale response overriding newer state, feature-gate mismatch, default/zero value silently changing behavior, auth state cleared or restored incorrectly, refresh loops, and credential leakage to storage/logs.

Do not require a full repository re-audit unless risk or evidence justifies it.

## 9. Verdict Flow

Codex Implementer verdicts:

- `PASS`
- `NEEDS_FIX`
- `BLOCKED`

Codex Independent Reviewer verdicts:

- `PASS`
- `NEEDS_FIX`
- `BLOCKED`

ChatGPT Final Gatekeeper verdicts:

- `GO`
- `NEEDS_FIX`
- `BLOCKED`

Historical or visual evidence labels such as `PASS_WITH_NOTES` may remain only when clearly labeled as a historical checkpoint status or visual evidence assessment. They must not be presented as the current Independent Reviewer or Final Gatekeeper verdict.

## 10. ChatGPT Final Gatekeeper

Input is normally `review-result.zip`.

ChatGPT Final Gatekeeper verifies Reviewer quality and evidence sufficiency, performs targeted escalation for high-risk gaps, and distinguishes merge-blocking bugs, risks requiring evidence, and deferred improvements.

If verdict is `NEEDS_FIX`, return actionable findings to the Existing Implementer Thread. Fixes produce a new frozen Compact Review Packet, and the Existing Reviewer Thread performs re-review.

`GO` is required before commit/merge authorization for the exact frozen target. Any source, diff, or hash change invalidates the prior review.

## 11. Commit Gate

Codex Implementer and Codex Independent Reviewer do not authorize commit or merge.

Do not stage, commit, or push unless the user explicitly asks after ChatGPT Final Gatekeeper returns `GO` for the exact frozen target.

Stage explicit paths only. Never use `git add .` or `git add -A`.

Fixes after `NEEDS_FIX` require a new packet and re-review.

Commit messages must state title, what/why, and deferred/out-of-scope safety behavior. Never push without explicit user instruction.
