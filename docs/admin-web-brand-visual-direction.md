# Admin Web Brand and Visual Direction Addendum v2

This document locks the brand and visual direction for `skin-analyzer-admin-web` before future UI implementation.

## 1. Purpose

Use this document to prevent future Admin Web work from drifting into the Public Web theme, a generic SaaS look, or an unapproved palette. Future UI tasks must treat this as the brand and visual source of truth alongside the UX/UI contract and `docs/admin-web-theme-token-contract.md`.

## 2. Active Direction Update: Flux Sky

The active accepted Admin Web visual direction is:

```text
Flux Sky: light / neutral Flux-like sidebar + shadcn/Tailwind sky action/event states.
```

Flux Sky means:

- Light neutral admin shell.
- Light / neutral Flux-like sidebar.
- shadcn/Tailwind sky action states.
- Clean SaaS/admin density.
- Skin Analyzer-specific product content.

Flux Sky shell/dashboard checkpoint status:

- Sidebar, topbar, collapsed rail, mobile drawer, command/search, dropdown surfaces, and static dashboard layout have moved from planning into the implemented shell/dashboard checkpoint.
- `Admin Web Flux Sky Visual QA Rerun v4` is the latest visual evidence checkpoint and passed with notes.
- This does not make the whole Admin Web product final and does not make feature pages production-ready.

Flux boundary:

- Flux is used only as a public visual and interaction reference.
- The user is not buying the Flux license.
- Do not copy Flux code, assets, logos, exact class names, proprietary icons, template implementation, user identity, or sample data.
- The final Admin Web must remain Skin Analyzer-specific.

Superseded direction:

- Any older direction language that points future redesign work to a dark navy sidebar, old Admin Web sidebar, previous dark production sidebar visual style, Tailwind blue action palette, or generic shadcn/admin scaffold is previous / historical / scoped foundation.
- Do not use that older direction as the Flux Sky production target unless a later accepted direction explicitly changes it.

## 3. Product Surface Separation

- Admin Web is a separate product surface from Public Web.
- Admin Web must not copy or inherit the Public Web theme or color direction.
- Admin Web must not use the Public Web rose, pearl, or champagne beauty palette as the base.
- Public Web may be beauty-tech and emotional; Admin Web must be a modern internal AI skin-analysis admin and content studio.
- Public brand colors may appear only as tiny supporting accents if explicitly approved, not as the Admin Web system palette.
- Admin Web brand direction must use Admin-owned light-only theme tokens from `docs/admin-web-theme-token-contract.md`.

## 4. Visual Direction

Target direction:

```text
Modern AI Skin Analysis Admin 2026
```

The UI should feel:

- Modern.
- Professional.
- Premium.
- AI-assisted.
- Skin-analysis focused.
- Content-studio friendly.
- Calm for long work sessions.
- Precise and trustworthy.

The UI must not feel:

- Public marketing page.
- Beauty landing page.
- Generic SaaS cube dashboard.
- Neon gaming interface.
- Heavy glassmorphism interface.
- Rose-heavy public theme.

For future Flux Sky work, the active visual target is the Flux Sky light neutral admin shell with shadcn/Tailwind sky action and event states. Previous dark-sidebar visuals are implementation history, not the target.

## 5. Approved Visual References

Current active planning references:

- Admin Web Flux Sky Visual + Interaction Contract v1.
- Admin Web Flux Sky Golden Mockup v1.
- Admin Web shadcn/ui Component Inventory + Skill/MCP Feasibility v1.
- Admin Web shadcn/ui Governance Rules v1.

The Flux Sky Golden Mockup is an accepted isolated visual direction checkpoint only. It is not production implementation, not whole Admin Web final visual acceptance, and must not be copied wholesale into production.

Historical reference:

- The earlier dark-navy, blue/cyan admin dashboard mockup and previous dark production sidebar remain historical implemented context.
- They are superseded by the Flux Sky shell/dashboard checkpoint.

Use active Flux Sky references to guide:

- Sidebar style.
- Topbar density.
- Card rhythm.
- Login panel tone.
- Dashboard surface layering.
- Responsive behavior.
- Brand mark placement.

Do not copy random visual details blindly. Do not invent a new style if the active direction is already established.

## 6. Admin Color System Direction

Flux Sky base palette direction:

- Light / neutral sidebar.
- Soft neutral app background.
- White/off-white cards.
- Subtle cool borders.
- Readable slate or near-black text in the main workspace.
- Light-only MVP theme. Dark mode is deferred and not part of MVP.

Flux Sky accent palette direction:

- shadcn/Tailwind sky for action and event states.
- Sky for active menu item, focus ring, primary actions, command selected row, notification highlights, and drawer active state.
- Cyan may remain a small AI scan accent only when token-approved.
- Optional violet for analytics accent.
- Emerald success.
- Amber warning.
- Red danger.

Historical implemented palette:

- Deep navy sidebar / near-black blue.
- Blue/cyan active state.
- Previous dark production sidebar styling.

This historical palette is superseded by the Flux Sky shell/dashboard checkpoint.

Forbidden palette direction:

- Public Web rose, pearl, or champagne as the admin base.
- Heavy pink UI.
- Random arbitrary colors.
- Tailwind blue or UI Colors blue for new Flux Sky action states.
- Current production dark/sidebar palette as the Flux Sky target.
- Neon-heavy palettes.
- Gradient-heavy backgrounds.
- Dark-mode palette implementation during MVP.

## 7. Brand Mark and Logo Direction

Preferred direction:

```text
Logo B: Semi-realistic App Icon Style
```

Required meaning:

- Front-facing face.
- Face scan.
- AI skin analysis.
- Scan brackets.
- AI mesh or node pattern.
- Skin analysis overlay or dots on forehead, cheeks, and T-zone.
- Sky/cyan tech accent when token-approved.
- Readable on the Flux Sky light / neutral sidebar and light surfaces.
- For historical legacy sidebar references only, note that the previous dark navy sidebar has been replaced by the Flux Sky shell/sidebar checkpoint.

Forbidden logo direction:

- Generic cube.
- Generic hexagon SaaS mark.
- Crypto-like geometric mark.
- Side-profile face that looks like generic Face ID only.
- Rose-heavy beauty icon.
- Overly realistic portrait that fails at small sizes.
- Detailed image that becomes unreadable at 24px or 32px.

Usage rules:

- For MVP, actual brand asset implementation must be a separate task.
- Future implementation should support sidebar mark, favicon, app icon, and login panel mark.
- MVP brand usage is light-only. For Flux Sky shell work, verify logo readability on the new light / neutral sidebar and on light surfaces.
- Logo must remain readable at 24px, 32px, 48px, and 192px.

## 8. Responsive Visual Direction

Desktop:

- Full light / neutral sidebar for Flux Sky shell work.
- Full topbar.
- Dense dashboard and list layout.

Tablet:

- Compact sidebar or rail.
- Reduced columns.
- Actions can collapse into menus.

Mobile:

- Topbar plus drawer menu.
- Stacked cards.
- Limited editor mode.
- No forced desktop table or editor squeezed into mobile.

## 9. Future UI Task Requirements

Every future UI prompt must include:

- Follow Admin Web Brand and Visual Direction Addendum v2.
- Follow `docs/admin-web-theme-token-contract.md`.
- For Flux Sky work, follow the light / neutral sidebar and shadcn/Tailwind sky action-state direction.
- Do not drift back to the old dark/navy sidebar unless a later accepted direction explicitly changes it.
- Do not use current Admin Web production sidebar as the Flux Sky visual target.
- Do not invent a new palette.
- Do not use Public Web theme or colors as the Admin Web base.
- Do not implement dark mode, a theme toggle, or `next-themes` in MVP UI tasks.
- Do not redesign freely.
- Do not change brand or logo direction without explicit approval.
- Use the approved Flux Sky Golden Mockup as visual reference only, not production code.
- Follow accepted shadcn/ui governance: `components/ui` is for generic primitives only; product-specific Skin Analyzer UI belongs in layout or feature folders.
- Generate screenshot evidence outside the repo.
- No screenshots means `PASS_WITH_NOTES` at best for UI implementation tasks.
- Technical `PASS` is not user or gatekeeper visual acceptance.

## 10. Gatekeeper Review Criteria

A UI task should not pass if:

- It uses the Public Web visual theme as the base.
- It introduces a new palette without approval.
- It uses generic cube or hex branding.
- It makes Admin Web look like a marketing landing page.
- It ignores responsive behavior.
- It does not provide screenshot evidence for UI changes.
- It implements a Flux Sky task with the old dark/navy sidebar or previous dark sidebar visual target.
- It uses Tailwind blue or UI Colors blue instead of shadcn/Tailwind sky for new Flux Sky action states.
- It copies Flux source, assets, exact class names, proprietary icons, logo, or template implementation.
- It copies the Golden Mockup component wholesale into production.
