# Spec: menu

## Purpose

Define the structure and behavior of the menu page (`/cardapio`) — an editorial,
printed-menu–style listing grouped by category, with category filtering, a single
spotlighted item per category, dish metadata (dietary tags, popularity, sold-out
state), inline add-to-cart, and a print layout.

---

## Requirements

### Requirement: Menu Listing Grouped by Category

The menu page (`/cardapio`) SHALL display all menu items grouped by category, as
an editorial vertical list using the dot-leader pattern (name … price), with a
thin divider labeling each category. It SHALL NOT use cards or boxed grids for
the listing.

#### Scenario: Rendering the full menu

GIVEN the menu data has loaded
WHEN the menu page renders without a category filter
THEN each non-empty category SHALL appear as a labeled section containing its
items, each item showing name, short description, and price.

#### Scenario: Loading and error states

GIVEN the menu data is loading or fails to load
WHEN the menu page renders
THEN it SHALL show a loading message while pending and an error message on
failure, in the interface's own voice.

---

### Requirement: Category Filtering via Query Param

The menu page SHALL read a `categoria` query param and, when it matches a known
category slug, restrict the listing to that category. Category chips at the top
SHALL set or clear this param, keeping filter state in the URL.

#### Scenario: Arriving with a category slug

GIVEN the user navigates to `/cardapio?categoria={slug}` with a valid slug
WHEN the page renders
THEN only that category's items SHALL be shown and its chip SHALL be marked
active.

#### Scenario: Clearing the filter

GIVEN a category filter is active
WHEN the user selects the "Tudo" chip
THEN the `categoria` param SHALL be removed and all categories SHALL be shown.

#### Scenario: Unknown or empty category

GIVEN the `categoria` slug matches no category (or the category has no items)
WHEN the page renders
THEN an empty-state message SHALL be shown with a link back to the full menu.

---

### Requirement: Featured Item Spotlight

Within a category, at most one item marked `featured` SHALL be rendered with the
circular spotlight treatment (featured size); all other items SHALL be text-only
rows with no photo.

#### Scenario: Category with a featured item

GIVEN a category contains an item marked as featured
WHEN that category renders
THEN that item SHALL show the circular spotlight and the remaining items SHALL
render as plain dot-leader rows.

---

### Requirement: Sold-Out Item State

An item marked as unavailable SHALL be visually de-emphasized, labeled as sold
out, and SHALL NOT be clickable nor offer an add-to-cart action.

#### Scenario: Rendering a sold-out item

GIVEN an item has `available` set to false
WHEN it renders in the list
THEN it SHALL show a "esgotado" label, appear dimmed, and expose neither a link
to its detail nor an add-to-cart control.

---

### Requirement: Popularity Badge

An item whose popularity meets the threshold SHALL display a "mais pedido"
metadata label. The label SHALL be secondary metadata, not a primary accent.

#### Scenario: Popular item

GIVEN an item's popularity is at or above the threshold
WHEN it renders
THEN a "mais pedido" label SHALL appear as secondary (stone) metadata.

---

### Requirement: Dietary Tags

An item MAY carry dietary/allergen tags (vegetariano, vegano, sem glúten,
picante), rendered as secondary metadata labels in the item row.

#### Scenario: Item with tags

GIVEN an item has one or more dietary tags
WHEN it renders
THEN each tag SHALL appear as a human-readable label as secondary metadata.

---

### Requirement: Add to Cart from Menu

Each available menu item SHALL offer an inline control to add it to the cart,
using the existing cart context, without navigating away from the menu.

#### Scenario: Adding an item to the cart

GIVEN an available item is shown in the list
WHEN the user activates its add-to-cart control
THEN the item SHALL be added to the cart and the menu SHALL remain on screen (no
navigation to the item's detail).

#### Scenario: Add control accessibility

GIVEN the add-to-cart control renders
WHEN inspected by assistive technology
THEN it SHALL expose an accessible label identifying the dish it adds.

---

### Requirement: Printable Menu

The menu page SHALL provide a way to print the menu. When printing, the layout
SHALL show the complete menu (ignoring any active filter) as ink-on-paper, hiding
navigation and interactive controls.

#### Scenario: Printing the menu

GIVEN the user triggers "Imprimir cardápio" (or the browser print action)
WHEN the print layout renders
THEN all categories SHALL be shown regardless of the active filter, and the
sidebar, filter chips, and add-to-cart/print controls SHALL be hidden.
