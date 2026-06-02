# Admin Web UX/UI Contract v1

This document defines the design direction for `skin-analyzer-admin-web`. It is the main UX/UI source of truth before scaffold or implementation.

Brand and visual direction is further constrained by `docs/admin-web-brand-visual-direction.md`. Theme and color-token usage is constrained by `docs/admin-web-theme-token-contract.md`. These addenda override any generic scaffold visual direction and must be read before future UI implementation.

## Active Direction Update: Flux Sky

For the upcoming Admin Web redesign, the active visual direction is:

```text
Flux Sky: light / neutral Flux-like sidebar + shadcn/Tailwind sky action/event states.
```

This supersedes older future-direction language that points Flux Sky work back to:

- Dark navy sidebar.
- Old Admin Web dark sidebar.
- Current production sidebar visual style.
- Blue action palette from earlier attempts.
- Generic shadcn/admin scaffold styling.

The old dark navy sidebar remains current implemented/historical context only until a scoped production task changes it. Do not use it as the target for future Flux Sky work unless a later accepted direction explicitly changes it.

Flux is a public visual/interaction reference only. The user is not buying the Flux license. Do not copy Flux code, assets, logos, exact class names, proprietary icons, template implementation, user identity, or sample data. The final Admin Web must remain Skin Analyzer-specific.

Admin Web Flux Sky Golden Mockup v1 is an accepted isolated visual direction checkpoint and planning reference only. It is not production implementation, not whole Admin Web final visual acceptance, and must not be copied wholesale into production.

## 1. Design Direction

- Modern AI Skin Analysis Admin 2026.
- Clean SaaS Dashboard.
- Calm Editorial Admin.
- Professional internal tool.
- Neutral surfaces.
- Subtle brand accent.
- Minimal shadows.
- Clear borders.
- Clear status badges.
- Comfortable tables, lists, and forms.
- Readable editor surfaces.
- Not public marketing UI.
- Not a beauty landing page.
- Not flashy.
- Independent from the Public Web visual theme.

The interface should feel efficient, clear, and trustworthy for repeated admin work.

## 2. Visual Restrictions

Do not use:

- Heavy gradients.
- Glassmorphism-heavy panels.
- Neon effects.
- Public landing page hero style.
- Public Web rose, pearl, or champagne palette as the Admin Web base.
- Large marketing typography.
- Excessive motion.
- Arbitrary color choices.
- Random card shadows.
- Decorative UI that reduces scanning speed.

Any visual flourish must serve task clarity, hierarchy, or state recognition.

## 3. Design Tokens Direction

Define tokens during scaffold before implementing major screens. Do not introduce one-off colors in components.

Admin Web tokens are Admin Web-owned. Current implemented tokens are documented in `docs/admin-web-theme-token-contract.md` and must not inherit the Public Web theme as the base.

For upcoming Flux Sky production work, a scoped token/theme task must translate light / neutral sidebar states and shadcn/Tailwind sky action/event states into Admin Web semantic tokens before production implementation. Do not copy raw slate/sky classes from the Golden Mockup into production components.

- `background`: page canvas.
- `surface`: primary panel, card, dialog, table, and form surface.
- `surface-muted`: low-emphasis panels, table rows, secondary controls, and sidebar groups.
- `border`: standard dividers and control outlines.
- `text-primary`: main readable text.
- `text-secondary`: labels, metadata, helper text, and secondary navigation.
- `brand/accent`: Skin Analyzer admin accent used sparingly for selected states and primary actions.
- `success`: completed, published, active, healthy.
- `warning`: draft risk, needs review, retryable issue.
- `error`: failed, destructive, invalid, blocked.
- `info`: neutral system information and processing states.
- `radius`: restrained radius suitable for admin tools.
- `spacing`: compact but comfortable density for tables, forms, and editor panels.
- `shadow`: minimal elevation only where layering needs to be clear.
- `focus ring`: visible, accessible keyboard focus state.

Logo direction is a front-facing AI skin scan mark following Logo B: Semi-realistic App Icon Style. Actual asset implementation must be scoped separately.

## 4. Typography

- Admin typography must prioritize readability and density.
- Thai and English text must remain readable in tables, forms, editors, badges, and menus.
- Avoid oversized public-page headings.
- Use clear hierarchy without marketing-style display type.
- Tables, forms, and editor text should be calm, compact, and easy to scan.

## 5. Layout

- Sidebar: primary navigation, permission-aware visibility, stable width, clear active states.
- Flux Sky sidebar work: use light / neutral sidebar direction, soft active pill, sky active/focus accents, and clear active rail. Do not use the current dark production sidebar as the visual target.
- Topbar: user/session actions, current area context, optional breadcrumbs or page actions.
- Main content: focused work surface with predictable spacing and page-level actions.
- Cards: use for repeated items, compact summaries, and contained tools only.
- Tables: support status, ownership, updated time, actions, loading, empty, and error states.
- Forms: clear labels, validation messages, save/cancel actions, and unsaved-change handling.
- Editor layout: content canvas, block controls, metadata panel, preview/publish actions.
- Responsive behavior: desktop-first admin productivity, tablet support, and mobile-safe shells for basic review or emergency edits.

Do not place cards inside other cards unless the component is a real modal, popover, or repeated item.

Real and API-backed forms must follow `docs/admin-web-form-validation-contract.md`. Form library migration must not cause visual redesign.

## 6. Light-Only Theme Mode

- Admin Web MVP is light-only.
- No dark mode is required or approved for MVP.
- Do not add a theme toggle, `next-themes`, or app-level `prefers-color-scheme` theme switching.
- No dark mode screenshots are required for MVP UI tasks.
- Theme implementation must use Admin Web semantic tokens from `docs/admin-web-theme-token-contract.md`.
- Do not create one-off colors in components.
- For Flux Sky, do not add dark mode or a theme toggle because Flux has one; Skin Analyzer MVP remains light-only.

## 7. UX States

Every major screen or workflow should define relevant states:

- Loading.
- Empty.
- Error.
- Forbidden.
- Offline or API down.
- Unsaved changes.
- Success toast.
- Destructive confirmation.

Do not ship blank or ambiguous states for admin workflows.

## 8. Editor Principle

- Aim for a Wix-like admin experience, but do not clone Wix.
- Use a controlled block editor.
- Do not create a free canvas.
- Do not allow arbitrary CSS or JavaScript.
- Use templates and safe variants only.
- Blocks come from code.
- Content props come from the API.
- Publishing controls must be explicit and permission-aware.

The editor should protect brand consistency and content safety more than it maximizes layout freedom.

## 9. Admin-Specific Behavior

- Usability is more important than decoration.
- Dense but readable layouts are preferred.
- Admin Web does not need public SEO.
- Admin Web must remain private and `noindex`.
- Public presentation can be previewed, but public-facing rendering belongs to the public web contract.

## 10. shadcn/ui Governance Rules

- shadcn/ui is intended as the production component foundation where suitable.
- Prefer existing project components and shadcn/ui primitives when suitable.
- Add missing shadcn/ui components only when needed in an explicitly scoped task, and report the command and files.
- Do not force shadcn/ui if it causes visual mismatch, accessibility risk, layout bugs, or unnecessary complexity.
- Custom components remain allowed when they are simpler, safer, or necessary for visual parity.
- `components/ui` is for generic primitives only.
- Product-specific Skin Analyzer UI belongs in layout or feature folders.
- Do not copy the Golden Mockup component wholesale into production.
- Every UI report must state whether shadcn/ui was reused, added, intentionally avoided, or replaced by custom components.

## 11. Flux Sky Anti-Drift Rules

- Do not revert to old dark/navy sidebar unless a later accepted direction explicitly changes it.
- Do not use current Admin Web production sidebar as the visual target for Flux Sky work.
- Do not use Tailwind blue or UI Colors blue for new Flux Sky action states.
- Use shadcn/Tailwind sky for action and event states.
- Keep hover states quieter than active states.
- Keep destructive, warning, success, disabled, and forbidden states semantically distinct; do not use sky for every status.
- Do not treat technical `PASS` as visual acceptance.
- Screenshot/visual evidence is required for visual implementation tasks after the scaffold exists.

## 12. Future Productionization Rule

The next production planning task should be:

```text
Admin Web Flux Sky shadcn-backed Productionization Plan v1
```

This plan must happen before any production implementation.

Expected future sequence:

1. Admin Web Flux Sky shadcn-backed Productionization Plan v1.
2. Token/theme contract update for light sidebar + sky action states.
3. Sidebar Production v1.
4. Topbar / Dropdown / Command Production v1.
5. Mobile Drawer Production v1.
6. Dashboard Layout v2.
7. Visual QA / Screenshot Parity.
