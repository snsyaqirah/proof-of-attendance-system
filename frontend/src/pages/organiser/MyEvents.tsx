import React from 'react';

function MyEvents() {
  const myEvents = [
    { id: '1', name: 'Blockchain Summit 2025' },
    { id: '2', name: 'IOTA Dev Workshop' },
  ];

  return (
    <div>
      <h2>My Events</h2>
      <ul>
        {myEvents.map((event) => (
          <li key={event.id}>{event.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default MyEvents;
