// src/__tests__/EventList.test.js

import React from 'react';
import { render, within, waitFor } from '@testing-library/react';
import EventList from '../components/EventList';
import App from '../App';
import { getEvents } from '../api';

describe('<EventList /> component', () => {
 let EventListComponent;
 beforeEach(() => {
   EventListComponent = render(<EventList />);
 })

 test('has an element with "list" role', () => {
   expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
 });

 test('renders correct number of events', async () => {
   const allEvents = await getEvents();
   const events = allEvents.slice(0, 4);
   EventListComponent.rerender(<EventList events={events} />);
   expect(EventListComponent.getAllByRole("listitem")).toHaveLength(4);
 });
});

describe('<EventList /> integration', () => {
  test('renders a list of 32 events when the app is mounted and rendered', async () => {
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;
    const EventListDOM = AppDOM.querySelector('#event-list');
    
    await waitFor(() => {
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      expect(EventListItems.length).toBe(32);
    });
  });
});
