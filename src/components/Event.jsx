import React, { useState } from 'react';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li className="event">
      <h2>{event.summary}</h2>
      <p>{event.created}</p>
      <p>{event.location}</p>
      <p className="event-start-time">
        Start: {event.start.dateTime} ({event.start.timeZone})
      </p>
      <button 
        className="details-btn" 
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      
      {showDetails && (
        <div className="details">
          <h3>Event Details</h3>
          <p className="description">{event.description}</p>
          <p className="end-time">
            End: {event.end.dateTime} ({event.end.timeZone})
          </p>
        </div>
      )}
    </li>
  );
}

export default Event;
