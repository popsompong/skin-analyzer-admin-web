# skin-analyzer-admin-web

Private Admin Web for Skin Analyzer.

## Current Status

This repository is contract-only and has not been scaffolded yet. It currently contains guardrails for future UX/UI and architecture work only.

Do not scaffold the app until this contract has been reviewed.

## Purpose

The Admin Web will provide internal tools for managing Skin Analyzer admin content and operations, including Blog, Tips, media, taxonomy, authors, revalidation events, and settings.

Target backend:

```text
skin-analyzer-admin-backend
```

## What This Repo Is Not

- Not the public Skin Analyzer web app.
- Not the public UX/UI worktree.
- Not the Admin Backend.
- Not Engine v2, K.2M, camera, model, or runtime work.
- Not a place for backend migration or API implementation.

## Planned Implementation Order

1. Review and approve this contract.
2. Scaffold the Admin Web app in a separate scoped task.
3. Add base layout, tokens, theme foundation, and auth shell.
4. Implement `/login` and `/dashboard`.
5. Implement Blog and Tips content workflows.
6. Add media, taxonomy, authors, revalidation events, and settings as scoped tasks.
7. Add visual QA coverage once UI routes exist.

## Report and Zip Artifact Policy

Reports and changed-files zips must be written outside the repo:

```text
/tmp/skin-analyzer-codex-reports/skin-analyzer-admin-web/
```

Report filenames:

```text
<TOPIC>_<DD-MM-YYYY_HH-MM-SS>.txt
```

Changed-files zips must include only files changed by the current task and must not include build output, screenshots, reports, `.env*`, uploaded assets, or unrelated files.

