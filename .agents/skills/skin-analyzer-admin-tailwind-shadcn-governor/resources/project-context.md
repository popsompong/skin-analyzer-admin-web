# Project Context

## Identity

- Project: `skin-analyzer-admin-web`.
- Expected repo path: `/Users/sompong/Dev/Project skin analyzer/skin-analyzer-ux-ui/skin-analyzer-admin-web`.
- Private internal Admin Web for Skin Analyzer.
- Not Public Web, not Admin Backend, not Engine v2/K.2M/camera/model/runtime work.

## Current Stack

- Next.js App Router.
- React 19.
- TypeScript.
- Tailwind CSS 4.3 through `tailwindcss` and `@tailwindcss/postcss`.
- npm is canonical because `package-lock.json` exists.
- shadcn-style setup is declared in `components.json`:
  - `style`: `new-york`
  - `tsx`: `true`
  - `tailwind.css`: `app/globals.css`
  - `cssVariables`: `true`
  - `baseColor`: `neutral`
  - aliases for `components`, `ui`, `lib`, `hooks`
  - `iconLibrary`: `lucide`

## Tailwind Setup

- No `tailwind.config.*` file is currently present.
- Tailwind is imported from `app/globals.css` with `@import "tailwindcss";`.
- PostCSS uses `@tailwindcss/postcss`.
- Current production tokens in `app/globals.css` already include light Flux Sky sidebar and sky action token values.

## Current Generic UI Primitives

Existing files under `components/ui`:

- `badge.tsx`
- `button.tsx`
- `collapsible.tsx`
- `separator.tsx`
- `sheet.tsx`
- `tooltip.tsx`

Current primitives are generic. Product shell and dashboard composition lives outside `components/ui`.

## Current Production UI Context

- `components/layout/admin-shell.tsx` composes `Sidebar` and `Topbar`.
- `components/layout/sidebar.tsx` uses local product nav composition plus generic `Collapsible`, `Sheet`, `Tooltip`, and `Separator`.
- `components/layout/nav-item.tsx` owns route active state and badge behavior.
- `components/layout/topbar.tsx` currently implements product-specific command, notification, and profile panels with existing primitives.
- `components/dashboard/dashboard-placeholder.tsx` is Skin Analyzer-specific static dashboard preview content.

## Accepted Direction

Flux Sky is the active direction:

- Light / neutral sidebar.
- shadcn/Tailwind sky action and event states.
- Clean SaaS/admin density.
- Skin Analyzer-specific content.

Current-state docs may lag live code after implementation checkpoints. Always inspect the live code and report stale docs rather than following stale text blindly.
