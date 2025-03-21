import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('Default number of events is displayed when no number is specified.', ({ given, when, then }) => {
    let AppComponent;
    
    given('the user hasn\'t specified the number of events to display', () => {
      // Nothing to do here - this is the default state
    });

    when('the app loads', () => {
      AppComponent = render(<App />);
    });

    then(/^a default number of events \(e.g., (\d+)\) should be displayed.$/, async (arg0) => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBeGreaterThan(0);
      });
      
      // Check the default value in the number of events input
      const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
      const numberOfEventsInput = within(NumberOfEventsDOM).queryByRole('spinbutton');
      expect(numberOfEventsInput.value).toBe("32");
    });
  });

  test('User can change the number of events displayed.', ({ given, when, then }) => {
    let AppComponent;
    let AppDOM;
    let NumberOfEventsDOM;
    let user;
    
    given('the user wants to display more or fewer events', async () => {
      user = userEvent.setup();
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
      
      // Wait for the events to load
      const EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBeGreaterThan(0);
      });
      
      // Find the number of events component
      NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
      expect(NumberOfEventsDOM).toBeDefined();
    });

    when('the user adjusts the number of events using a dropdown or slider', async () => {
      // Find the input field - now it's a text input which has role 'spinbutton'
      const numberOfEventsInput = within(NumberOfEventsDOM).queryByRole('spinbutton');
      expect(numberOfEventsInput).toBeDefined();
      
      // Clear and type new value
      await user.clear(numberOfEventsInput);
      await user.type(numberOfEventsInput, "10");
    });

    then('the app should update to display the specified number of events.', async () => {
      const EventListDOM = AppDOM.querySelector('#event-list');
      
      // Wait for the effect to update the events list after the number changes
      await waitFor(() => {
        const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');
        expect(allRenderedEventItems.length).toBe(10);
      }, { timeout: 3000 });
    });
  });
}); 