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

  test('renders event title', () => {
    expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
  });

  test('renders event location', () => {
    expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
  });

  test('renders event details button with "Show Details" as default', () => {
    const button = EventComponent.queryByText('Show Details');
    expect(button).toBeInTheDocument();
  });

  test('event details are hidden by default', () => {
    const details = EventComponent.container.querySelector('.details');
    expect(details).not.toBeInTheDocument();
  });

  test('shows details section when user clicks "Show Details" button', async () => {
    const user = userEvent.setup();
    const button = EventComponent.queryByText('Show Details');
    await user.click(button);

    const details = EventComponent.container.querySelector('.details');
    expect(details).toBeInTheDocument();
    
    // Check for specific elements rather than exact text content
    expect(details.querySelector('.description')).toBeInTheDocument();
    expect(details.querySelector('.start-time')).toBeInTheDocument();
    expect(details.querySelector('.end-time')).toBeInTheDocument();
    
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