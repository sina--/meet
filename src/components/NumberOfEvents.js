import { useState } from 'react';

const NumberOfEvents = ({ onNumberOfEventsChanged, setErrorAlert }) => {
  const [numberOfEvents, setNumberOfEvents] = useState(32);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    
    if (value === '') {
      setNumberOfEvents('');
      setErrorAlert('');
      return;
    }

    const numberValue = Number(value);
    if (isNaN(numberValue) || numberValue <= 0) {
      setErrorAlert('Number of events must be a positive number');
      setNumberOfEvents(value);
    } else {
      setErrorAlert('');
      setNumberOfEvents(numberValue);
      onNumberOfEventsChanged(numberValue);
    }
  };

  return (
    <div id="number-of-events">
      <input
        type="text"
        value={numberOfEvents}
        onChange={handleInputChanged}
        placeholder="Enter number of events"
        className="number-of-events-input"
      />
    </div>
  );
};

export default NumberOfEvents; 