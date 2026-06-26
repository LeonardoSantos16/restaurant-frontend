# Spec Delta: design-system

## ADDED Requirements

### Requirement: Color Tokens

The system SHALL expose the five named color tokens (basalt, ivory, brass, wine,
stone) as Tailwind theme colors, available to every component.

#### Scenario: Using the accent color

GIVEN a developer is styling an interactive element (CTA, price, active link)
WHEN they need an accent color
THEN they SHALL use `brass` and SHALL NOT introduce additional accent hues.

### Requirement: Typography Roles

The system SHALL provide three font-family roles — display (Fraunces), body
(Work Sans), and mono (IBM Plex Mono) — mapped as Tailwind `fontFamily` utilities.

#### Scenario: Displaying a price

GIVEN a menu item is rendered
WHEN its price is displayed
THEN the price SHALL use the `mono` font family.

### Requirement: Signature Spotlight Element

The system SHALL define a circular vignette image treatment ("spotlight") restricted
to the page hero and at most one featured item per menu category.

#### Scenario: Rendering a standard menu item

GIVEN a menu item is not the featured item of its category
WHEN it is rendered in the list
THEN it SHALL NOT display a spotlight image, only name, description, and price.

### Requirement: Reduced Motion Support

The system SHALL respect the `prefers-reduced-motion` media feature by disabling
scale animations while preserving simple fades.

#### Scenario: User has reduced motion enabled

GIVEN a user's OS has reduced motion enabled
WHEN the hero spotlight loads
THEN only a fade-in SHALL play, with no scale transform.

### Requirement: Minimum Contrast

The system SHALL ensure all text/background color pairings used for body copy meet
WCAG AA contrast (4.5:1) at minimum, and AAA (7:1) where feasible for primary text.

#### Scenario: Rendering body text

GIVEN body copy is rendered in `ivory` on `basalt`
WHEN contrast is measured
THEN it SHALL meet or exceed WCAG AAA (7:1).
