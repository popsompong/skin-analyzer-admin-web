# skin-analyzer-admin-web

Private Admin Web for Skin Analyzer.

## Current Status

This repository contains the Admin Web scaffold and accepted foundation checkpoints for routes, shell layout, placeholders, design tokens, API/auth/permission placeholders, and documentation contracts.

Feature implementation must remain scoped and follow the contract docs.

Theme status: Admin Web MVP is light-only. The active upcoming visual direction is Flux Sky: light / neutral Flux-like sidebar plus shadcn/Tailwind sky action and event states. Production Flux Sky implementation has not started; the current production shell may still contain the older dark sidebar and blue/cyan foundation until a scoped productionization and token/theme task changes it.

Current UI implementation state and handoff notes are documented in `docs/admin-web-current-ui-implementation-state.md`.

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
2. Run `Admin Web Flux Sky shadcn-backed Productionization Plan v1` before production UI implementation.
3. Plan the scoped token/theme update for light / neutral sidebar and sky action states before changing the production shell.
4. Split Flux Sky productionization into focused shell, topbar/dropdown/command, mobile drawer, dashboard, and visual QA tasks.
5. Treat feature work such as Topbar Auth Menu, Blog/Tips/Media, dashboard hardening, editor/list implementation, taxonomy, authors, revalidation, and settings as later scoped work unless the user explicitly reprioritizes it.

The Flux Sky Golden Mockup is a visual checkpoint and planning reference only. It is not production code and must not be copied wholesale into production.

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
