# AGENTS.md

This file is the source of truth for future Codex work in `skin-analyzer-admin-web`.

## 1. Project Scope

- This repository is the private Admin Web for Skin Analyzer.
- It is for internal/admin use only.
- It is not the public marketing or user-facing web app.
- It is not the Admin Backend.
- It is not Engine v2, K.2M, camera, model, or runtime work.
- Do not touch sibling projects from this repository.

## 2. Language and Artifact Rules

- Final user-facing summaries from Codex Implementer and Codex Independent Reviewer must be in Thai.
- Stable filenames, commands, paths, hashes, section labels, verdict tokens, TSV headers, code, API fields, and identifiers may remain English.
- Codex prompts and durable policy text may be in English.
- Use Bangkok time for Admin Web artifacts: `Asia/Bangkok`, UTC+07:00.
- Implementer artifact root:
  `/tmp/skin-analyzer-codex-reports/skin-analyzer-admin-web/`
- Independent Reviewer artifact root:
  `/tmp/skin-analyzer-codex-reports/skin-analyzer-admin-web_review/`
- Do not duplicate long user-facing summaries into timestamped report files by default.
- Do not write transient Codex review reports into repository `docs/`.
- Repository docs are persistent project documentation, not temporary review output.
- The current Codex review workflow is documented in `docs/codex-review-workflow.md`. If older repo docs or skill resource examples conflict with Codex artifact or review workflow rules, this `AGENTS.md` file and `docs/codex-review-workflow.md` govern unless a later accepted contract changes them.

For every implementation Sprint, Codex Implementer creates a frozen Compact Review Packet under the Implementer artifact root:

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

- `04-task-diff.patch` contains only the Sprint delta against its frozen base.
- `05-automated-checks.txt` records command, working directory, exit code, and result.
- `06-risk-flags.md` covers applicable risk areas, including authentication/security, API contract, UI/runtime, camera, AI/model, dependency, migration/data, concurrency, accessibility, visual QA, and architecture boundary.
- `07-final-git-state.txt` records repository root, remote, branch, HEAD/base SHA, changed paths, staged paths, untracked paths, task-diff hash, and `worktree frozen: YES`.
- `08-review-packet-sha256.txt` is created last and hashes files 01 through 07.
- `review-packet.zip` contains only files 01 through 08.
- Do not include source files, screenshots, videos, Playwright traces, `test-results`, `.next`, `node_modules`, env files, or full artifacts in the Compact Review Packet.
- Final Implementer summaries must print the exact packet path, exact packet SHA-256, frozen diff or review SHA, and `worktree frozen: YES`.
- When exact packet path and SHA are available, Reviewer must not discover the packet by wildcard or `newest matching` lookup.
- Codex Implementer stops editing after packet hash generation.

`changed-files.zip` is conditional. Create it only when the Sprint Contract requires it, ChatGPT Final Gatekeeper explicitly requests it, Reviewer cannot access the same frozen repository, a portable bundle is useful for high-risk changes, or checkpoint/release audit requires it.

When a changed-files zip is created:

- Include only current Sprint changed repository files.
- Preserve repository-relative paths.
- Exclude every `.env*`, secrets, `node_modules`, `.next`, caches, build output, screenshots, videos, traces, Playwright reports, test results, uploaded assets, model files, generated review artifacts, and unrelated files.
- Do not include `__MACOSX`, `._*`, or `.DS_Store`.

Browser workflow screenshots and browser artifacts must be written outside the repo under the Implementer artifact root. Each UI task that captures screenshots must create a dedicated screenshot folder:

```text
<TOPIC>_screenshots_<DD-MM-YYYY_HH-MM-SS>
```

Suggested pattern:

```sh
SCREENSHOT_TS=$(TZ="Asia/Bangkok" date +"%d-%m-%Y_%H-%M-%S")
SCREENSHOT_DIR="/tmp/skin-analyzer-codex-reports/skin-analyzer-admin-web/<TOPIC>_screenshots_${SCREENSHOT_TS}"
mkdir -p "$SCREENSHOT_DIR"
```

- Do not write screenshots, browser traces, Playwright reports, videos, `test-results`, or temporary visual artifacts into the repo.
- Do not include screenshots or browser workflow artifacts in changed-files zips unless the user explicitly asks.
- Implementer summaries and Reviewer evidence indexes must reference exact screenshot folder/file paths and hashes when applicable.
- If no screenshots are generated, Implementer summaries must say:
  `Screenshot artifact path: none, no screenshots generated for this task.`

## 3. Execution Rules

- Always start with:
  - `pwd`
  - `git rev-parse --show-toplevel`
  - `git status --short --branch`
  - `git diff --name-only`
  - `git diff --cached --name-only`
  - `git ls-files --others --exclude-standard`
- Do not add ignored exit codes to mandatory startup commands.
- If `pwd` is not the expected Admin Web project path, stop.
- Stop on wrong repository, staged files, conflicted state, unsafe Git operation in progress, or unexpected dirty/untracked files unless the Sprint Contract explicitly allows them.
- Do not use `git add .`.
- Do not use `git add -A`.
- Do not stage, commit, or push unless explicitly requested.
- Do not delete, reset, restore, clean, stash, switch branches, merge, rebase, cherry-pick, revert, or overwrite user changes without approval.
- Do not touch sibling projects.
- Keep every UI task small and reviewable.
- Automated checks are Sprint/risk specific.
- For TypeScript/Next.js code changes, inspect current package scripts and use applicable commands, normally including focused tests, broader tests when risk requires, typecheck, lint, build, and `git diff --check`.
- Do not invent a package script that does not exist.
- For docs-only process changes, no UI screenshots or app build are required unless the changed content makes them necessary; run textual consistency checks and `git diff --check`.
- A skipped required check cannot be reported as `PASS`.
- Every Admin Web implementation, test, smoke, or UI Sprint must include `Documentation Impact Candidate` in `02-implementer-summary.md`.
- If there is no documentation impact, write exactly: `Documentation Impact Candidate: none`.
- Do not update `docs/admin-web-current-ui-implementation-state.md` inside implementation, test, smoke, or UI tasks unless explicitly scoped as docs sync.
- Documentation impact includes accepted scope changes, caveats or limitations, temporary assets, deferred behavior, not-final status, rejected output or references, changed next-step recommendations, and foundation changes such as dependencies, test harnesses, auth patterns, form patterns, or API patterns.
- Separate docs sync or addendum tasks should update current-state docs after user or ChatGPT Final Gatekeeper review.
- Technical `PASS` is not user, visual, or ChatGPT Final Gatekeeper acceptance.

Expected path:

```text
/Users/sompong/Dev/Project skin analyzer/skin-analyzer-ux-ui/skin-analyzer-admin-web
```

## 4. Review Workflow Rules

Formal role names:

- Codex Implementer
- Codex Independent Reviewer
- ChatGPT Final Gatekeeper

Deprecated informal aliases must not be used as operative role names in instructions, filenames, handoffs, or verdict rules.

Thread and Project defaults:

- New implementation Sprint: Codex Implementer, New Thread, `Implementer — <Task Name>`, same Codex Project that owns the repository being modified.
- Fixes for findings in the same Sprint: Codex Implementer, Existing Implementer Thread, original `Implementer — <Task Name>`.
- First independent review: Codex Independent Reviewer, New Thread, `Independent Reviewer — <Task Name>`, same Codex Project/repository as the Implementer.
- Re-review after fixes: Codex Independent Reviewer, Existing Reviewer Thread, original `Independent Reviewer — <Task Name>`.
- Uncommitted frozen worktree review uses a Local Thread in the same Project; Implementer must stop writing during review.
- Exact committed checkpoint or feature-branch review may use a separate worktree pinned to the exact review commit SHA; base SHA and review SHA must be recorded.
- Do not recommend creating a second Codex Project pointing at the same live folder as an isolation mechanism.

Reviewer handoff requirements:

- Reviewer receives the exact absolute `review-packet.zip` path, expected SHA-256, and base/frozen diff SHA or review commit SHA.
- Path or hash mismatch means Reviewer verdict is `BLOCKED`.
- Reviewer reads Sprint Contract, risk flags, changed files, exact diff, automated checks, changed source and adjacent call sites according to risk, then Implementer summary last.
- Reviewer is read-only and must not edit, format, stage, commit, push, reset, restore, stash, or clean.

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

Risk-based review:

- Low risk: Sprint Contract, exact diff, changed files, automated checks, and scope.
- Medium risk: add call sites, API/runtime wiring, negative/error paths, integration tests, accessibility, and browser behavior.
- High risk: authentication/security, API contract, dependency upgrade, migration/data, camera/runtime, AI/model, concurrency, or architecture boundary. High-risk review must inspect changed source plus necessary adjacent context and targeted tests.

Reviewer explicitly checks silent failures, including ignored errors, fail-open behavior, unintended fallback, invalid config accepted, partial remote success followed by local failure, missing security audit/telemetry, timeout or cancellation not propagated, lost promise rejection or async error, unsafe retry of non-idempotent action, response/state update before validation completes, stale response overriding newer state, feature-gate mismatch, default/zero value silently changing behavior, auth state cleared or restored incorrectly, refresh loops, and credential leakage to storage/logs.

Formal workflow verdicts:

- Codex Implementer: `PASS`, `NEEDS_FIX`, `BLOCKED`
- Codex Independent Reviewer: `PASS`, `NEEDS_FIX`, `BLOCKED`
- ChatGPT Final Gatekeeper: `GO`, `NEEDS_FIX`, `BLOCKED`

Historical or visual evidence labels such as `PASS_WITH_NOTES` may remain only when clearly labeled as a historical checkpoint status or visual evidence assessment. They must not be presented as the current Independent Reviewer or Final Gatekeeper verdict.

ChatGPT Final Gatekeeper normally receives `review-result.zip`, verifies reviewer quality and evidence sufficiency, and returns `GO`, `NEEDS_FIX`, or `BLOCKED`. `GO` is required before commit or merge authorization for the exact frozen target. Any source, diff, or hash change invalidates the prior review.

If ChatGPT Final Gatekeeper returns `NEEDS_FIX`, return actionable findings to the Existing Implementer Thread. Fixes produce a new frozen Compact Review Packet, and the Existing Reviewer Thread performs re-review.

## 5. UI/UX Safety Rules

- Future Admin Web UI tasks must read `docs/admin-web-current-ui-implementation-state.md` after `AGENTS.md` and before implementation.
- Future Admin Web UI, Flux Sky, Tailwind, shadcn/ui, typography, motion, layout, or visual QA tasks must also read `.agents/skills/skin-analyzer-admin-tailwind-shadcn-governor/SKILL.md` before implementation.
- `docs/admin-web-current-ui-implementation-state.md` is the current accepted UI and handoff state.
- If that document conflicts with actual code, inspect code and report the conflict before editing.
- Future Admin Web UI implementation tasks must include a `Documentation Impact Candidate` section in `02-implementer-summary.md`.
- Do not update `docs/admin-web-current-ui-implementation-state.md` inside a UI implementation task unless that task explicitly scopes a docs sync.
- Technical `PASS` is not user visual acceptance.
- If a UI task leaves temporary assets, known limitations, deferred visual work, or rejected references, report them as docs sync candidates.
- Future docs sync tasks must use only user-approved or ChatGPT Final Gatekeeper-approved notes.
- Future UI tasks must read `docs/admin-web-brand-visual-direction.md` before implementation.
- Future UI tasks must read `docs/admin-web-theme-token-contract.md` before implementation.
- Admin Web visual system is independent from Public Web.
- Do not use Public Web colors or theme as the Admin Web base.
- Follow the `Modern AI Skin Analysis Admin 2026` direction with the accepted Flux Sky update.
- The previous dark navy sidebar and blue/cyan AI accents are historical implementation context only.
- Active visual direction is `Flux Sky`: light / neutral Flux-like sidebar + shadcn/Tailwind sky action/event states.
- Do not use the old dark navy/sidebar foundation, old Admin Web dark sidebar, Tailwind blue, or UI Colors blue as the Flux Sky production target unless a later accepted direction explicitly changes it.
- Do not implement dark mode, a theme toggle, `next-themes`, or app-level `prefers-color-scheme` theme switching unless a future explicit contract changes this.
- Use Admin Web semantic theme tokens for UI surfaces, text, borders, and actions.
- Do not add raw hex colors in components unless the task explicitly scopes a one-off SVG/visual detail.
- Stop and report if a task needs new colors outside existing Admin Web tokens.
- Logo direction is Logo B: Semi-realistic App Icon Style with a front-facing AI skin scan.
- Do not use a generic cube or hex mark for Admin Web branding.
- No UI implementation task can pass full `PASS` if it ignores the brand direction addendum.
- Do not redesign outside the scoped page or component.
- Do not create new colors outside approved design tokens.
- Do not add heavy shadows, gradients, glassmorphism, or animations unless approved.
- Do not modify global styles unless the task explicitly owns them.
- Do not implement multiple major screens in one task unless explicitly requested.
- Always preserve a clean SaaS/admin look.
- Always provide screenshot or visual evidence for UI changes after the scaffold exists.

## 6. shadcn/ui Rules

- Prefer existing project components and shadcn/ui primitives when suitable.
- Add missing shadcn/ui components only when needed, and report the command and files.
- Do not force shadcn/ui if it causes visual mismatch, accessibility risk, layout bugs, or unnecessary complexity.
- Use custom components when they are simpler and safer.
- `components/ui` is only for generic primitives.
- Product-specific UI belongs in layout or feature folders.
- Every UI Implementer summary must say whether shadcn/ui was reused, added, intentionally avoided, or replaced by a custom component.

## 7. Architecture Rules

- Use a layered frontend structure.
- Centralize API calls in an API client layer.
- Do not scatter `fetch` calls across UI components.
- Separate API DTOs from UI view models where useful.
- Future Admin Web real/API-backed forms must follow `docs/admin-web-form-validation-contract.md`.
- Default form stack is `react-hook-form` + `zod` + `@hookform/resolvers/zod`.
- `useState` is allowed for tiny UI-only state, not as the default for real/API-backed forms.
- Do not add alternative form libraries or migrate all forms in one task.
- Future form implementation tasks must include a `Documentation Impact Candidate`; technical `PASS` is not user or ChatGPT Final Gatekeeper acceptance.
- Permission-aware UI must use permissions returned from backend `GET /v1/admin/auth/me`.
- Frontend menu hiding is not security; backend guards are security.
- Do not use server actions for Admin Backend mutations unless explicitly approved later.
- Prefer browser-to-Admin-Backend API calls with credentials included, or a BFF route only if explicitly designed later.

## 8. Visual QA Rules

- UI work requires screenshot evidence after the scaffold exists.
- Required viewport set:
  - `1440x900`
  - `1280x800`
  - `1024x768`
  - `768x1024`
  - `390x844`
- MVP screenshot review is light-only; dark mode screenshots are not required.
- Report route, viewport, mode, and issues.
- No visual task passes without evidence or a clear reason why screenshots cannot run.
- Visual tasks require screenshot evidence and user or ChatGPT Final Gatekeeper visual acceptance; technical `PASS` is not visual acceptance.
- Future UI tasks cannot receive Reviewer `PASS` without screenshot evidence unless the task is docs-only, screenshots are impossible for a clearly reported accepted reason, or the user explicitly waives screenshot evidence.
- If screenshots cannot run for a UI implementation task, record the limitation as a visual evidence assessment; do not present `PASS_WITH_NOTES` as a formal Reviewer or Final Gatekeeper verdict.

## 9. Forbidden Workstreams

- Do not modify `skin-analyzer-web`.
- Do not modify `skin-analyzer-admin-backend`.
- Do not modify Engine v2, K.2M, camera, model, or runtime files.
- Do not modify `public/models`.
- Do not work on backend migration or backend API logic from this repo.

## 10. Commit Rules

- Codex Implementer and Codex Independent Reviewer do not authorize commit or merge.
- Do not stage, commit, or push unless the user explicitly asks after ChatGPT Final Gatekeeper returns `GO` for the exact frozen target.
- Stage explicit paths only.
- Never use `git add .`.
- Never use `git add -A`.
- Fixes after `NEEDS_FIX` require a new packet and re-review.
- Commit messages must state title, what/why, and deferred/out-of-scope safety behavior.
- Never push without explicit user instruction.
- If a commit is approved later, commit only files changed by the scoped Admin Web task.
