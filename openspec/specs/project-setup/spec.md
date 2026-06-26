# Spec: project-setup

## Purpose

Define as regras estruturais e de qualidade que toda a codebase deve seguir,
estabelecidas durante o setup inicial do projeto.

---

## Requirements

### Requirement: Service Layer Abstraction

The system SHALL access all menu/cart/reservation data exclusively through functions
in `services/`, never via direct `fetch` calls inside components or pages.

#### Scenario: Component needs menu data

GIVEN a page component needs to display the menu
WHEN it requests the data
THEN it SHALL do so through a hook that calls a function in `services/`, and SHALL
NOT call `fetch` directly.

---

### Requirement: Mock/Real API Parity

The system SHALL intercept HTTP calls to `/api/*` via MSW in development and test
environments, using the same request/response shape expected from the future
.NET API.

#### Scenario: Switching to the real backend

GIVEN the .NET API becomes available
WHEN the base URL is updated
THEN no component or service function signature SHALL require changes — only the
MSW interception SHALL be removed/disabled.

---

### Requirement: Critical Component Test Coverage

The system SHALL include automated tests for any component that handles monetary
values/quantities, submits data, or controls conditional navigation.

#### Scenario: Cart quantity changes

GIVEN a user changes the quantity of an item in the cart
WHEN the total is recalculated
THEN a test SHALL verify the new total matches the expected value.

---

### Requirement: Commit Message Convention

The system SHALL reject commits whose message does not follow the Conventional
Commits format, enforced via a `commit-msg` git hook.

#### Scenario: Non-conventional commit message

GIVEN a developer commits with the message "fixed stuff"
WHEN the `commit-msg` hook runs
THEN the commit SHALL be rejected.

---

### Requirement: CI Quality Gate

The system SHALL run lint and test commands automatically on every pull request via
GitHub Actions, blocking merge on failure.
