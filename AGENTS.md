# AGENTS.md

This file is the source of truth for future Codex work in `skin-analyzer-admin-web`.

## 1. Project Scope

- This repository is the private Admin Web for Skin Analyzer.
- It is for internal/admin use only.
- It is not the public marketing or user-facing web app.
- It is not the Admin Backend.
- It is not Engine v2, K.2M, camera, model, or runtime work.
- Do not touch sibling projects from this repository.

## 2. Language and Reporting Rules

- Final summaries to the user must be in Thai.
- Codex prompts are expected to be in English.
- Write report files outside the repo under:
  `/tmp/skin-analyzer-codex-reports/skin-analyzer-admin-web/`
- Report filenames must use:
  `<TOPIC>_<DD-MM-YYYY_HH-MM-SS>.txt`
- Use Bangkok time: `Asia/Bangkok`.
- After modifying files, create a changed-files zip outside the repo under:
  `/tmp/skin-analyzer-codex-reports/skin-analyzer-admin-web/`
- Zip only files changed by the current task.
- Do not include `node_modules`, `.next`, screenshots, reports, `.env*`, tmp files, cache/build outputs, uploaded assets, or unrelated files.
- Browser workflow screenshots and browser artifacts must be written outside the repo under:
  `/tmp/skin-analyzer-codex-reports/skin-analyzer-admin-web/`
- Each UI task that captures screenshots must create a dedicated screenshot folder:
  `<TOPIC>_screenshots_<DD-MM-YYYY_HH-MM-SS>`
- Use Bangkok time for screenshot folders: `Asia/Bangkok`, UTC+07:00.
- Suggested pattern:

  ```sh
  SCREENSHOT_TS=$(TZ="Asia/Bangkok" date +"%d-%m-%Y_%H-%M-%S")
  SCREENSHOT_DIR="/tmp/skin-analyzer-codex-reports/skin-analyzer-admin-web/<TOPIC>_screenshots_${SCREENSHOT_TS}"
  mkdir -p "$SCREENSHOT_DIR"
  ```

- Do not write screenshots, browser traces, Playwright reports, videos, `test-results`, or temporary visual artifacts into the repo.
- Do not include screenshots or browser workflow artifacts in changed-files zips unless the user explicitly asks.
- Final reports must print the screenshot folder path when screenshots are generated.
- If no screenshots are generated, final reports must say:
  `Screenshot artifact path: none, no screenshots generated for this task.`
- Print these lines after artifact creation:
  - `Report written to: $REPORT_FILE`
  - `Changed files zip written to: <path>`
- Do not write reports into `docs/*.txt` unless explicitly requested.

## 3. Execution Rules

- Always start with:
  - `pwd`
  - `git status --short --branch 2>/dev/null || true`
  - `git diff --name-only 2>/dev/null || true`
  - `git diff --cached --name-only 2>/dev/null || true`
  - `git ls-files --others --exclude-standard 2>/dev/null || true`
- If `pwd` is not the expected Admin Web project path, stop.
- Do not use `git add .`.
- Do not stage, commit, or push unless explicitly requested.
- Do not delete, reset, or overwrite user changes without approval.
- Do not touch sibling projects.
- Keep every UI task small and reviewable.

Expected path:

```text
/Users/sompong/Dev/Project skin analyzer/skin-analyzer-ux-ui/skin-analyzer-admin-web
```

## 4. UI/UX Safety Rules

- Future Admin Web UI tasks must read `docs/admin-web-current-ui-implementation-state.md` after `AGENTS.md` and before implementation.
- `docs/admin-web-current-ui-implementation-state.md` is the current accepted UI and handoff state.
- If that document conflicts with actual code, inspect code and report the conflict before editing.
- Future UI tasks must read `docs/admin-web-brand-visual-direction.md` before implementation.
- Future UI tasks must read `docs/admin-web-theme-token-contract.md` before implementation.
- Admin Web visual system is independent from Public Web.
- Do not use Public Web colors or theme as the Admin Web base.
- Follow the `Modern AI Skin Analysis Admin 2026` direction.
- Admin Web MVP is light-only: light neutral workspace, dark navy sidebar, blue/cyan AI accents.
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

## 5. shadcn/ui Rules

- Prefer existing project components and shadcn/ui primitives when suitable.
- Add missing shadcn/ui components only when needed, and report the command and files.
- Do not force shadcn/ui if it causes visual mismatch, accessibility risk, layout bugs, or unnecessary complexity.
- Use custom components when they are simpler and safer.
- `components/ui` is only for generic primitives.
- Product-specific UI belongs in feature folders.
- Every UI report must say whether shadcn/ui was reused, added, intentionally avoided, or replaced by a custom component.

## 6. Architecture Rules

- Use a layered frontend structure.
- Centralize API calls in an API client layer.
- Do not scatter `fetch` calls across UI components.
- Separate API DTOs from UI view models where useful.
- Permission-aware UI must use permissions returned from backend `GET /v1/admin/auth/me`.
- Frontend menu hiding is not security; backend guards are security.
- Do not use server actions for Admin Backend mutations unless explicitly approved later.
- Prefer browser-to-Admin-Backend API calls with credentials included, or a BFF route only if explicitly designed later.

## 7. Visual QA Rules

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
- Future UI tasks cannot pass as full `PASS` without screenshot evidence unless the task is docs-only or screenshots are impossible for a clearly reported reason.
- If screenshots cannot run for a UI implementation task, the best allowed result is `PASS_WITH_NOTES` unless the user explicitly waives screenshot evidence.

## 8. Forbidden Workstreams

- Do not modify `skin-analyzer-web`.
- Do not modify `skin-analyzer-admin-backend`.
- Do not modify Engine v2, K.2M, camera, model, or runtime files.
- Do not modify `public/models`.
- Do not work on backend migration or backend API logic from this repo.

## 9. Commit Rules

- Commit only when the user explicitly asks.
- Stage explicit paths only.
- Never use `git add .`.
- Never push unless explicitly asked.
- If a commit is approved later, commit only files changed by the scoped Admin Web task.
