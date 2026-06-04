---
name: skin-analyzer-admin-tailwind-shadcn-governor
description: Use for Skin Analyzer Admin Web UI work involving Tailwind CSS v4/latest, shadcn/ui primitives, Flux Sky visual direction, component placement, typography, motion, interaction, or visual QA. Enforces project-specific Admin Web boundaries, tokens, reports, and screenshot gates.
---

# Skin Analyzer Admin Tailwind shadcn Governor

## Purpose

Use this skill to keep future `skin-analyzer-admin-web` UI work aligned with:

- Tailwind CSS v4/latest conventions already used by the project.
- shadcn/ui latest conventions and official Skill/MCP awareness.
- Flux Sky visual direction: light / neutral sidebar plus shadcn/Tailwind sky action and event states.
- Skin Analyzer Admin folder boundaries, semantic tokens, and visual QA gates.
- Governance that keeps `components/ui` generic and product UI in layout or feature folders.

## When To Use

Activate this skill for:

- Admin Web UI implementation, polish, or review tasks.
- Dashboard, sidebar, topbar, mobile drawer, collapsed rail, command/search, dropdown, layout, or visual QA work.
- Tailwind class refactors, token consumption changes, typography rhythm work, motion/interaction polish, or responsive layout work.
- shadcn/ui component add, primitive usage, replacement, inventory, or MCP/registry planning tasks.
- Any task asking for Flux Sky, shadcn/Tailwind sky states, or Admin Web UI governance.

## When Not To Use

Do not use this skill for:

- Admin Backend-only tasks.
- Auth/security-only tasks unless an Admin Web UI surface is involved.
- Non-Admin Web sibling projects.
- Public Web work unless the user explicitly asks to adapt these rules.
- Engine v2, K.2M, camera, model, runtime, or `public/models` work.

## Project Identity

- Expected repo: `/Users/sompong/Dev/Project skin analyzer/skin-analyzer-ux-ui/skin-analyzer-admin-web`.
- This repo is the private Skin Analyzer Admin Web.
- It is not the public web app, not the Admin Backend, and not model/runtime work.
- Do not touch sibling projects from this repo.

## Startup Gate

Before reading or editing repo files in an Admin Web task, run:

```sh
pwd
git status --short --branch 2>/dev/null || true
git diff --name-only 2>/dev/null || true
git diff --cached --name-only 2>/dev/null || true
git ls-files --others --exclude-standard 2>/dev/null || true
```

Stop if the path is not the expected Admin Web repo path. Stop on unexpected dirty, staged, or untracked files unless the prompt explicitly allows them.

## Required Context

For UI tasks, read `AGENTS.md` first, then:

- `docs/admin-web-current-ui-implementation-state.md`
- `docs/admin-web-theme-token-contract.md`
- `docs/admin-web-brand-visual-direction.md`
- `docs/admin-web-ux-ui-contract.md`
- `docs/admin-web-visual-qa-contract.md`
- `docs/admin-web-architecture.md`
- `docs/admin-web-route-map.md`
- `components.json`
- `package.json`
- Current live code for the scoped page/component

Trust live code over stale artifacts. If docs conflict with code, report the conflict before editing.

## Rule Resources

Load only the resource files needed for the task:

- `resources/project-context.md`: current project setup, installed primitives, local constraints.
- `resources/tailwind-rules.md`: Tailwind v4/latest, CSS variables, semantic tokens, typography and motion class governance.
- `resources/shadcn-rules.md`: shadcn usage, add/reuse rules, package manager, installed component checks.
- `resources/shadcn-mcp-governance.md`: official shadcn Skill/MCP boundaries and approval gates.
- `resources/flux-sky-rules.md`: Flux Sky visual direction, no-copy boundary, color/action rules.
- `resources/component-placement-rules.md`: folder ownership and `components/ui` limits.
- `resources/typography-motion-rules.md`: typography rhythm, motion duration/easing, reduced-motion safety.
- `resources/codex-report-rules.md`: screenshots, report artifacts, zips, git status, final report expectations.

## Core Rules

- Use Admin Web semantic theme tokens for surfaces, text, borders, focus, actions, and status.
- Do not add raw hex colors in components unless the task explicitly scopes a one-off SVG/visual detail.
- Prefer existing project components and shadcn/ui primitives when suitable.
- Add missing shadcn/ui components only when the task explicitly scopes and approves it.
- Do not force shadcn/ui if custom product composition is simpler, safer, more accessible, or more token-compliant.
- `components/ui` is only for generic primitives.
- Product-specific Skin Analyzer UI belongs in `components/layout` or feature folders.
- Flux Sky means light / neutral sidebar and shadcn/Tailwind sky action states.
- Do not revert Flux Sky work to the old dark/navy/current production sidebar target.
- Do not copy Flux code, assets, logos, exact class names, proprietary icons, template implementation, user identity, or sample data.
- Do not implement dark mode, theme toggle, `next-themes`, or app-level `prefers-color-scheme` switching unless a later explicit contract changes this.
- UI implementation tasks need screenshot evidence across the required viewport set unless docs-only or impossible with a reported reason.
- Technical `PASS` is not user or gatekeeper visual acceptance.
- Never stage, commit, push, reset, delete, or use `git add .` unless explicitly requested and scoped.

## Anti-Patterns

- Putting permission-aware nav, dashboard widgets, Blog/Tips workflows, command data models, or product-specific layout into `components/ui`.
- Copying the Golden Mockup or Flux template implementation into production.
- Scattering one-off Tailwind arbitrary values for repeated typography, motion, or color roles.
- Using Tailwind blue or UI Colors blue for new Flux Sky action states.
- Using Flux purple/violet directly.
- Turning every status into sky and losing success/warning/danger/disabled semantics.
- Adding broad shadcn component batches without a task-specific approval gate.
- Configuring shadcn MCP or editing `~/.codex/config.toml` without explicit user approval.
- Treating screenshots as acceptance rather than evidence for user/gatekeeper review.
