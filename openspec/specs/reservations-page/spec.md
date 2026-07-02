# Spec: reservations-page

## Purpose

Define the structure and behavior of the reservations page (`/reservas`) —
a single-screen form that collects a table reservation request (date, time,
party size, and contact details) and resolves inline into a confirmation
or an error, without a modal or a separate confirmation route.

---

## Requirements

### Requirement: Reservation Form

The reservations page (`/reservas`) SHALL present a single-screen form to
request a table reservation, collecting date, time, party size, name,
phone, and optionally email and notes.

#### Scenario: Rendering the form

GIVEN the reservations page loads
THEN it SHALL show a hero spotlight, and fields for date, time, party size,
name, phone, email, and notes, plus a primary submit action.

### Requirement: Fixed Time Slot Selection

The reservations page SHALL offer a fixed set of time slots (19:00–22:00,
30-minute increments) as selectable chips, rather than a free-form time
input.

#### Scenario: Choosing a time slot

GIVEN the time slot chips are shown
WHEN the user selects one
THEN that chip SHALL be marked as the current selection and no other chip
SHALL be marked as current.

### Requirement: Required Field Validation

The reservations page SHALL require date, time, name, and phone before
submission SHALL succeed, and SHALL block submission with a single visible
message when any of them are missing.

#### Scenario: Submitting with missing required fields

GIVEN one or more of date, time, name, or phone are empty
WHEN the user activates the submit action
THEN the reservation SHALL NOT be created, and a single alert message
SHALL identify the missing fields.

#### Scenario: Submitting with all required fields filled

GIVEN date, time, name, and phone are all filled
WHEN the user activates the submit action
THEN the reservation request SHALL be sent and no validation message SHALL
be shown.

### Requirement: Reservation Confirmation

When a reservation request succeeds, the reservations page SHALL replace
the form with an inline confirmation summarizing the reservation and
offering an action to start a new reservation.

#### Scenario: Successful submission

GIVEN a valid reservation request is submitted
WHEN the request succeeds
THEN the page SHALL show a confirmation summary (date, time, party size,
name) and SHALL hide the form.

#### Scenario: Starting a new reservation

GIVEN a confirmation is shown
WHEN the user activates "Nova reserva"
THEN the page SHALL show an empty form again.

### Requirement: Reservation Submission Failure

When a reservation request fails, the reservations page SHALL show a
single visible error message and SHALL keep the form available for retry,
without ever showing more than one alert-colored message at a time.

#### Scenario: Network or server failure

GIVEN a reservation request is submitted and the request fails
WHEN the failure is received
THEN the page SHALL show a single error message and SHALL keep the
submitted values in the form so the user can retry.
