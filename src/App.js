import { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [allLocations, setAllLocations] = useState([]);
  const [currentNumberOfEvents, setCurrentNumberOfEvents] = useState(32);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNumberOfEvents));
    setAllLocations(extractLocations(allEvents));
  };

  const handleCitySelected = (city) => {
    setCurrentCity(city);
    getEvents().then((events) => {
      const filteredEvents = city === "See all cities" ?
        events :
        events.filter(event => event.location === city);
      setEvents(filteredEvents.slice(0, currentNumberOfEvents));
    });
  };

  const handleNumberOfEventsChanged = (number) => {
    setCurrentNumberOfEvents(number);
    getEvents().then((events) => {
      const filteredEvents = currentCity === "See all cities" ?
        events :
        events.filter(event => event.location === currentCity);
      setEvents(filteredEvents.slice(0, number));
    });
  };

  return (
    <div className="App">
      <CitySearch allLocations={allLocations} onCitySelected={handleCitySelected} />
      <NumberOfEvents onNumberOfEventsChanged={handleNumberOfEventsChanged} />
      <EventList events={events} />
    </div>
  );
}

export default App;
