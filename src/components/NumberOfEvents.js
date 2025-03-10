import { useState } from 'react';

const NumberOfEvents = ({ onNumberOfEventsChanged }) => {
  const [numberOfEvents, setNumberOfEvents] = useState(32);

  const handleInputChanged = (event) => {
    const value = parseInt(event.target.value) || 32;
    setNumberOfEvents(value);
    onNumberOfEventsChanged(value);
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