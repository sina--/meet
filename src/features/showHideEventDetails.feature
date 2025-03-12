Feature: Show/Hide Event Details

Scenario: Event details are hidden by default.
  Given the user has not interacted with an event
  When the event is displayed on the list
  Then only the event title and summary should be shown.

Scenario: User can expand event details to see more information.
  Given an event is displayed with only the title and summary
  When the user clicks on the "Show Details" button or link for that event
  Then the event details should expand to show additional information (e.g., location, time, and description).

Scenario: User can collapse the event details after viewing them.
  Given an event's details are currently expanded
  When the user clicks on the "Hide Details" button or link for that event
  Then the event details should collapse back to the default view. 