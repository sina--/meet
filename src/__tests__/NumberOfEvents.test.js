import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents onNumberOfEventsChanged={() => {}} />);
  });

  test('renders number of events input', () => {
    const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
    expect(numberInput).toBeInTheDocument();
  });

  test('default number of events is 32', () => {
    const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
    expect(numberInput).toHaveValue(32);
  });

  test('updates number of events when user types', () => {
    const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
    fireEvent.change(numberInput, { target: { value: "10" } });
    expect(numberInput).toHaveValue(10);
  });

  test('calls onNumberOfEventsChanged callback when number changes', () => {
    const onNumberOfEventsChanged = jest.fn();
    NumberOfEventsComponent.rerender(<NumberOfEvents onNumberOfEventsChanged={onNumberOfEventsChanged} />);
    
    const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
    fireEvent.change(numberInput, { target: { value: "10" } });
    
    expect(onNumberOfEventsChanged).toHaveBeenCalledWith(10);
  });
}); 