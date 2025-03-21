import { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents, extractLocations } from './api';
import { InfoAlert, ErrorAlert } from './components/Alert';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [allLocations, setAllLocations] = useState([]);
  const [currentNumberOfEvents, setCurrentNumberOfEvents] = useState(32);
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");

  useEffect(() => {
    fetchData();
  }, [currentCity, currentNumberOfEvents]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNumberOfEvents));
    
    // Only set allLocations if it's empty
    if (allLocations.length === 0) {
      setAllLocations(extractLocations(allEvents));
    }
  };

  const handleCitySelected = (city) => {
    setCurrentCity(city);
  };

  const handleNumberOfEventsChanged = (number) => {
    setCurrentNumberOfEvents(number);
  };

  return (
    <div className="App">
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert}/> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert}/> : null}
      </div>
      <CitySearch 
        allLocations={allLocations} 
        onCitySelected={handleCitySelected}
        setInfoAlert={setInfoAlert}
      />
      <NumberOfEvents 
        onNumberOfEventsChanged={handleNumberOfEventsChanged}
        setErrorAlert={setErrorAlert}
      />
      <EventList events={events} />
    </div>
  );
}

export default App;
