# Design

## Color Tokens

| Token  | Hex       | Usage                                                             |
| ------ | --------- | ----------------------------------------------------------------- |
| basalt | `#15140F` | Primary background (near-black with olive bias, not neutral cold) |
| ivory  | `#F1ECDD` | Primary text on dark background                                   |
| brass  | `#C49A4A` | SOLE accent — CTAs, prices, hover, active links                   |
| wine   | `#5B2430` | Rare secondary accent — "sold out", chef's highlight, badges      |
| stone  | `#8A8577` | Secondary text, dividers, metadata (hours, category labels)       |

**Rules:**

- `brass` appears in at most 1-2 elements per viewport. Never as a full-section background.
- `wine` is an exception, not a pattern — max one use per page.
- Contrast: `ivory` on `basalt` ≈ 14.8:1 (AAA). `brass` on `basalt` ≈ 6.2:1 (AA for large text/UI only — never for body paragraphs).
- Do NOT introduce OKLCH-derived palettes, gradients, or any hue outside this table.

## Typography

| Role    | Font          | Weights                                           | Usage                            |
| ------- | ------------- | ------------------------------------------------- | -------------------------------- |
| Display | Fraunces      | 400, 600 (italic optional for featured dish name) | Dish names, section titles, hero |
| Body    | Work Sans     | 400, 500                                          | Descriptions, navigation, forms  |
| Mono    | IBM Plex Mono | 400                                               | Prices, hours, numbers ONLY      |

Scale (rem, base 16px): display-xl 3.5 / display-lg 2.25 / body-lg 1.125 / body-md 1 / body-sm 0.875 / mono-md 1.

Tracking: display uses `-0.01em`. Body and mono use default tracking.

Menu items use a dot-leader pattern, price always in mono:

```
Burrata .................................... R$ 42
```

## Layout

Principle: **editorial, not SaaS-card.** No shadowed cards, no large border-radius, no boxed grids for listings. Separation comes from negative space and thin dividers, never containers.

- Central container ~720px max-width for menu listings (printed-menu reading feel). Hero sections may be full-bleed.
- Category divider: 1px line in `stone` at 20% opacity, with the category label overlaid (e.g. "— Entradas —").
- Generous vertical spacing between items (min 24px) — this replaces the "card" as the separator.
- 12-column grid available for pages that need it (e.g. reservations), but the menu itself is a vertical list, not a grid.

## Signature Element: Circular Spotlight

- Dish photography in circular crop, radial dark vignette blending into `basalt` at the edges — no hard border, no drop shadow.
- Diameter: ~280px in hero, ~120px for featured items within a listing.
- Restricted use: page hero + at most ONE featured item per category. Standard menu items carry NO photo — name, short description, and price only. This prevents the signature element from becoming repetitive wallpaper.

## Motion

- Hero: fade-in + subtle scale (0.97→1) on the circular spotlight on load. ~600ms, ease-out. The ONLY orchestrated motion moment on the page.
- List item hover: `stone` → `ivory` text color shift, nothing else.
- No repeated scroll-reveal per list item — animation overload is a generic-AI-output signal.
- `prefers-reduced-motion: reduce` disables scale, keeps fade only. Non-negotiable.

## Accessibility

- Visible focus: 2px `brass` outline, 2px offset, on every interactive element.
- Text is never placed directly over the spotlight photo without a scrim — use a `basalt` gradient at 60% opacity at the image base when text overlaps.

## Tailwind Tokens

```js
// tailwind.config.js (excerpt)
theme: {
  extend: {
    colors: {
      basalt: '#15140F',
      ivory: '#F1ECDD',
      brass: '#C49A4A',
      wine: '#5B2430',
      stone: '#8A8577',
    },
    fontFamily: {
      display: ['Fraunces', 'serif'],
      body: ['"Work Sans"', 'sans-serif'],
      mono: ['"IBM Plex Mono"', 'monospace'],
    },
    fontSize: {
      'display-xl': ['3.5rem', { letterSpacing: '-0.01em' }],
      'display-lg': ['2.25rem', { letterSpacing: '-0.01em' }],
      'body-lg': '1.125rem',
      'body-md': '1rem',
      'body-sm': '0.875rem',
    },
  },
}
```
