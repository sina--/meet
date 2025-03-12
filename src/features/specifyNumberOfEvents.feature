Feature: Specify Number of Events

Scenario: Default number of events is displayed when no number is specified.
  Given the user hasn't specified the number of events to display
  When the app loads
  Then a default number of events (e.g., 10) should be displayed.

Scenario: User can change the number of events displayed.
  Given the user wants to display more or fewer events
  When the user adjusts the number of events using a dropdown or slider
  Then the app should update to display the specified number of events. 