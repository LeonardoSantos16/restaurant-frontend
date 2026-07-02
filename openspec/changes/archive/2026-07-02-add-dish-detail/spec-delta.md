# Spec Delta: menu

## ADDED Requirements

### Requirement: Dish Detail Page

The dish detail page (`/cardapio/:id`) SHALL present a single menu item as an
editorial layout: a circular spotlight image, the category as a link back to that
category's filtered menu, the dish name, its price, secondary metadata, and its
description.

#### Scenario: Rendering a dish

GIVEN a valid item id in the route
WHEN the detail page loads the item
THEN it SHALL show the item's spotlight image, name, price, description, and its
category as a link to `/cardapio?categoria={slug}`.

#### Scenario: Metadata on detail

GIVEN the item is popular or carries dietary tags
WHEN the detail page renders
THEN a "mais pedido" label and/or the dietary tags SHALL appear as secondary
(stone) metadata, consistent with the menu listing.

### Requirement: Add to Cart with Quantity

The dish detail page SHALL provide a quantity selector and a primary
"Adicionar ao carrinho" action that adds the selected quantity of the item to the
cart using the existing cart context.

#### Scenario: Choosing a quantity and adding

GIVEN an available item is shown with the quantity selector at N
WHEN the user activates "Adicionar ao carrinho"
THEN N units of the item SHALL be added to the cart and the cart total SHALL
reflect the item price times N.

#### Scenario: Quantity lower bound

GIVEN the quantity selector is at its minimum (1)
WHEN the page renders
THEN the decrement control SHALL be disabled so the quantity cannot go below 1.

### Requirement: Related Items in Category

The dish detail page SHALL show a section of other items from the same category
(excluding the current item), reusing the menu row treatment. When there are no
other items in the category, the section SHALL be omitted.

#### Scenario: Category with siblings

GIVEN the current item's category contains other items
WHEN the detail page renders
THEN a labeled section SHALL list up to three of those items as dot-leader rows,
each linking to its own detail.

#### Scenario: Category with no siblings

GIVEN the current item is the only item in its category
WHEN the detail page renders
THEN the related-items section SHALL NOT be shown.

### Requirement: Sold-Out Detail State

When the item on the detail page is unavailable, the page SHALL still show the
item but SHALL label it as sold out and SHALL NOT offer a quantity selector or an
add-to-cart action.

#### Scenario: Rendering a sold-out dish

GIVEN the item has `available` set to false
WHEN the detail page renders
THEN it SHALL show a "esgotado" label and expose neither a quantity selector nor
an add-to-cart control.

### Requirement: Detail Loading and Not-Found States

The dish detail page SHALL show a loading message while the item is being fetched
and a not-found message with a link back to the menu when the item cannot be
loaded.

#### Scenario: Loading the item

GIVEN the item request is pending
WHEN the detail page renders
THEN it SHALL show a loading message in the interface's own voice.

#### Scenario: Unknown item id

GIVEN the route id matches no item (the request fails or returns 404)
WHEN the detail page renders
THEN it SHALL show a "Prato não encontrado" message with a link back to the full
menu.
