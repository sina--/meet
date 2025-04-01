import { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch.jsx';
import EventList from './components/EventList.jsx';
import NumberOfEvents from './components/NumberOfEvents.jsx';
import CityEventsChart from './components/CityEventsChart.jsx';
import { getEvents, extractLocations } from './api.jsx';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert.jsx';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [allLocations, setAllLocations] = useState([]);
  const [currentNumberOfEvents, setCurrentNumberOfEvents] = useState(32);
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert("");
    } else {
      setWarningAlert("You are offline. The displayed events may not be up to date.");
    }
    fetchData();
  }, [currentCity, currentNumberOfEvents]);

  const fetchData = async () => {
    try {
      const allEvents = await getEvents();
      const filteredEvents = currentCity === "See all cities" ?
        allEvents :
        allEvents.filter(event => event.location === currentCity);
      setEvents(filteredEvents.slice(0, currentNumberOfEvents));
      
      // Only set allLocations if it's empty
      if (allLocations.length === 0) {
        setAllLocations(extractLocations(allEvents));
      }
    } catch (error) {
      console.error('Error fetching events:', error);
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
        {warningAlert.length ? <WarningAlert text={warningAlert}/> : null}
      </div>
      <h1>Meet App</h1>
      <CitySearch 
        allLocations={allLocations} 
        onCitySelected={handleCitySelected}
        setInfoAlert={setInfoAlert}
      />
      <NumberOfEvents 
        onNumberOfEventsChanged={handleNumberOfEventsChanged}
        setErrorAlert={setErrorAlert}
      />
      <div className="charts-container">
        <CityEventsChart allLocations={allLocations} events={events} />
      </div>
      <EventList events={events} />
    </div>
  );
}

export default App;
