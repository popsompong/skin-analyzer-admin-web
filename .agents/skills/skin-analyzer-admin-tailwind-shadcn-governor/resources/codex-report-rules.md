# Codex Report Rules

## Artifact Root

Write Admin Web reports and browser artifacts outside the repo under:

```text
/tmp/skin-analyzer-codex-reports/skin-analyzer-admin-web/
```

Use Bangkok time: `Asia/Bangkok`.

## Startup And Final Status

Every Admin Web task should report:

- `pwd`
- `git status --short --branch`
- `git diff --name-only`
- `git diff --cached --name-only`
- `git ls-files --others --exclude-standard`

Run the same status set at the end.

## Git Rules

- Never use `git add .`.
- Do not stage, commit, or push unless explicitly requested.
- Stage explicit paths only if staging is approved.
- Do not reset, delete, or overwrite user changes without approval.

## UI Evidence Rules

UI work after scaffold requires screenshots unless docs-only or clearly impossible.

Required light-only viewport set:

- 1440x900
- 1280x800
- 1024x768
- 768x1024
- 390x844

Screenshots must be written outside the repo in a dedicated folder:

```text
<TOPIC>_screenshots_<DD-MM-YYYY_HH-MM-SS>
```

If screenshots are generated, final reports must print the screenshot folder path.

If no screenshots are generated, write exactly:

```text
Screenshot artifact path: none, no screenshots generated for this task.
```

## Required UI Report Outcomes

Every UI report must include:

- Route(s)
- Viewports
- Mode, light-only for MVP
- Issues found
- Exact commands/results
- shadcn/ui outcome: reused, added, intentionally avoided, or replaced by custom component
- Tailwind/token outcome
- Documentation Impact Candidate
- Final git status

If there is no documentation impact, write exactly:

```text
Documentation Impact Candidate: none
```

Technical `PASS` is not user or gatekeeper visual acceptance.

## Changed-Files Zip

When repo files are modified, create a changed-files zip outside the repo containing only files changed by the current task. Exclude `node_modules`, `.next`, screenshots, reports, `.env*`, tmp/cache/build outputs, uploaded assets, and unrelated files.

When no repo files changed, do not create `changed-files.zip`; report that no changed-files zip was created because there were no repo changes.
