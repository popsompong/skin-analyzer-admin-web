# Tailwind/shadcn Skill Rules

Codex Thread:

```text
New Thread or Existing / Old Thread
```

Thread name:

```text
<exact task name>
```

Future Codex guidance must always visibly state whether to use a New Thread or an Existing/Old Thread, and the exact thread name.

Use the project-specific skill:

```text
skin-analyzer-admin-tailwind-shadcn-governor
```

## Startup Safety Gate

Work only in:

```text
/Users/sompong/Dev/Project skin analyzer/skin-analyzer-ux-ui/skin-analyzer-admin-web
```

Before reading or editing, run and report:

```sh
pwd
git status --short --branch 2>/dev/null || true
git diff --name-only 2>/dev/null || true
git diff --cached --name-only 2>/dev/null || true
git ls-files --others --exclude-standard 2>/dev/null || true
```

Stop if the path is wrong or unexpected modified/staged/untracked files exist.

## Tailwind Rules

- Treat Tailwind v4/latest project configuration as source of truth.
- Prefer existing Admin Web semantic CSS variables/tokens.
- Use Tailwind utilities for composition, layout, responsive behavior, and state styling where suitable.
- Do not scatter one-off font sizes, arbitrary colors, or transition values.
- Use sky for Flux Sky action/event roles through Admin Web tokens.
- Do not use old Tailwind blue/UI Colors blue or Flux purple/violet directly.
- Respect reduced-motion where practical.

## shadcn/ui Rules

- Read `components.json` before using shadcn.
- Check installed components before adding new ones.
- Use npm-compatible commands because `package-lock.json` exists.
- Prefer existing project components and shadcn/ui primitives when suitable.
- Add missing shadcn/ui components only when explicitly scoped/approved.
- Do not run `npx shadcn@latest add ...`, `shadcn add ...`, or MCP install actions during read-only/planning tasks.
- Every UI report must say whether shadcn/ui was reused, added, intentionally avoided, or replaced by a custom component.

## Flux Sky Rules

- Flux Sky means light / neutral sidebar plus shadcn/Tailwind sky action/event states.
- Do not use the old dark/navy/current production sidebar as the Flux Sky target.
- Do not use Public Web colors, heavy gradients, glassmorphism, dark mode, theme toggle, or `next-themes`.
- Do not copy Flux code/assets/logos/exact class names/proprietary icons/template implementation.
- Golden Mockup is visual reference only, not production source.

## Component Placement Rules

- `components/ui` is only for generic primitives.
- Product-specific Skin Analyzer UI belongs in `components/layout` or feature folders.
- Centralize API calls in `lib/api`; do not scatter `fetch` across UI components.
- Real/API-backed forms use React Hook Form plus Zod plus `@hookform/resolvers/zod`.

## Visual Evidence Rules

UI tasks after scaffold require screenshots outside the repo:

- 1440x900
- 1280x800
- 1024x768
- 768x1024
- 390x844

Light-only mode is enough for MVP. Technical `PASS` is not user/gatekeeper visual acceptance.

## Reporting Rules

- Write reports/screenshots/artifacts under `/tmp/skin-analyzer-codex-reports/skin-analyzer-admin-web/`.
- Include exact commands/results, route(s), viewport(s), mode, issues, shadcn/ui outcome, Tailwind/token outcome, Documentation Impact Candidate, screenshot path, and final git status.
- If no screenshots are generated, write: `Screenshot artifact path: none, no screenshots generated for this task.`
- If there is no documentation impact, write exactly: `Documentation Impact Candidate: none`.
- Never use `git add .`.
- Do not stage, commit, or push unless explicitly requested.
