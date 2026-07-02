# Spec Delta: about-page

## ADDED Requirements

### Requirement: Atmosphere Hero

The about page (`/sobre`) SHALL open with the circular spotlight (hero size)
showing an ambiance photo, followed by a positioning statement as the page's
single `<h1>` and a short lede. The `<h1>` SHALL be the positioning statement
itself, NOT a generic label such as "Sobre" or "Nossa História".

#### Scenario: Rendering the hero

GIVEN the about page renders
WHEN the hero section appears
THEN it SHALL show one spotlight image with brand-voice alt text, a positioning
statement as the sole `<h1>`, and a short lede in secondary (stone) text.

#### Scenario: Reduced motion

GIVEN the user prefers reduced motion
WHEN the hero spotlight animates in
THEN it SHALL fade in without the scale transform (the global reduced-motion
fallback).

### Requirement: Editorial Philosophy Prose

The about page SHALL present the restaurant's philosophy as two or three short
paragraphs in the brand's measured voice, WITHOUT a labeled "story" section
header.

#### Scenario: Rendering the prose

GIVEN the about page renders
WHEN the philosophy passage appears
THEN it SHALL be plain prose paragraphs with no "Nossa História"/"Our Story"
style heading above them.

### Requirement: Practical Information Block

The about page SHALL present practical details (hours, address, contact) as a
definition list, preceded by a thin divider. Numeric values (hours, phone) SHALL
render in the mono type role; labels SHALL be secondary (stone) text.

#### Scenario: Rendering the info block

GIVEN the about page renders
WHEN the practical information appears
THEN it SHALL be a `<dl>` of label/value pairs for hours, address, and contact,
with the numeric parts in mono.

### Requirement: Reservation Call to Action

The about page SHALL end with a single discreet accent (brass) link that
navigates to the reservations page (`/reservas`).

#### Scenario: Following the reservation CTA

GIVEN the about page renders
WHEN the user activates the reservation link
THEN the app SHALL navigate to `/reservas`.
