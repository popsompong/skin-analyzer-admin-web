# Flux Sky Rules

## Definition

Flux Sky means:

- Light / neutral sidebar.
- Light neutral workspace.
- shadcn/Tailwind sky action and event states.
- Clean SaaS/admin density.
- Skin Analyzer-specific product content.

## Boundaries

- Flux is a public visual and interaction reference only.
- The user is not buying the Flux license.
- Do not copy Flux code, assets, logos, exact class names, proprietary icons, template implementation, user identity, or sample data.
- The Golden Mockup is a visual reference only, not production source.
- Do not copy the Golden Mockup component wholesale into production.

## Visual Rules

- Do not revert to old dark/navy/black sidebar for Flux Sky work.
- Do not use the old Admin Web dark sidebar or previous production sidebar as the Flux Sky visual target.
- Do not use current/historical blue/cyan action palette as the Flux Sky target.
- Use sky for action/event states through Admin Web tokens.
- Keep hover quieter than active.
- Keep status semantics distinct: success, warning, danger, disabled, forbidden, and destructive states are not sky by default.
- Keep the UI calm, dense, readable, and admin-focused.
- Do not add heavy shadows, heavy gradients, glassmorphism, neon effects, dark mode, or theme toggles unless explicitly approved.

## Token Direction

Production components should consume Admin Web semantic tokens for:

- Sidebar surface, elevated surface, border, text, muted labels, hover, active, active rail, focus ring, badge, collapsed rail, drawer surface, drawer backdrop.
- Topbar surface and border.
- Command/search focus and selected result states.
- Dropdown surface and highlight states.
- Notification accent and soft accent.
- Primary action and selected states.

If existing tokens cannot represent a role, stop and scope a token decision before implementation.

## Visual QA Failure Conditions

Flux Sky UI work should fail or be capped at notes if it:

- Uses old dark/navy/black sidebar as target.
- Uses Tailwind blue or UI Colors blue for new Flux Sky action states.
- Uses Flux purple/violet directly.
- Turns the entire sidebar sky instead of light neutral with sky accents.
- Copies Flux or Golden Mockup code/classes/assets.
- Treats technical `PASS` as user/gatekeeper visual acceptance.
