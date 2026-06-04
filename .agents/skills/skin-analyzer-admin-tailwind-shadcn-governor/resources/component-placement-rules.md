# Component Placement Rules

## Generic Primitives

`components/ui` is only for generic primitives:

- Buttons
- Badges
- Separators
- Dialog/sheet/tooltip/collapsible/dropdown primitives
- Inputs, fields, cards, tables, tabs, popovers, alerts, toasts when scoped

Generic primitives must not contain Skin Analyzer product logic, route permissions, backend DTO mapping, feature data models, or page-specific layout behavior.

## Product Layout

Use `components/layout` for:

- Admin shell
- Sidebar
- Nav item
- Topbar
- Mobile drawer composition
- Command/search shell composition
- Profile menu and notification menu composition
- Page header and page chrome

## Feature Folders

Use feature folders for product-specific UI:

- `components/dashboard`: dashboard widgets and summaries.
- `components/content`: shared Blog/Tips content UI.
- `components/blog`: Blog-specific UI.
- `components/tips`: Tips-specific UI.
- `components/media`: media library/upload UI.
- `components/taxonomy`: categories/tags UI.
- `components/authors`: author UI.
- `components/editor`: controlled block editor and panels.
- `components/revalidation`: revalidation events UI when introduced.

## API And Forms

- Centralize API calls in `lib/api`.
- Do not scatter `fetch` calls in UI components.
- Keep auth/session helpers in `lib/auth`.
- Keep permission helpers in `lib/permissions`.
- Real/API-backed forms use `react-hook-form`, `zod`, and `@hookform/resolvers/zod`.
- Keep schemas and default values testable outside visual components where practical.

## Decision Rule

If the component knows Skin Analyzer routes, permissions, content types, dashboard metrics, backend fields, or workflow semantics, it is product-specific and does not belong in `components/ui`.
