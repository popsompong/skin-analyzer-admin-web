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

Do not include screenshots or browser artifacts in changed-files zips when those zips are created, unless the user explicitly asks.

Implementer summaries and Reviewer evidence indexes must print the screenshot folder path when screenshots are generated.

If no screenshots are generated, Implementer summaries must say:

```text
Screenshot artifact path: none, no screenshots generated for this task.
```

Future UI tasks cannot receive Reviewer `PASS` without screenshot evidence unless the task is docs-only, screenshots are impossible for a clearly reported accepted reason, or the user explicitly waives screenshot evidence.

If screenshots cannot run for a UI implementation task, record the limitation as a visual evidence assessment; do not present `PASS_WITH_NOTES` as a formal Reviewer or Final Gatekeeper verdict.

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

Codex Implementer summaries and Compact Review Packets for UI tasks must include:

- Routes tested.
- Screenshot paths, or a clear reason screenshots were unavailable.
- Viewport list.
- Mode list, which should be light-only for MVP.
- Issues found.
- Validation commands.
- shadcn/ui usage outcome: reused, added, intentionally avoided, or replaced by custom component.
- Token compliance outcome.
- User or ChatGPT Final Gatekeeper visual acceptance status when available; technical `PASS` is not visual acceptance.

Screenshots and browser workflow artifacts must be stored outside the repo unless explicitly requested.

## 6. Playwright Direction

- Add Playwright only when the scaffold is ready and the task explicitly includes test setup.
- Initial visual smoke tests should be scoped.
- Do not require pixel-perfect screenshots at first.
- Screenshot baselines can be added later after the layout stabilizes.

## 7. Visual Evidence Assessment

These labels describe visual evidence only. They are inputs to Codex Independent Reviewer and ChatGPT Final Gatekeeper, not formal workflow verdicts.

- `PASS`: visual evidence satisfies the scoped visual requirements.
- `PASS_WITH_NOTES`: visual evidence is acceptable but has documented limitations, such as unavailable screenshots.
- `NEEDS_FIX`: visual issues were found and should be corrected before approval.
- `STOP`: wrong path, unsafe scope, unexpected files, or forbidden workstream detected.

Codex Independent Reviewer still returns only `PASS`, `NEEDS_FIX`, or `BLOCKED`.

ChatGPT Final Gatekeeper still returns only `GO`, `NEEDS_FIX`, or `BLOCKED`.

## 8. No Screenshot, No Pass Rule

For UI tasks, if screenshots cannot run, the visual evidence assessment should document the limitation. Reviewer `PASS` is allowed only when the task is docs-only, screenshots are demonstrably impossible with an accepted reason, or the user explicitly waives screenshot evidence.

For docs-only tasks, validation may rely on file checks and content checks instead of screenshots.
