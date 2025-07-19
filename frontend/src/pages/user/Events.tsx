import React from 'react';

function Events() {
  // TODO: Fetch all public events
  const allEvents = [
    { id: '1', name: 'Malaysia Tech Week' },
    { id: '2', name: 'Proof of Attendance Demo' },
  ];

  return (
    <div>
      <h2>All Events</h2>
      <ul>
        {allEvents.map((event) => (
          <li key={event.id}>{event.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Events;
