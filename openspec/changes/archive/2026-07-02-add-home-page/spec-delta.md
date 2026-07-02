# Spec Delta: home-page

## ADDED Requirements

### Requirement: Retractable Sidebar Navigation

The system SHALL render a sidebar navigation, collapsed by default (icons
only), that expands to show labels on mouse hover and collapses again on
mouse leave. The sidebar SHALL be present on every route.

#### Scenario: Hovering the sidebar

GIVEN the sidebar is collapsed
WHEN the user hovers over it
THEN it SHALL expand to show text labels alongside the icons.

#### Scenario: Active route highlighting

GIVEN the user is on a given route
WHEN the sidebar renders
THEN the menu item corresponding to that route SHALL be visually
distinguished from the others.

### Requirement: Live Search on Home

The Home page SHALL provide a search input that, when non-empty, replaces the
default sections (featured dish, popular categories, popular dishes) with a
list of matching results queried from the mocked menu data.

#### Scenario: Typing a search term

GIVEN the user types a non-empty value into the search input
WHEN the input changes
THEN the default Home sections SHALL be hidden and a results section SHALL be
shown.

#### Scenario: Clearing the search

GIVEN the search input has text
WHEN the user clears it
THEN the default Home sections SHALL be shown again.

#### Scenario: No matching results

GIVEN the user searches for a term with no matches
WHEN the results are computed
THEN an empty-state message SHALL be shown instead of an empty list.

### Requirement: Featured Dish Navigation

The Home page SHALL display one featured dish using the circular spotlight
treatment, with a call-to-action that navigates to the full menu.

#### Scenario: Clicking "Ver cardápio completo"

GIVEN the featured dish section is visible
WHEN the user clicks its call-to-action
THEN the application SHALL navigate to `/cardapio`.

### Requirement: Category Navigation

The Home page SHALL display the most-searched categories as clickable items,
each navigating to the menu filtered by that category.

#### Scenario: Clicking a category

GIVEN the popular categories section is visible
WHEN the user clicks a category
THEN the application SHALL navigate to `/cardapio?categoria={slug}` with the
corresponding category slug.

### Requirement: Popular Dishes Navigation

The Home page SHALL display the top popular dishes as simple cards (no
photo), each navigating to that dish's detail view.

#### Scenario: Clicking a popular dish card

GIVEN the popular dishes section is visible
WHEN the user clicks a card
THEN the application SHALL navigate to `/cardapio/{id}` for that dish.

### Requirement: No Reservation CTA on Home

The Home page SHALL NOT include any call-to-action for making a reservation
outside of the sidebar navigation item.

#### Scenario: Scanning the Home page content

GIVEN the Home page is rendered
WHEN its content is inspected
THEN no reservation-related call-to-action SHALL be present outside the
sidebar.
