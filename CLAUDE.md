# CLAUDE.md

## Design System

`DESIGN.md` (source: `openspec/specs/design-system/spec.md` once the
`define-design-system` change is archived) is the single source of truth for
color, typography, layout, motion, and accessibility on this project.

- Never introduce a color outside the 5 defined tokens (`basalt`, `ivory`,
  `brass`, `wine`, `stone`). No new hues, no gradients, no OKLCH-derived
  palettes.
- Never introduce a font outside the 3 defined roles (display, body, mono).
- The spotlight circular vignette is the only signature visual element — no
  shadowed cards, no icon arrays.
- Every entrance animation must respect `prefers-reduced-motion`.

Read `DESIGN.md` before styling any new page or component.
