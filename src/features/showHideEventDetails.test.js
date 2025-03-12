import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';

const feature = loadFeature('./src/features/showHideEventDetails.feature');

defineFeature(feature, test => {
  test('Event details are hidden by default.', ({ given, when, then }) => {
    let AppComponent;
    
    given('the user has not interacted with an event', () => {
    });

    when('the event is displayed on the list', async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBeGreaterThan(0);
      });
    });

    then('only the event title and summary should be shown.', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      
      const eventDetails = EventListItems[0].querySelector('.details');
      expect(eventDetails).toBeNull();
    });
  });

  test('User can expand event details to see more information.', ({ given, when, then }) => {
    let AppComponent;
    let EventListItems;
    let user;
    
    given('an event is displayed with only the title and summary', async () => {
      user = userEvent.setup();
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBeGreaterThan(0);
      });
      
      const eventDetails = EventListItems[0].querySelector('.details');
      expect(eventDetails).toBeNull();
    });

    when('the user clicks on the "Show Details" button or link for that event', async () => {
      const showDetailsButton = EventListItems[0].querySelector('.details-btn');
      await user.click(showDetailsButton);
    });

    then('the event details should expand to show additional information (e.g., location, time, and description).', () => {
      const eventDetails = EventListItems[0].querySelector('.details');
      expect(eventDetails).toBeDefined();
      expect(eventDetails).not.toBeNull();
    });
  });

  test('User can collapse the event details after viewing them.', ({ given, when, then }) => {
    let AppComponent;
    let EventListItems;
    let user;
    let showDetailsButton;
    
    given('an event\'s details are currently expanded', async () => {
      user = userEvent.setup();
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBeGreaterThan(0);
      });
      
      showDetailsButton = EventListItems[0].querySelector('.details-btn');
      await user.click(showDetailsButton);
      
      const eventDetails = EventListItems[0].querySelector('.details');
      expect(eventDetails).toBeDefined();
      expect(eventDetails).not.toBeNull();
    });

    when('the user clicks on the "Hide Details" button or link for that event', async () => {
      await user.click(showDetailsButton);
    });

    then('the event details should collapse back to the default view.', () => {
      const eventDetails = EventListItems[0].querySelector('.details');
      expect(eventDetails).toBeNull();
    });
  });
}); 