# skin-analyzer-admin-web

Private Admin Web for Skin Analyzer.

## Current Status

This repository contains the initial Admin Web scaffold foundation. The scaffold is intentionally minimal: App Router routes, shell layout, placeholders, design tokens, and typed API/auth/permission placeholders.

Feature implementation must remain scoped and follow the contract docs.

Theme status: Admin Web MVP is light-only. Use the Admin Web-owned light neutral workspace, dark navy sidebar, and blue/cyan AI accent token contract before UI work.

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

1. Keep scaffold changes small and reviewable.
2. Wire the real Admin Backend auth flow in a separate scoped task.
3. Implement `/login` and `/dashboard` behavior.
4. Implement Blog and Tips content workflows.
5. Add media, taxonomy, authors, revalidation events, and settings as scoped tasks.
6. Add visual QA coverage as UI routes mature.

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
