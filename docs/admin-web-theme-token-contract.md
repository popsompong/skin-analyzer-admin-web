# Admin Web Theme Token Contract v2

This document records the current implemented Admin Web MVP theme, the production token strategy for the upcoming Flux Sky redesign, and the boundary between documentation contract work and implementation work.

## 1. Purpose

Use this document to prevent future Admin Web work from inventing a new palette, copying the Public Web theme, adding dark mode, scattering raw color values through components, or drifting back to the old dark sidebar during Flux Sky productionization.

This contract is the source of truth for Admin Web MVP theme mode, semantic color-token responsibilities, Flux Sky planning roles, and component color usage.

For the upcoming Admin Web redesign, the active visual direction is:

```text
Flux Sky: light / neutral Flux-like sidebar + shadcn/Tailwind sky action/event states.
```

This v2 update defines the Flux Sky token/theme planning contract. It does not implement token values in `app/globals.css`, does not migrate production components, and does not add shadcn/ui components.

## 2. Theme Mode Decision

- Admin Web MVP is light-only.
- No dark mode.
- No theme toggle.
- No `next-themes`.
- No app-level `prefers-color-scheme` theme switching.
- No dark-mode screenshots are required.
- Do not fail future UI tasks for missing dark mode screenshots.
- Validate the light-only theme consistently across supported viewports.

Flux includes a theme toggle in the public reference, but Skin Analyzer Admin Web must not adopt dark mode or a theme toggle unless a later explicit user/gatekeeper-approved contract changes this.

## 3. Product Surface Separation

- Admin Web owns its own theme system.
- Do not copy or inherit Public Web color or theme direction.
- Do not use the Public Web rose, pearl, or champagne palette as the Admin Web base.
- Public Web brand colors may appear only as tiny approved accents, not as the Admin Web system palette.
- Admin Web should feel like a modern AI skin-analysis admin and content studio, not a beauty landing page.

## 4. Current Implemented Theme Context

The current production implementation still uses the previous MVP foundation:

- Light neutral main workspace.
- Dark navy sidebar.
- White or off-white cards.
- Cool gray borders.
- Slate or near-black text.
- Blue primary action.
- Cyan AI scan accent.
- Optional violet analytics accent.
- Emerald success.
- Amber warning.
- Red danger.

For upcoming Flux Sky work, this dark navy sidebar and blue/cyan action language is current implementation / historical context only. It is not the future Flux Sky production target.

Existing production components may continue to render the current values until a later scoped implementation task changes tokens and components. Future Flux Sky implementation must not treat the current dark `--admin-sidebar*` values or blue `--admin-primary*` values as accepted Flux Sky output.

## 5. Existing Core Semantic Tokens

Current core tokens:

- `--admin-bg`: app workspace background.
- `--admin-surface`: primary card, panel, table, and form surface.
- `--admin-surface-elevated`: subtle raised or secondary surface.
- `--admin-border`: standard dividers and control borders.
- `--admin-text`: primary readable text.
- `--admin-text-muted`: helper text, metadata, and secondary labels.

Current sidebar tokens:

- `--admin-sidebar`: current sidebar base.
- `--admin-sidebar-elevated`: current sidebar raised blocks and selected containers.
- `--admin-sidebar-border`: current sidebar dividers and outlines.
- `--admin-sidebar-text`: current primary sidebar text.
- `--admin-sidebar-muted`: current secondary sidebar labels and helper text.

Current actions and accents:

- `--admin-primary`: current primary actions and selected states.
- `--admin-primary-hover`: current primary action hover state.
- `--admin-primary-soft`: current soft primary backgrounds.
- `--admin-accent-cyan`: current AI scan accents and focus highlights.
- `--admin-accent-violet`: optional analytics accent.

Current status tokens:

- `--admin-success`: success, published, healthy.
- `--admin-warning`: warning, draft risk, needs review.
- `--admin-danger`: danger, failed, destructive, invalid.
- `--admin-info`: neutral system information.

Current shape and effects:

- `--admin-radius-card`: card and large surface radius.
- `--admin-radius-control`: input, button, badge, and small control radius.
- `--admin-shadow-card`: restrained card elevation.
- `--admin-focus-ring`: accessible keyboard focus color.

## 6. Current Implemented Baseline Values

Current implemented baseline values in `app/globals.css`:

```css
--admin-bg: #F7FAFC;
--admin-surface: #FFFFFF;
--admin-surface-elevated: #F8FAFC;
--admin-border: #E2E8F0;
--admin-text: #0F172A;
--admin-text-muted: #64748B;

--admin-sidebar: #081220;
--admin-sidebar-elevated: #0B1A2E;
--admin-sidebar-border: #1E3350;
--admin-sidebar-text: #F8FAFC;
--admin-sidebar-muted: #94A3B8;

--admin-primary: #2563EB;
--admin-primary-hover: #1D4ED8;
--admin-primary-soft: #DBEAFE;
--admin-accent-cyan: #06B6D4;
--admin-accent-violet: #8B5CF6;

--admin-success: #10B981;
--admin-warning: #F59E0B;
--admin-danger: #EF4444;
--admin-info: #0EA5E9;

--admin-radius-card: 24px;
--admin-radius-control: 14px;
--admin-shadow-card: 0 18px 45px rgba(15, 23, 42, 0.08);
--admin-focus-ring: #06B6D4;
```

These values are current implemented baseline tokens. They remain current production implementation until a future token implementation task updates `app/globals.css`.

Do not treat the current dark `--admin-sidebar*` values or blue `--admin-primary*` values as the final Flux Sky production mapping.

## 7. Flux Sky Token Direction

Flux Sky token work must follow these direction rules:

- The upcoming sidebar surface is light / neutral, not dark navy, black, or old Admin Web dark sidebar.
- Sidebar text hierarchy should use neutral/slate-style semantic roles for primary text, muted group labels, helper labels, and icons.
- Sky is used for action/event states.
- Sky must not become the whole sidebar background.
- Old dark/sidebar tokens remain current implementation / historical context only until a scoped implementation task changes code.
- Use semantic Admin Web tokens in production components, not raw Golden Mockup `slate`, `zinc`, or `sky` class copies.
- Flux is a public visual/interaction reference only. Do not copy Flux code, assets, logos, exact class names, proprietary icons, template implementation, user identity, or sample data.

## 8. Flux Sky Token Role Groups

The next implementation task may keep existing variable names where safe or introduce new names. The requirement is that these responsibilities are represented by Admin Web semantic tokens before production Flux Sky shell work.

| Role | Recommended token name | Responsibility |
| --- | --- | --- |
| Sidebar surface | `--admin-sidebar-surface` | Light / neutral expanded sidebar base. Must not be dark navy/black for Flux Sky. |
| Sidebar surface elevated | `--admin-sidebar-surface-elevated` | Subtle raised sidebar blocks, footer/user block, or selected containers on the light sidebar. |
| Sidebar border | `--admin-sidebar-border` or `--admin-sidebar-divider` | Right edge divider, header/content/footer separators, and quiet sidebar outlines. |
| Sidebar group label | `--admin-sidebar-group-label` | Muted uppercase group labels such as CONTENT, OPERATIONS, SETTINGS. |
| Sidebar item text | `--admin-sidebar-item-text` | Default readable menu item text on the light sidebar. |
| Sidebar item icon | `--admin-sidebar-item-icon` | Default menu icon color on the light sidebar. |
| Sidebar item hover background | `--admin-sidebar-item-hover-bg` | Neutral hover pill background. Hover should be quieter than active. |
| Sidebar item hover text/icon | `--admin-sidebar-item-hover-fg` | Stronger neutral text/icon on hover without turning the whole row into strong sky. |
| Sidebar item active background | `--admin-sidebar-item-active-bg` | Soft sky selected pill background for active menu row. |
| Sidebar item active text/icon | `--admin-sidebar-item-active-fg` | Sky active text/icon for active menu row. |
| Sidebar item active rail/accent | `--admin-sidebar-item-active-accent` | Thin left active rail and compact active accent. |
| Sidebar item focus ring | `--admin-sidebar-item-focus-ring` | Visible sky focus-visible ring around menu rows and group triggers. |
| Sidebar item badge | `--admin-sidebar-item-badge-bg`, `--admin-sidebar-item-badge-fg` | Revalidation count or metadata badge in expanded menu, with explicit collapsed-rail behavior. |
| Sidebar collapsed rail surface | `--admin-sidebar-rail-surface` | Light / neutral icon-only rail surface. |
| Sidebar drawer backdrop | `--admin-sidebar-drawer-backdrop` | Mobile drawer dim backdrop. Must remain an overlay role, not a sidebar base role. |
| Sidebar drawer surface | `--admin-sidebar-drawer-surface` | Light / neutral mobile drawer panel surface matching desktop sidebar hierarchy. |
| Topbar surface | `--admin-topbar-surface` | Light topbar surface. |
| Topbar border | `--admin-topbar-border` | Topbar bottom divider and quiet separation from content. |
| Command/search focus | `--admin-command-focus-ring`, `--admin-command-highlight-bg`, `--admin-command-highlight-fg` | Search trigger, command input focus, and command selected result state. |
| Dropdown surface | `--admin-dropdown-surface` | Notification, profile, and command dropdown/panel surfaces. |
| Dropdown hover/active | `--admin-dropdown-highlight-bg`, `--admin-dropdown-highlight-fg` | Dropdown row hover, active, and selected states. |
| Notification accent | `--admin-notification-accent`, `--admin-notification-accent-soft` | Unread dots, informational notification counts, and revalidation/status event highlights. |

Token naming can be refined during implementation, but production code must preserve these semantic responsibilities.

## 9. shadcn/Tailwind Sky Action Mapping

Use sky, not blue.

Do not use UI Colors blue.
Do not use Tailwind blue for new Flux Sky action states.
Do not use Flux purple/violet directly.
Do not replace success, warning, danger, disabled, or forbidden states with sky.

Production components should consume Admin Web semantic tokens. The Tailwind `sky` names below describe the intended role mapping, not permission to copy raw utility classes into production components.

| State | Flux Sky role | Required mapping |
| --- | --- | --- |
| Active menu item | Current route in sidebar or drawer | Soft sky selected pill, sky text/icon, and sky active rail/accent. |
| Hover menu item | Pointer hover on non-active nav row | Neutral hover background and stronger neutral text/icon. Optional subtle sky proximity only if visually quieter than active. |
| Focus-visible ring | Keyboard focus on nav, group trigger, command/search, dropdown item, or icon button | Visible sky ring around the full control. Do not rely on color-only text/icon changes. |
| Selected tab/toggle | Selected dashboard/list toggle or segmented state | Soft sky selected state or neutral selected surface with sky text/ring. |
| Primary action | New Blog, New Tip, save/confirm actions when scoped | Strong sky action background with high-contrast text and darker sky hover/pressed state. |
| Dropdown highlighted item | Notification/profile/command highlighted row | Soft sky highlight for standard dropdown rows; stronger sky selected row for command palette where needed. |
| Notification/status accent | Informational unread dot, count badge, or event highlight | Sky accent for informational event states only. Keep success/warning/danger separate. |
| Mobile drawer active item | Active route inside mobile drawer | Same as desktop active: light drawer surface, soft sky active pill, sky rail, sky text/icon. |
| Command/search focus | Search trigger/input focus and command selected result | Sky focus ring and sky selected result treatment with accessible contrast. |
| Collapsed rail active icon | Active route in icon-only rail | Light rail surface, visible sky active rail/accent, sky active icon, accessible label and tooltip plan. |

## 10. Old Dark Sidebar Drift Prevention

Future Flux Sky work must fail visual QA if it reverts to an old dark/navy/black sidebar unless a later user/gatekeeper-approved direction explicitly changes this.

Failure conditions for Flux Sky work:

- Uses the old dark navy/current production sidebar as the Flux Sky production target.
- Uses dark/navy/black sidebar or drawer surfaces for Flux Sky shell work.
- Uses Tailwind blue or UI Colors blue for new Flux Sky action states.
- Turns the whole sidebar sky instead of keeping a light neutral sidebar with sky action/event accents.
- Treats the Golden Mockup as production code or copies its raw Tailwind classes into production.
- Treats technical `PASS` as user or gatekeeper visual acceptance.

Existing dark sidebar token language is current implementation / historical context, not the future Flux Sky target.

## 11. Sidebar Interaction Token Implications

Flux Sky sidebar production must have token coverage for interaction states identified by the Sidebar Interaction Gap Audit and productionization plan.

Required support:

- Collapsible group headers: group trigger text, icon, hover, focus-visible, expanded state, collapsed state, and disabled/unavailable state if later needed.
- Chevron rotation states: open/closed affordance must be visible and tokenized through neutral/default and sky/focus roles where appropriate.
- Menu content scroll region: menu scroll surface must be distinct from header and footer boundaries without dark-sidebar contrast.
- Header/content/footer visual boundaries: sidebar header, content, and footer separators must use quiet neutral border tokens.
- Footer/user block: footer surface, avatar fallback, user text, role text, hover, focus-visible, and profile/menu affordance must work on the light sidebar.
- Collapsed rail: rail surface, active rail, active icon, hover, focus-visible, tooltip, and badge/context metadata must be planned before implementation.
- Mobile drawer: drawer surface, backdrop, close button, active item, hover, focus-visible, internal scroll, header/footer boundaries, and group behavior must match desktop semantics.
- Badge alignment: `Revalidation Events` badge or equivalent metadata must remain aligned in expanded and scrolled states; collapsed rail behavior must be explicit as count, dot, tooltip metadata, or intentionally hidden with rationale.
- Focus-visible state: keyboard focus must be visible on nav rows, group triggers, collapse/expand triggers, drawer close, search/command, dropdown rows, and icon-only controls.
- ARIA / accessibility state visibility: active route must keep `aria-current="page"`; collapsible group triggers must expose `aria-expanded`; icon-only rail items must have accessible names.

If a sidebar group header shows a chevron, it must collapse/expand. If groups are static, remove the chevron instead of showing a false affordance.

## 12. shadcn/ui Production Foundation Notes

- shadcn/ui primitives should consume semantic Admin Web tokens where suitable.
- `components/ui` remains generic and must not hard-code Skin Analyzer product styling, route permissions, backend DTO mapping, or product-only layout behavior.
- Skin Analyzer layout and feature components compose primitives and apply product-specific tokens/classes.
- Product-specific sidebar, topbar, drawer, profile, notification, command, dashboard, Blog/Tips, media, taxonomy, authors, editor, and revalidation UI belongs in `components/layout` or feature folders, not in `components/ui`.
- Existing Button, Badge, and Separator are token-customized local primitives and should be reused where suitable.
- Missing shadcn/ui primitives may be added only in explicitly scoped tasks, with exact command, generated files, dependency changes, token cleanup, validation, and screenshot evidence when UI changes.
- Official Sidebar, Collapsible, Tooltip, Sheet, Dropdown Menu, Command, Dialog, Avatar, Scroll Area, Card, Table, Tabs, Field/Input, AlertDialog, and Sonner adoption must follow the productionization plan and shadcn governance.
- Token changes must be scoped and validated by screenshots when they affect UI output.

## 13. Component Usage Rules

- Components must use semantic Admin Web tokens for core surfaces, text, borders, and actions.
- Do not add raw hex values inside components.
- Do not add random Tailwind color classes for core surfaces or text.
- Do not invent a new component-local palette.
- New color needs must stop and be reported before implementation unless explicitly scoped.
- Raw hex values may exist only in token definitions or one-off SVG/visual details when explicitly approved.
- Use Tailwind canonical syntax for CSS variable utilities, such as `bg-(--admin-bg)`, `text-(--admin-text)`, `border-(--admin-border)`, and `shadow-(--admin-shadow-card)`.
- For Flux Sky production work, do not copy raw `slate`, `zinc`, or `sky` classes from the Golden Mockup into production components as token compliance.

## 14. Forbidden Theme Work

- Do not implement dark mode.
- Do not add a theme toggle.
- Do not add `next-themes`.
- Do not use `prefers-color-scheme` for app-level theme switching.
- Do not use Public Web theme or colors as the base.
- Do not use a rose, pearl, or champagne base palette.
- Do not introduce neon-heavy, glassmorphism-heavy, or marketing palettes.
- Do not scatter raw hex colors through components.
- Do not revert Flux Sky work to old dark/navy sidebar tokens unless a later accepted direction explicitly changes it.
- Do not use Tailwind blue or UI Colors blue for new Flux Sky action states.
- Do not use Flux purple/violet directly.
- Do not use the current production dark sidebar token values as the Flux Sky visual target.

## 15. Future Implementation Order

Flux Sky production implementation must not start from this document alone.

The expected next planning task after this contract passes is:

```text
Admin Web shadcn Component Add Plan v1
```

Expected future sequence:

1. Admin Web Flux Sky Token Theme Contract v2.
2. Admin Web shadcn Component Add Plan v1.
3. Admin Web Flux Sky shadcn Primitive Add v1, if the component add plan approves a primitive cluster.
4. Admin Web Flux Sky Sidebar Production v1.
5. Admin Web Flux Sky Collapsed Rail v1.
6. Admin Web Flux Sky Mobile Drawer v1.
7. Admin Web Flux Sky Topbar Dropdown Command v1.
8. Admin Web Flux Sky Dashboard Layout v2.
9. Admin Web Flux Sky Visual QA Screenshot Parity v1.
10. Admin Web Flux Sky Implementation Docs Sync Addendum v1 after user/gatekeeper acceptance.

A later token implementation task must update `app/globals.css` and production components in a scoped sprint before production Flux Sky shell work can rely on these roles.

## 16. Visual QA Requirements

- UI screenshot review should focus on light-only output.
- No dark mode screenshot is required.
- Check that output uses a light neutral workspace.
- Check that output does not use the Public Web palette as the base.
- Check that output does not introduce random colors.
- Future UI tasks must report token compliance.

For current implemented legacy UI tasks, validate against the current production tokens.

For Flux Sky visual implementation tasks, validate:

- Light / neutral sidebar, not dark/navy/black.
- Light / neutral mobile drawer surface, not old dark sidebar styling.
- shadcn/Tailwind sky action and event states.
- No Tailwind blue or UI Colors blue for new Flux Sky action states.
- No Flux purple/violet direct copy.
- No current production dark sidebar visual target.
- Hover states quieter than active states.
- Visible focus-visible rings on menu items, group triggers, command/search, dropdown rows, drawer controls, and icon-only rail controls.
- Visible or accessible collapsed rail labels/tooltips and explicit badge behavior.
- Collapsible group indicators that match real group behavior.
- Screenshot/visual evidence at the required viewports for UI implementation tasks.
- Technical `PASS` is not user or gatekeeper visual acceptance.

## 17. Implementation Boundary

This document defines the contract.

It does not implement the tokens.
It does not update `app/globals.css`.
It does not migrate the production sidebar.
It does not migrate the production topbar.
It does not add shadcn/ui components.
It does not make the Golden Mockup production.
It does not make whole Admin Web visual acceptance final.

A later scoped implementation task must update `app/globals.css` and production components in a scoped sprint, then validate with required screenshots when UI output changes.
