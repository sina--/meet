import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  let onNumberOfEventsChanged;
  let setErrorAlert;
  
  beforeEach(() => {
    onNumberOfEventsChanged = jest.fn();
    setErrorAlert = jest.fn();
    
    NumberOfEventsComponent = render(
      <NumberOfEvents 
        onNumberOfEventsChanged={onNumberOfEventsChanged} 
        setErrorAlert={setErrorAlert}
      />
    );
  });

  test('renders number of events input', () => {
    const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
    expect(numberInput).toBeInTheDocument();
  });

  test('default number of events is 32', () => {
    const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
    expect(numberInput.value).toBe("32");
  });

  test('updates number of events when user types', async () => {
    const user = userEvent.setup();
    const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
    
    await user.clear(numberInput);
    await user.type(numberInput, "10");
    
    expect(numberInput.value).toBe("10");
    expect(onNumberOfEventsChanged).toHaveBeenCalledWith(10);
  });

  test('allows empty input', async () => {
    const user = userEvent.setup();
    const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
    
    await user.clear(numberInput);
    
    expect(numberInput.value).toBe("");
    expect(setErrorAlert).toHaveBeenCalledWith("");
  });

  test('shows error for non-numeric input', async () => {
    const user = userEvent.setup();
    const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
    
    await user.clear(numberInput);
    await user.type(numberInput, "abc");
    
    expect(setErrorAlert).toHaveBeenCalledWith('Number of events must be a positive number');
  });

  test('shows error for negative numbers', async () => {
    const user = userEvent.setup();
    const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
    
    await user.clear(numberInput);
    await user.type(numberInput, "-1");
    
    expect(setErrorAlert).toHaveBeenCalledWith('Number of events must be a positive number');
  });

  test('shows error for zero', async () => {
    const user = userEvent.setup();
    const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
    
    await user.clear(numberInput);
    await user.type(numberInput, "0");
    
    expect(setErrorAlert).toHaveBeenCalledWith('Number of events must be a positive number');
  });

  test('clears error and calls onNumberOfEventsChanged when input is valid', async () => {
    const user = userEvent.setup();
    const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
    
    await user.clear(numberInput);
    await user.type(numberInput, "5");
    
    expect(setErrorAlert).toHaveBeenCalledWith('');
    expect(onNumberOfEventsChanged).toHaveBeenCalledWith(5);
  });
}); 