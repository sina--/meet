import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <CitySearch />
      <EventList events={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]} />
    </div>
  );
}

export default App;
