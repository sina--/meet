import { useState } from 'react';

const NumberOfEvents = ({ onNumberOfEventsChanged, setErrorAlert }) => {
  const [numberOfEvents, setNumberOfEvents] = useState(32);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    // Allow empty input for further typing
    if (value === '') {
      setNumberOfEvents('');
      setErrorAlert('');
      return;
    }

    let valueInt = parseInt(value);
    
    if (isNaN(valueInt) || valueInt <= 0) {
      setErrorAlert('Number of events must be a positive number');
      setNumberOfEvents(value);
      return;
    }

    setErrorAlert('');
    setNumberOfEvents(valueInt);
    onNumberOfEventsChanged(valueInt);
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