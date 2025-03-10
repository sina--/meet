import { useState } from 'react';

const NumberOfEvents = ({ onNumberOfEventsChanged }) => {
  const [numberOfEvents, setNumberOfEvents] = useState(32);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    // Allow empty input for further typing
    if (value === '') {
      setNumberOfEvents('');
      return;
    }
    const newValue = parseInt(value) || 32;
    setNumberOfEvents(newValue);
    if (onNumberOfEventsChanged) {
      onNumberOfEventsChanged(newValue);
    }
  };

  return (
    <div id="number-of-events">
      <input
        type="number"
        value={numberOfEvents}
        onChange={handleInputChanged}
        placeholder="Enter number of events"
        min="1"
        className="number-of-events-input"
      />
    </div>
  );
};

export default NumberOfEvents; 