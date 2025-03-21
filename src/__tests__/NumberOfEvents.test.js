import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(
      <NumberOfEvents 
        onNumberOfEventsChanged={() => {}} 
        setErrorAlert={() => {}}
      />
    );
  });

  test('renders number of events input', () => {
    const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
    expect(numberInput).toBeInTheDocument();
  });

  test('default number of events is 32', () => {
    const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
    expect(numberInput).toHaveValue(32);
  });

  test('updates number of events when user types', async () => {
    const user = userEvent.setup();
    const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
    await user.type(numberInput, "{backspace}{backspace}10");
    expect(numberInput).toHaveValue(10);
  });

  test('calls onNumberOfEventsChanged callback when number changes', async () => {
    const user = userEvent.setup();
    const onNumberOfEventsChanged = jest.fn();
    const setErrorAlert = jest.fn();
    NumberOfEventsComponent.rerender(
      <NumberOfEvents 
        onNumberOfEventsChanged={onNumberOfEventsChanged}
        setErrorAlert={setErrorAlert}
      />
    );
    
    const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
    await user.type(numberInput, "{backspace}{backspace}10");
    
    expect(onNumberOfEventsChanged).toHaveBeenCalledWith(10);
    expect(setErrorAlert).toHaveBeenCalledWith('');
  });

  test('shows error for negative numbers', async () => {
    const user = userEvent.setup();
    const setErrorAlert = jest.fn();
    NumberOfEventsComponent.rerender(
      <NumberOfEvents 
        onNumberOfEventsChanged={() => {}}
        setErrorAlert={setErrorAlert}
      />
    );
    
    const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
    await user.type(numberInput, "{backspace}{backspace}-1");
    
    expect(setErrorAlert).toHaveBeenCalledWith('Number of events must be a positive number');
  });

  test('shows error for zero', async () => {
    const user = userEvent.setup();
    const setErrorAlert = jest.fn();
    NumberOfEventsComponent.rerender(
      <NumberOfEvents 
        onNumberOfEventsChanged={() => {}}
        setErrorAlert={setErrorAlert}
      />
    );
    
    const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
    await user.type(numberInput, "{backspace}{backspace}0");
    
    expect(setErrorAlert).toHaveBeenCalledWith('Number of events must be a positive number');
  });

  test('clears error when input is valid', async () => {
    const user = userEvent.setup();
    const setErrorAlert = jest.fn();
    NumberOfEventsComponent.rerender(
      <NumberOfEvents 
        onNumberOfEventsChanged={() => {}}
        setErrorAlert={setErrorAlert}
      />
    );
    
    const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
    await user.type(numberInput, "{backspace}{backspace}5");
    
    expect(setErrorAlert).toHaveBeenCalledWith('');
  });
}); 