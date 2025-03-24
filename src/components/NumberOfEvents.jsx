import { useState } from 'react';

const NumberOfEvents = ({ onNumberOfEventsChanged, setErrorAlert }) => {
  const [numberOfEvents, setNumberOfEvents] = useState("32");

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumberOfEvents(value);
    
    // Clear error for empty input
    if (value === "") {
      setErrorAlert("");
      return;
    }

    // Only process numeric inputs
    if (/^[0-9]*$/.test(value)) {
      if (parseInt(value) <= 0) {
        setErrorAlert('Number of events must be a positive number');
      } else {
        setErrorAlert("");
        onNumberOfEventsChanged(parseInt(value));
      }
    } else {
      // For non-numeric input
      setErrorAlert('Number of events must be a positive number');
    }
  };

  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-input">Number of Events: </label>
      <input
        type="text" 
        id="number-of-events-input"
        value={numberOfEvents}
        onChange={handleInputChanged}
        role="spinbutton"
      />
    </div>
  );
};

export default NumberOfEvents; 