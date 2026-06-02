# Admin Web Theme Token Contract v1

This document records the current implemented Admin Web MVP theme and token rules, and the planning boundary for the upcoming Flux Sky redesign.

## 1. Purpose

Use this document to prevent future Admin Web work from inventing a new palette, copying the Public Web theme, adding dark mode, or scattering raw color values through components.

This contract is the source of truth for Admin Web MVP theme mode, semantic color tokens, and component color usage.

For the upcoming Admin Web redesign, the active visual direction is:

```text
Flux Sky: light / neutral Flux-like sidebar + shadcn/Tailwind sky action/event states.
```

The current dark-sidebar token values below are implemented v1 state and historical foundation. They are superseded as the future visual target for Flux Sky work, but remain the current production token contract until a scoped token/theme task changes them.

## 2. Theme Mode Decision

- Admin Web MVP is light-only.
- No dark mode.
- No theme toggle.
- No `next-themes`.
- No app-level `prefers-color-scheme` theme switching.
- No dark-mode screenshots are required.
- Do not fail future UI tasks for missing dark mode screenshots.
- Validate the light-only theme consistently across supported viewports.

## 3. Product Surface Separation

- Admin Web owns its own theme system.
- Do not copy or inherit Public Web color or theme direction.
- Do not use the Public Web rose, pearl, or champagne palette as the Admin Web base.
- Public Web brand colors may appear only as tiny approved accents, not as the Admin Web system palette.
- Admin Web should feel like a modern AI skin-analysis admin and content studio, not a beauty landing page.

## 4. Current Implemented Light-Only Theme Direction

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

For upcoming Flux Sky work, the dark navy sidebar and blue action palette language in this section is previous / historical / scoped foundation. Future Flux Sky production work must not reuse those values as the visual target if they conflict with the accepted light / neutral sidebar and sky action-state direction.

## 5. Required Semantic Theme Tokens

Core tokens:

- `--admin-bg`: app workspace background.
- `--admin-surface`: primary card, panel, table, and form surface.
- `--admin-surface-elevated`: subtle raised or secondary surface.
- `--admin-border`: standard dividers and control borders.
- `--admin-text`: primary readable text.
- `--admin-text-muted`: helper text, metadata, and secondary labels.

Sidebar tokens:

- `--admin-sidebar`: sidebar base.
- `--admin-sidebar-elevated`: sidebar raised blocks and selected containers.
- `--admin-sidebar-border`: sidebar dividers and outlines.
- `--admin-sidebar-text`: primary sidebar text.
- `--admin-sidebar-muted`: secondary sidebar labels and helper text.

Actions and accents:

- `--admin-primary`: primary actions and selected states.
- `--admin-primary-hover`: primary action hover state.
- `--admin-primary-soft`: soft primary backgrounds.
- `--admin-accent-cyan`: AI scan accents and focus highlights.
- `--admin-accent-violet`: optional analytics accent.

Status tokens:

- `--admin-success`: success, published, healthy.
- `--admin-warning`: warning, draft risk, needs review.
- `--admin-danger`: danger, failed, destructive, invalid.
- `--admin-info`: neutral system information.

Shape and effects:

- `--admin-radius-card`: card and large surface radius.
- `--admin-radius-control`: input, button, badge, and small control radius.
- `--admin-shadow-card`: restrained card elevation.
- `--admin-focus-ring`: accessible keyboard focus color.

## 6. Baseline Token Values

Current implemented baseline values:

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

These are current implemented baseline tokens. Changing token values later must be a scoped token task. Do not change tokens casually in page or component tasks.

Do not treat the current dark `--admin-sidebar*` values or blue `--admin-primary*` values as the final Flux Sky production mapping. They remain current production implementation until a future token/theme task updates the semantic mapping.

## 7. Flux Sky Token Planning Requirement

Do not define final Flux Sky production token values in this v1 contract. A future scoped token/theme task is required for:

- Light / neutral sidebar tokens.
- shadcn/Tailwind sky action states.
- Active, hover, focus-visible, selected, dropdown, command, notification, and drawer states.
- Mobile drawer and collapsed rail states.
- Avoidance of old dark-sidebar token drift.
- Avoidance of Tailwind blue or UI Colors blue for new Flux Sky action states.
- Translation of Golden Mockup raw slate/sky classes into Admin Web semantic tokens.

Current token contract remains implemented state until a scoped production token task changes `app/globals.css` or related token definitions. If current tokens cannot express Flux Sky safely, stop and scope the token/theme task before production implementation.

## 8. Component Usage Rules

- Components must use semantic Admin Web tokens for core surfaces, text, borders, and actions.
- Do not add raw hex values inside components.
- Do not add random Tailwind color classes for core surfaces or text.
- Do not invent a new component-local palette.
- New color needs must stop and be reported before implementation unless explicitly scoped.
- Raw hex values may exist only in token definitions or one-off SVG/gradient details when explicitly approved.
- Use Tailwind canonical syntax for CSS variable utilities, such as `bg-(--admin-bg)`, `text-(--admin-text)`, `border-(--admin-border)`, and `shadow-(--admin-shadow-card)`.

Flux Sky note:

- Use shadcn/Tailwind sky for new action/event state planning, but production components must consume Admin Web semantic tokens after the token task defines them.
- Do not copy raw Tailwind color classes from the Golden Mockup into production components as token compliance.

## 9. Forbidden Theme Work

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
- Do not use the current production dark sidebar token values as the Flux Sky visual target.

## 10. Future Implementation Order

- Flux Sky production implementation must not start from this document alone.
- Next planning task should be: Admin Web Flux Sky shadcn-backed Productionization Plan v1.
- A future token/theme contract update for light sidebar + sky action states must happen before production Flux Sky shell implementation.
- That future token task may update `app/globals.css` only when explicitly scoped.
- UI component work that changes the production shell must wait until productionization planning and token/theme decisions are accepted.
- Visual Spec Pack v2 remains historical reference for the previous implemented direction unless a future task explicitly scopes legacy UI work.

Expected future sequence:

1. Admin Web Flux Sky shadcn-backed Productionization Plan v1.
2. Token/theme contract update for light sidebar + sky action states.
3. Sidebar Production v1.
4. Topbar / Dropdown / Command Production v1.
5. Mobile Drawer Production v1.
6. Dashboard Layout v2.
7. Visual QA / Screenshot Parity.

## 11. Visual QA Requirements

- UI screenshot review should focus on light-only output.
- No dark mode screenshot is required.
- Check that output uses a light neutral workspace.
- Check that output does not use the Public Web palette as the base.
- Check that output does not introduce random colors.
- Future UI tasks must report token compliance.

For current implemented legacy UI tasks, validate against the current production tokens. For Flux Sky visual implementation tasks, validate:

- Light / neutral sidebar, not dark/navy/black.
- shadcn/Tailwind sky action and event states.
- No Tailwind blue or UI Colors blue for new Flux Sky action states.
- No current production dark sidebar visual target.
- Screenshot/visual evidence at the required viewports.
- Technical `PASS` is not user or gatekeeper visual acceptance.
