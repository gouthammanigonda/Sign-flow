# SignFlow UI Kit — Phase-by-Phase Execution Guide

Use this file as the source of truth for executing the project in Codex one phase at a time. Do not ask Codex to implement every phase in one prompt. Complete the current phase, review the changes, run the acceptance checks, and explicitly approve the next phase.

## Project goal

Build a reusable, themeable React component system using Ant Design, with a custom React component-preview page and live theme editor. The preview page replaces Storybook for now.

## Current SignFlow design specification

Use the following existing project values as the baseline visual source of truth. **Do not use Figma as a reference for this project.** These values describe the currently implemented SignFlow blue/navy document-workflow UI; there is no “accord” dashboard reference in the codebase.

### Brand, typography and layout

- **Brand direction:** SignFlow blue/navy document-workflow UI.
- **Font stack:** `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.
- **Font weights:** `400`, `600`, `700`.
- **Type scale:** caption `12px`; label `13px`; body `14px` with line-height `1.55`; heading `20px`; page title/display `30px`. A `32px` display token is not currently defined.
- **Spacing scale:** `4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 72px`.
- **Radii:** small `7px`; medium `10px`; large `14px`; pill `999px`.
- **Shadows:** card `0 1px 2px rgba(15, 23, 42, 0.025)`; interactive hover `0 8px 20px rgba(15, 23, 42, 0.08)`.
- **Controls:** default Button/Input height `40px`. Small and large sizes currently use Ant Design defaults; no custom small/large heights are defined.
- **Responsive breakpoint:** mobile `max-width: 760px`. No separate tablet breakpoint is defined.

### Core colors and states

| Token / purpose             | Current value                      |
| --------------------------- | ---------------------------------- |
| Primary                     | `#2563EB`                          |
| Primary hover               | `#1D4ED8`                          |
| Primary text / navy         | `#14213D`                          |
| Secondary / muted text      | `#64748B`                          |
| Canvas                      | `#F8FAFC`                          |
| Surface                     | `#FFFFFF`                          |
| Border                      | `#E2E8F0`                          |
| Success                     | `#16A34A`                          |
| Warning                     | `#D97706`                          |
| Danger                      | `#DC2626`                          |
| Primary subtle              | `#EFF6FF`                          |
| Focus border                | `#93C5FD`                          |
| Danger subtle               | `#FEF2F2`                          |
| Focus ring                  | `0 0 0 3px rgba(37, 99, 235, 0.2)` |
| Selected sidebar background | `#EFF6FF`                          |
| Selected sidebar text       | `#2563EB`                          |

### Known gaps and implementation notes

- **Dark theme is out of scope for now.** Do not design, implement, or propose dark-theme tokens in the current phases. Keep the architecture extensible enough to add a dark theme later, but do not spend time building that capability now.
- Secondary and disabled button states currently use Ant Design defaults; there are no SignFlow-specific tokens for them. Decide in Phase 0 whether explicit tokens are needed for the component-kit scope.
- Buttons and inputs use the globally configured Ant Design medium radius (`10px`) unless Ant Design overrides it.
- Preserve the supplied values as the baseline. Do not silently normalize, replace, or invent values. If a new token is useful, identify it as a proposed addition and explain why.
- In Phase 0, inspect the existing repository and styles/configuration, where available, to verify how these values are currently used. Report any discrepancy between this specification and the code rather than assuming either one is implemented perfectly.

## Non-negotiable engineering rules

1. **Ant Design first.** Use native Ant Design components and documented APIs whenever they satisfy the requirement. Do not recreate their behavior with raw HTML or SCSS.
2. **One canonical token source.** Keep design values in centralized TypeScript tokens and map them through one Ant Design theme adapter. Do not create a parallel token system.
3. **Minimal, readable code.** Prefer the simplest maintainable implementation. Avoid speculative abstractions, redundant wrappers, excessive interfaces, duplicated mappings and unnecessary state.
4. **Use judgment with names.** Names should suit the component: button sizes can be `small | medium | large`; text sizes can be `xs | s | m | l | xl`; semantic variants can be `primary | secondary | success | warning | danger`. Do not force unrelated components to share a type when their meanings differ.
5. **Centralize meaningful mappings.** Public SignFlow names may map to Ant Design's expected values through one clear adapter. Keep canonical design values in one authoritative place.
6. **Wrappers must earn their place.** Build `SFButton`, `SFText`, `SFCard`, or other wrappers only when they add real SignFlow-specific value. Document why each wrapper exists. Use native Ant Design components directly otherwise.
7. **SCSS only when needed.** First check Ant Design props, theme tokens and documented customization APIs. If custom SCSS is genuinely required, colocate it with the component. Do not create empty or unnecessary SCSS files or one giant stylesheet for unrelated components.
8. **Preview actual components.** The component gallery must render the real production components, not screenshots or duplicate mock implementations. Group useful variants, sizes and states without generating every possible prop combination.
9. **Theme behavior must be real.** Theme changes should update native Ant Design components and applicable SignFlow wrappers. Do not fake changes with ad hoc inline styles.
10. **Safe theme import/export.** Use a versioned JSON schema with runtime validation. Invalid imports must show a clear error and preserve the current active theme.
11. **Verify before claiming.** Run the checks required by the current phase. Never claim tests, builds or types pass unless they were actually run.
12. **No Storybook for now.** Use a custom React preview page and theme editor.
13. **Research relevant official docs.** Verify APIs against the installed version. Avoid researching unrelated features or turning research into a blocker.
14. **No scope creep.** Do not build the complete SignFlow product screens, backend or cloud theme storage in this project phase.
15. **Reviewable increments.** Keep each phase focused. Report files changed, decisions made, commands run, results, known issues and anything needing approval.

## Workflow for every phase

For each phase:

1. Read this guide and the current repository instructions (`AGENTS.md`, if present).
2. Inspect the current code before editing.
3. State a short implementation plan and any consequential assumptions.
4. Implement only the approved phase; do not silently begin later phases.
5. Run the relevant checks and report their actual results.
6. Review for duplicated responsibilities, unnecessary complexity, accessibility issues and Ant Design functionality that was recreated unnecessarily.
7. Summarize files changed, decisions, checks, failures and follow-ups.
8. Stop and wait for approval before moving to the next phase.

---

# Phase 0 — Discovery and architecture proposal

**Status:** Do not code yet.

### Codex prompt

> Read `SIGNFLOW_PHASE_EXECUTION_GUIDE.md` completely. Perform Phase 0 only. Inspect the repository and any existing project instructions, then research only the relevant official documentation for the intended React, TypeScript, Vite and Ant Design versions. Do not create or modify files, scaffold the project, or install dependencies.
> Use the **Current SignFlow design specification** in this guide as the baseline. Inspect the existing repository and styles/configuration, where available, to verify how these values are used. Do not use Figma. Distinguish supplied/current values from proposed additions and report discrepancies rather than inventing values.
>
> Return a concise, evidence-based proposal covering:
>
> 1. Recommended dependency versions and compatibility.
> 2. A minimal folder structure with reasons for important boundaries.
> 3. Canonical token categories, naming rules and types.
> 4. The Ant Design theme adapter and how live token changes will propagate.
> 5. Light and Custom theme strategy. Light is the default baseline; Custom means user-edited overrides based on Light.
> 6. Versioned theme JSON schema, runtime validation and failure behavior.
> 7. Local persistence and graceful handling of unavailable storage.
> 8. Which wrappers are justified initially and why; leave other Ant Design components native unless a real need appears.
> 9. Component preview page and theme editor design.
> 10. Testing, linting, type-checking and build strategy.
> 11. Phases 1–6 with clear acceptance criteria.
> 12. Risks, trade-offs and only the unresolved questions that materially affect architecture.
>
> Cite official docs for library-specific claims and distinguish verified capabilities from assumptions. Keep the plan practical and avoid overengineering. Stop after the proposal and wait for my approval.

### Expected output

Codex should return a **written architecture proposal in its response only**, not code or generated files. It should include:

- Recommended versions with official documentation links and compatibility notes.
- Proposed folder tree and a brief reason for each important boundary.
- Token categories, example token names/types, and the central Ant Design mapping approach.
- Light and Custom theme strategy, with Light as the default and Custom based on user-edited Light-token overrides. Dark theme is explicitly out of scope.
- A sample versioned theme JSON shape plus validation and error-handling behavior.
- Initial wrapper recommendations with rationale, and components that should remain native Ant Design.
- Preview/theme-editor layout and interaction plan.
- Phase-by-phase deliverables and measurable acceptance criteria.
- Risks, assumptions, unresolved decisions, and commands/checks planned for later phases.

The response must explicitly confirm that **no files, dependencies, or project scaffolding were changed**. List any supplied design values that could not be verified in the repository, and report discrepancies without inventing values.

### Acceptance checklist

- [ ] No files were created or changed and no packages were installed.
- [ ] Relevant official APIs and version compatibility were checked.
- [ ] Canonical tokens and the Ant Design adapter are clearly defined.
- [ ] The theme JSON and validation strategy are defined.
- [ ] Preview/editor scope is clear and excludes Storybook.
- [ ] Every proposed abstraction has a reason.
- [ ] I reviewed and approved the plan.

---

# Phase 1 — Project foundation

### Codex prompt

> Implement Phase 1 only, based on the approved Phase 0 proposal and this guide. Set up the minimal React + TypeScript + Vite project and essential tooling. Add only the approved dependencies and scripts. Establish the agreed folder structure and a minimal working app. Do not implement the full token system, theme editor or component library yet. Avoid placeholder abstractions and unused files. Run the relevant install, type-check and production-build commands. Report exact results and stop for review.

### Expected output

A minimal, runnable React + TypeScript + Vite repository foundation, including the approved package scripts, essential configuration, agreed folder structure, a simple app entry point, and concise setup instructions. Codex's final report should list the files added/changed, install/start commands, and the actual type-check/build results. There should be **no finished token system, wrapper library, theme editor, or gallery yet**.

### Acceptance checklist

- [ ] Project starts locally using the documented command.
- [ ] Production build succeeds.
- [ ] Type-check succeeds.
- [ ] Lint/test scripts are configured where approved.
- [ ] Dependencies are necessary and compatible.
- [ ] No theme/component scaffolding was added prematurely.
- [ ] Setup steps are documented.

---

# Phase 2 — Canonical tokens and Ant Design theme foundation

### Codex prompt

> Implement Phase 2 only. Create the canonical TypeScript token definitions, the initial Light preset and Custom override model, and one central adapter that maps supported tokens to Ant Design's documented theme configuration. Keep public naming appropriate to each component; do not force one size vocabulary everywhere. Use the supplied design specification as the baseline; verify it against the repository where possible, and label any new/proposed values clearly. Add a minimal proof in the app: changing one canonical primary-color token must visibly update a native Ant Design Button through the theme system, not through manual inline color styles. Add focused tests for token defaults and mapping where practical. Do not build the complete theme editor or component gallery yet. Run checks and stop for review.

### Expected output

A small canonical token module, an initial Light preset, a Custom override model, and one Ant Design theme adapter wired into the app. The app must visibly demonstrate that changing a canonical primary-color token changes a **native Ant Design Button** through `ConfigProvider`/the approved theme pipeline. Include focused token/adapter tests where practical and identify which values came from the supplied design specification versus proposed/provisional defaults. No full editor or component gallery yet.

### Acceptance checklist

- [ ] Canonical tokens are the only source of truth for defined design values.
- [ ] Ant Design configuration is derived centrally.
- [ ] A token change updates a native Ant Design component.
- [ ] No redundant CSS-variable or SCSS token system exists.
- [ ] No unnecessary wrappers were added.
- [ ] Type-check, tests and build pass.

---

# Phase 3 — Theme runtime, persistence and JSON

### Codex prompt

> Implement Phase 3 only, using the approved token model. Add runtime theme state and live switching, local persistence, reset behavior, and versioned JSON import/export. Validate imported JSON at runtime using the project's approved validation approach. Only accept known presets and supported override keys; reject malformed or unsupported data safely. A failed import must not partially change or replace the active theme. Handle browser storage being unavailable or throwing errors without crashing. Keep the JSON limited to schema version, theme name, base preset and supported overrides; do not serialize derived Ant Design configuration or generated CSS. Add focused tests for valid import/export, invalid data, persistence and failure cases. Run checks and stop for review.

### Expected output

A working theme runtime that switches presets and applies supported overrides live; safely saves/restores theme state locally; supports reset; and exports/imports a documented, versioned JSON format. Include runtime validation and focused tests for valid and invalid imports, storage failures, and persistence. Demonstrate that a rejected import leaves the current theme unchanged. The full visual editor is still out of scope until Phase 5.

### Acceptance checklist

- [ ] Preset switching updates the theme without a reload.
- [ ] Supported overrides are applied through the central theme pipeline.
- [ ] Save and reload restores the saved theme.
- [ ] Reset behavior is clear and works.
- [ ] Export produces documented, versioned JSON.
- [ ] Valid import works; invalid import shows an error and preserves the active theme.
- [ ] Storage failures do not crash the app.
- [ ] Tests, type-check and build pass.

---

# Phase 4 — Justified SignFlow wrappers

### Codex prompt

> Implement Phase 4 only. Review the approved wrapper decisions and build only the wrappers that provide real SignFlow-specific value. Start with the approved candidates such as SFButton, SFText and SFCard only if their rationale still holds. Use Ant Design components internally and expose a small, explicit, strongly typed API with sensible defaults. Button sizes may use `small | medium | large`; text sizes may use `xs | s | m | l | xl`; choose vocabulary based on component meaning. Map to Ant Design values in one clear place where necessary. Do not duplicate Ant Design variants, states, accessibility behavior or styling. Add component-local SCSS only when a verified requirement cannot be handled through Ant Design's props/theme APIs. Add tests for meaningful behavior. Do not build the preview page yet. Run checks and stop for review.

### Expected output

Only the approved, justified production wrappers (for example, `SFButton`, `SFText`, and `SFCard` if confirmed by the architecture) with small typed APIs, sensible defaults, centralized mappings, and tests for meaningful behavior. Include a short rationale for each wrapper and explicitly list components intentionally left as native Ant Design. No preview gallery yet.

### Acceptance checklist

- [ ] Every wrapper has a documented reason to exist.
- [ ] Native Ant Design behavior and accessibility are preserved.
- [ ] Props and shared types are minimal and meaningful.
- [ ] Token-based styling comes from the theme system.
- [ ] Component SCSS is colocated and only exists when needed.
- [ ] Tests, type-check and build pass.

---

# Phase 5 — Component preview page and theme editor UI

### Codex prompt

> Implement Phase 5 only. Build the custom React component gallery and theme editor using the actual production components. Do not add Storybook. Organize the gallery by component, and group useful sizes, variants, semantic colors and states for quick visual comparison. Avoid exhaustive prop Cartesian products and avoid duplicate preview-only component implementations. Connect the editor to the existing theme runtime so supported token edits and preset changes update previews immediately. Include local save, reset, JSON export and JSON import with clear validation feedback. Keep the interface functional and simple rather than spending time on unnecessary dashboard decoration. Test the key theme-editor flows and run checks. Stop for review.

### Expected output

A working route/page in the app that previews real native Ant Design components and SignFlow wrappers, organized into useful component sections. Include a live theme editor connected to the existing runtime, preset switching, supported token controls, local save/reset, JSON import/export, and clear validation feedback. The page should make visual differences easy to compare without listing every possible prop combination. Include tests for the main editor flows and brief usage instructions.

### Acceptance checklist

- [ ] Gallery renders production components.
- [ ] Component examples are grouped clearly and are not redundant.
- [ ] Theme editor changes update the gallery immediately.
- [ ] Preset selection, token editing, save, reset, import and export work.
- [ ] Invalid imports are handled visibly and safely.
- [ ] No Storybook dependency or parallel component implementation was added.
- [ ] Tests, type-check and build pass.

---

# Phase 6 — Final quality, accessibility and documentation

### Codex prompt

> Implement Phase 6 only. Audit the full project against this guide and the accepted architecture. Fix root causes rather than layering patches. Check for duplicated tokens, hardcoded theme values, unnecessary wrappers, redundant SCSS, unsafe JSON handling, broken persistence, weak typing, inaccessible controls, dead code and unnecessary dependencies. Verify keyboard interaction and accessible names for the preview/theme editor. Run the complete test suite, lint, type-check and production build; report exact commands and results. Update documentation with setup, architecture, token conventions, adding a component, editing presets and JSON schema. Do not add new features or broaden scope. Stop and provide a final audit summary.

### Expected output

A final quality report plus any focused fixes needed to meet the agreed scope. Documentation should explain setup, architecture, token conventions, adding a component, editing presets, and the JSON schema. The report must include the exact commands run and their real results for tests, lint, type-check, and production build; accessibility checks performed; remaining limitations; and a phase acceptance summary. Do not claim a check passed if it was not run.

### Acceptance checklist

- [ ] All project acceptance criteria are met.
- [ ] No duplicate token or styling system exists.
- [ ] Theme behavior is consistent for native Ant Design components and SignFlow wrappers.
- [ ] Import validation and persistence failure cases are covered.
- [ ] Keyboard and accessible-name basics are checked.
- [ ] Tests, lint, type-check and production build pass.
- [ ] Setup and maintenance documentation is accurate.
- [ ] Remaining limitations are explicitly listed.

---

## Phase tracking

Update this table as phases are reviewed. Do not mark a phase complete merely because code was generated; use the acceptance checklist and actual command results.

| Phase | Description                         | Status      | Approval / notes |
| ----- | ----------------------------------- | ----------- | ---------------- |
| 0     | Discovery and architecture proposal | Approved    | Approved by user |
| 1     | Project foundation                  | Completed   | Passed typecheck, build, test, lint |
| 2     | Tokens and Ant Design theme         | Completed   | Approved by user; token & adapter tests pass |
| 3     | Theme runtime, persistence and JSON | Completed   | Runtime, storage, JSON schema validation tests pass |
| 4     | SignFlow wrappers                   | Completed   | SFButton, SFText, SFCard built with tests; docs in README |
| 5     | Preview page and theme editor       | Completed   | Custom gallery and live theme editor with JSON import/export |
| 6     | Quality, accessibility and docs     | Completed   | Audit, a11y labels, README documentation, all checks pass |

## How to use this guide

1. Keep this file at the repository root as `SIGNFLOW_PHASE_EXECUTION_GUIDE.md`.
2. Start with the Phase 0 prompt only.
3. Review Codex's proposal and approve or revise it.
4. After approval, send the prompt for Phase 1.
5. After each phase, review the diff and acceptance checklist before moving forward.
6. If a phase fails acceptance checks, fix that phase before proceeding.
7. If requirements change, update this guide first so Codex has one consistent source of truth.
