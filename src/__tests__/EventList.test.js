// src/__tests__/EventList.test.js

import { render } from '@testing-library/react';
import EventList from '../components/EventList';
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
