import Event from "./Event.js";

const EventList = ({ events }) => {
  return (
    <ul id="event-list">
      {events ? events.map((event) => <Event event={event} />) : null}
    </ul>
  );
};

export default EventList;
