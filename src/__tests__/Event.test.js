import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';
import { getEvents } from '../api';

describe('<Event /> component', () => {
  let EventComponent;
  let allEvents;

  beforeEach(async () => {
    allEvents = await getEvents();
    EventComponent = render(<Event event={allEvents[0]} />);
  });

  // Basic event information tests
  test('renders event title (summary) correctly', () => {
    expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
  });

  test('renders event start time correctly', () => {
    const startTimeElement = EventComponent.container.querySelector('.event-start-time');
    expect(startTimeElement).toBeInTheDocument();
    expect(startTimeElement.textContent).toContain(allEvents[0].start.dateTime);
    expect(startTimeElement.textContent).toContain(allEvents[0].start.timeZone);
  });

  test('renders event location correctly', () => {
    expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
  });

  test('renders event created date correctly', () => {
    expect(EventComponent.container.textContent).toContain(allEvents[0].created);
  });

  // UI element presence tests
  test('renders event details button with "Show Details" as default', () => {
    const button = EventComponent.queryByText('Show Details');
    expect(button).toBeInTheDocument();
  });

  test('event details are hidden by default', () => {
    const details = EventComponent.container.querySelector('.details');
    expect(details).not.toBeInTheDocument();
  });

  // Expanded details tests
  test('shows details section when user clicks "Show Details" button', async () => {
    const user = userEvent.setup();
    const button = EventComponent.queryByText('Show Details');
    await user.click(button);

    const details = EventComponent.container.querySelector('.details');
    expect(details).toBeInTheDocument();
    
    // Verify all expanded details are present
    expect(details.querySelector('.description')).toBeInTheDocument();
    expect(details.querySelector('.description').textContent).toBe(allEvents[0].description);
    
    const endTimeElement = details.querySelector('.end-time');
    expect(endTimeElement).toBeInTheDocument();
    expect(endTimeElement.textContent).toContain(allEvents[0].end.dateTime);
    expect(endTimeElement.textContent).toContain(allEvents[0].end.timeZone);
    
    expect(button.textContent).toBe('Hide Details');
  });

  test('hides details section when user clicks "Hide Details" button', async () => {
    const user = userEvent.setup();
    const button = EventComponent.queryByText('Show Details');
    
    // First click to show details
    await user.click(button);
    expect(button.textContent).toBe('Hide Details');
    
    // Second click to hide details
    await user.click(button);
    const details = EventComponent.container.querySelector('.details');
    expect(details).not.toBeInTheDocument();
    expect(button.textContent).toBe('Show Details');
  });
}); 