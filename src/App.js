import { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import { getEvents, extractLocations } from './api';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [allLocations, setAllLocations] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const allEvents = await getEvents();
    setEvents(allEvents);
    setAllLocations(extractLocations(allEvents));
  };

  const handleCitySelected = (city) => {
    setCurrentCity(city);
    // If "See all cities" is selected, show all events
    if (city === "See all cities") {
      getEvents().then((events) => setEvents(events));
    } else {
      getEvents().then((events) => {
        const filteredEvents = events.filter(event => event.location === city);
        setEvents(filteredEvents);
      });
    }
  };

  return (
    <div className="App">
      <CitySearch allLocations={allLocations} onCitySelected={handleCitySelected} />
      <EventList events={events} />
    </div>
  );
}

export default App;
