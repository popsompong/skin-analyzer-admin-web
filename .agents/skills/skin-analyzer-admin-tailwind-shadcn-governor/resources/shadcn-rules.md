# shadcn/ui Rules

## Mandatory Project Rules

- Prefer existing project components and shadcn/ui primitives when suitable.
- Add missing shadcn/ui components only when needed, and report the command and files.
- Do not force shadcn/ui if it causes visual mismatch, accessibility risk, layout bugs, or unnecessary complexity.
- Use custom components when they are simpler and safer.
- `components/ui` is only for generic primitives.
- Product-specific UI belongs in layout or feature folders.
- Every UI report must say whether shadcn/ui was reused, added, intentionally avoided, or replaced by a custom component.

## Before Using shadcn/ui

1. Read `components.json`.
2. Check `components/ui` for already-installed primitives.
3. Check `package.json` and `package-lock.json`.
4. Use npm-compatible commands because `package-lock.json` exists.
5. Inspect the scoped component/page code before deciding reuse vs add.

## Current Installed Primitive Set

- `Button`
- `Badge`
- `Separator`
- `Collapsible`
- `Tooltip`
- `Sheet`

Do not add these again. Reuse or adjust only when the task explicitly scopes primitive changes.

## Component Add Rules

- Do not run `npx shadcn@latest add ...` unless the task explicitly scopes component installation.
- Do not run `shadcn add ...` or MCP install actions during read-only, planning, audit, or docs tasks.
- Report the exact command.
- Report generated and changed files.
- Report dependency impact in `package.json` and `package-lock.json`.
- Report whether `components.json` changed.
- Keep generated files generic and under `components/ui`.
- Move Skin Analyzer-specific composition to layout or feature folders.
- Validate after component add with focused commands appropriate to the task.

## Official shadcn/ui Awareness

Official shadcn/ui docs describe shadcn/ui as open component code and a code distribution system, not a conventional black-box component library. Use that model carefully:

- It is acceptable to edit local primitives when scoped.
- It is not acceptable to turn product composition into generic primitives.
- It is not acceptable to import stock styles that violate Admin Web tokens.

Official shadcn Skill docs say the skill reads `components.json`, detects installed components, and supplies CLI/theming/registry/MCP knowledge. The project-specific governor complements that skill by enforcing Skin Analyzer Admin boundaries, Flux Sky tokens, folder placement, and visual/reporting gates.

## Component-Specific Notes

- Sidebar: official shadcn Sidebar is broad and must remain a scoped decision. Product permission-aware nav belongs in `components/layout`.
- Collapsible: suitable for real sidebar group expand/collapse.
- Sheet: suitable for mobile drawer foundation.
- Tooltip: suitable for collapsed rail and icon-only controls, but tooltip text is not a substitute for accessible labels.
- Button and Badge: existing token-customized primitives should be reused before adding variants.
- Dropdown Menu, Command, Avatar, Dialog, Input, Field, Card, Table, Tabs, AlertDialog, Sonner: add only in scoped future tasks.
