# Admin Web Visual QA Contract v1

This document makes UI QA enforceable for `skin-analyzer-admin-web`.

Visual QA must compare screenshots against `docs/admin-web-brand-visual-direction.md` and `docs/admin-web-theme-token-contract.md` in addition to checking layout and accessibility basics.

Latest accepted evidence checkpoint:

```text
Admin Web Flux Sky Visual QA Rerun v4
```

Status: `PASS_WITH_NOTES` for the Flux Sky shell/dashboard checkpoint. It is evidence for shell/sidebar/topbar/dashboard state only and does not make the whole Admin Web product or feature pages final.

## 1. Screenshot Requirements

For every UI task after scaffold, capture evidence for:

- Desktop: `1440x900`.
- Desktop: `1280x800`.
- Tablet landscape: `1024x768`.
- Tablet portrait: `768x1024`.
- Mobile: `390x844`.
- Light-only MVP mode.

Dark mode screenshots are not required because Admin Web MVP is light-only. Do not fail UI tasks for missing dark mode screenshots.

Docs-only tasks are exempt from screenshot requirements.

For Flux Sky shell/dashboard regression or future visual tasks, use local `/dashboard` on `http://127.0.0.1:3000` when the task scope allows. Public Cloudflare or deployed preview URLs are not Codex source of truth for local implementation state unless a future task explicitly scopes deployment verification.

## 2. Screenshot Artifact Location

Browser workflow screenshots must be written outside the repository under:

```text
/tmp/skin-analyzer-codex-reports/skin-analyzer-admin-web/
```

Each UI task that captures screenshots must create a dedicated screenshot folder under that report directory.

Folder naming pattern:

```text
<TOPIC>_screenshots_<DD-MM-YYYY_HH-MM-SS>
```

Use Bangkok time: `Asia/Bangkok`, UTC+07:00.

Suggested shell pattern:

```sh
SCREENSHOT_TS=$(TZ="Asia/Bangkok" date +"%d-%m-%Y_%H-%M-%S")
SCREENSHOT_DIR="/tmp/skin-analyzer-codex-reports/skin-analyzer-admin-web/<TOPIC>_screenshots_${SCREENSHOT_TS}"
mkdir -p "$SCREENSHOT_DIR"
```

Do not write screenshots into the repository.

Do not write browser traces, Playwright reports, videos, `test-results`, screenshots, or temporary visual artifacts into the repository.

Do not include screenshots or browser artifacts in changed-files zips unless the user explicitly asks.

Final reports must print the screenshot folder path when screenshots are generated.

If no screenshots are generated, final reports must say:

```text
Screenshot artifact path: none, no screenshots generated for this task.
```

Future UI tasks cannot pass as full `PASS` without screenshot evidence unless the task is docs-only or screenshots are impossible for a clearly reported reason.

If screenshots cannot run for a UI implementation task, the result should be `PASS_WITH_NOTES` at best, not `PASS`, unless the user explicitly waives screenshot evidence.

## 3. Required Checks

Every visual review must check:

- No horizontal overflow.
- No clipped text.
- No broken table or card layout.
- No unreadable contrast.
- No random color drift.
- No oversized typography.
- No broken sidebar or topbar.
- No hidden primary actions.
- Loading, empty, and error states visible when relevant.
- Permission and forbidden states visible when relevant.
- UI does not drift back to generic scaffold styling or Public Web styling.
- Logo or brand usage follows the front-facing AI skin scan direction when a logo appears.
- UI complies with `docs/admin-web-theme-token-contract.md`.

Visual drift checklist:

- No Public Web palette as the base.
- Light neutral workspace.
- For Flux Sky work, light / neutral sidebar, not dark/navy/black and not the previous dark production sidebar.
- For Flux Sky work, shadcn/Tailwind sky action and event states.
- Fail Flux Sky work if it reverts to the old dark navy sidebar, old Admin Web dark sidebar, or previous dark sidebar visual target unless a later accepted direction explicitly changes it.
- Fail new Flux Sky action states if they use Tailwind blue or UI Colors blue instead of sky.
- For explicitly scoped historical legacy UI audits only, treat previous dark-sidebar tokens as historical context, not as Flux Sky acceptance criteria.
- No generic cube or hex branding.
- No marketing-page styling.
- No arbitrary palette.
- No random local colors outside Admin Web tokens.
- No heavy neon, glass, or gradient treatment unless approved.
- Responsive behavior remains intentional.
- Development runtime indicators are `NOT_APP_UI_ARTIFACT` unless they obscure app UI, overlap important controls, or distort layout evidence.

## 4. Admin Editor Special Rule

- Full editor can be desktop/tablet-first.
- Mobile can be limited to a view/edit shell in the MVP.
- Do not force complex drag/drop on mobile in the MVP.
- Editor screenshots must include content canvas, block controls, metadata panel, and primary actions when those pieces exist.

## 5. Evidence Reporting

Codex final reports for UI tasks must include:

- Routes tested.
- Screenshot paths, or a clear reason screenshots were unavailable.
- Viewport list.
- Mode list, which should be light-only for MVP.
- Issues found.
- Validation commands.
- shadcn/ui usage outcome: reused, added, intentionally avoided, or replaced by custom component.
- Token compliance outcome.
- User or gatekeeper visual acceptance status; technical `PASS` is not visual acceptance.

Screenshots, browser workflow artifacts, and generated reports must be stored outside the repo unless explicitly requested.

## 6. Playwright Direction

- Add Playwright only when the scaffold is ready and the task explicitly includes test setup.
- Initial visual smoke tests should be scoped.
- Do not require pixel-perfect screenshots at first.
- Screenshot baselines can be added later after the layout stabilizes.

## 7. Gatekeeper Statuses

- `PASS`: work satisfies scope, validation, and evidence requirements.
- `PASS_WITH_NOTES`: work is acceptable but has documented limitations, such as unavailable screenshots.
- `NEEDS_FIX`: issues were found and should be corrected before approval.
- `STOP`: wrong path, unsafe scope, unexpected files, or forbidden workstream detected.

## 8. No Screenshot, No Pass Rule

For UI tasks, if screenshots cannot run, the final result should be `PASS_WITH_NOTES` at best unless the task is docs-only.

For docs-only tasks, validation may rely on file checks and content checks instead of screenshots.
