# Spec Delta: cart

## ADDED Requirements

### Requirement: Cart Item Listing

The cart page (`/carrinho`) SHALL list every item currently in the cart,
showing each item's name, a short description, its unit price, its quantity,
and the resulting line price.

#### Scenario: Rendering items in the cart

GIVEN the cart contains one or more items
WHEN the cart page renders
THEN it SHALL show one row per item with name, description, quantity, and
line price (unit price times quantity).

### Requirement: Cart Quantity Adjustment

The cart page SHALL let the user change the quantity of any item using the
existing quantity selector, and the change SHALL be reflected immediately in
that item's line price and in the cart total.

#### Scenario: Increasing a line item's quantity

GIVEN an item in the cart has quantity N
WHEN the user increases the quantity to N+1 via the quantity selector
THEN that item's line price SHALL become unit price times (N+1) and the cart
total SHALL be recalculated to include the change.

### Requirement: Cart Item Removal

The cart page SHALL let the user remove an item from the cart entirely,
regardless of its current quantity, via a dedicated remove action distinct
from decreasing quantity.

#### Scenario: Removing an item

GIVEN an item is present in the cart with any quantity
WHEN the user activates the remove action for that item
THEN the item SHALL no longer appear in the cart and the cart total SHALL be
recalculated without it.

### Requirement: Cart Total Calculation

The cart SHALL expose a total equal to the sum of each item's price times its
quantity, and the total SHALL always match the sum of the currently listed
line prices.

#### Scenario: Total after quantity change

GIVEN a cart with items of known prices and quantities
WHEN any item's quantity changes
THEN the cart total SHALL equal the sum of price times quantity across all
remaining items.

### Requirement: Clear Cart

The cart page SHALL provide a secondary action to remove all items from the
cart at once, visually separated from the primary reservation call to
action.

#### Scenario: Clearing the cart

GIVEN the cart contains one or more items
WHEN the user activates "Esvaziar carrinho"
THEN the cart SHALL contain no items and the page SHALL show the empty cart
state.

### Requirement: Empty Cart State

When the cart contains no items, the cart page SHALL show a message in the
interface's own voice and a link back to the menu, instead of the item list
and total.

#### Scenario: Rendering an empty cart

GIVEN the cart contains no items
WHEN the cart page renders
THEN it SHALL show an empty-state message and a link to `/cardapio`, and
SHALL NOT show the item list, total, or clear-cart action.

### Requirement: Cart Reservation Call to Action

The cart page SHALL offer a primary action linking to the reservations page,
and SHALL NOT present a checkout, order, or payment flow.

#### Scenario: Primary action on a non-empty cart

GIVEN the cart contains one or more items
WHEN the cart page renders
THEN it SHALL show a primary "Reservar uma mesa" action linking to
`/reservas`.

### Requirement: Cart Drawer Auto-Open on Add

WHEN an item is added to the cart from any page, the system SHALL open the
cart drawer automatically, showing the current cart contents without
navigating away from the current page.

#### Scenario: Adding an item from the menu

GIVEN the user is on the menu, dish detail, or any other page with an
add-to-cart control
WHEN the user adds an item to the cart
THEN the cart drawer SHALL open and SHALL show that item among the cart's
contents.

### Requirement: Cart Drawer Dismissal

The cart drawer SHALL close automatically after a short delay, and SHALL
also close when the user presses Escape, clicks outside the drawer, activates
its close control, or navigates to a different route.

#### Scenario: Auto-close after inactivity

GIVEN the cart drawer is open and the user does not interact with it
WHEN the auto-close delay elapses
THEN the cart drawer SHALL close.

#### Scenario: Dismissing with Escape

GIVEN the cart drawer is open
WHEN the user presses Escape
THEN the cart drawer SHALL close and focus SHALL return to the control that
opened it.

#### Scenario: Closing on navigation

GIVEN the cart drawer is open
WHEN the user navigates to a different route
THEN the cart drawer SHALL close.

### Requirement: Cart Item Count Indicator

The navigation SHALL show the total quantity of items in the cart next to
the cart link, updating whenever the cart contents change, and SHALL omit the
indicator when the cart is empty.

#### Scenario: Indicator reflects cart contents

GIVEN the cart contains items totaling N units
WHEN the navigation renders
THEN the cart link SHALL show N as its count indicator.

#### Scenario: Empty cart shows no indicator

GIVEN the cart contains no items
WHEN the navigation renders
THEN the cart link SHALL NOT show a count indicator.

### Requirement: Cart Drawer Reduced Motion

WHEN the user has `prefers-reduced-motion: reduce` enabled, the cart drawer
SHALL open with a fade only, without any slide or scale transform.

#### Scenario: Opening with reduced motion enabled

GIVEN the user's OS has reduced motion enabled
WHEN the cart drawer opens
THEN it SHALL fade in without a translate or scale animation.
