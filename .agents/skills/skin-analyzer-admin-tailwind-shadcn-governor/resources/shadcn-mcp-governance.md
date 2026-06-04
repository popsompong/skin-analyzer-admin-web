# shadcn MCP Governance

## What shadcn MCP Can Help With

The official shadcn MCP server can help AI assistants:

- Search registry components.
- View registry component code and docs.
- Install registry components when explicitly approved.
- Work with configured registries.

## What This Task Did Not Do

- MCP setup is not performed in this skill foundation task.
- No Codex MCP config was changed.
- No `~/.codex/config.toml` edit was made.
- No MCP tool was used to add components.

## Approval Rules

- Codex must not configure `~/.codex/config.toml` without explicit user approval.
- MCP install/add actions require explicit task scope and user/gatekeeper approval.
- MCP must not add components during read-only, planning, audit, docs, or governance tasks.
- MCP must not bypass the startup safety gate, clean worktree requirement, component-placement rules, or package-manager rules.

## Reporting Rules For MCP-Assisted Adds

Every MCP-assisted component add must report:

- Exact MCP action or CLI command.
- Generated files.
- Changed files.
- Dependency impact.
- Whether `components.json` changed.
- Token cleanup needed or performed.
- shadcn/ui outcome.
- Validation commands/results.
- Screenshot evidence when UI output changes.

## Risk Notes

Configuring MCP without approval gates can:

- Mutate `components/ui`, `package.json`, and `package-lock.json` unexpectedly.
- Add dependencies before scope acceptance.
- Add stock styling that ignores Admin Web semantic tokens.
- Introduce dark-mode, raw color, radius, or shadow drift.
- Place product-specific UI in `components/ui`.
- Create package-manager drift if non-npm examples are followed.

Use official shadcn Skill/MCP for mechanics only after project governance and user approval are in place.
