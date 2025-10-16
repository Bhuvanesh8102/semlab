import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Sample event data array
const events = [
  { date: '2025-10-16', title: 'Meeting', description: 'Project meeting at 2 PM' },
  { date: '2025-10-20', title: 'Workshop', description: 'React workshop' },
  // More events as needed
];

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

export default function EventCalendar() {
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));

  const handleDayClick = date => {
    setSelectedDate(formatDate(date));
  };

  const eventDetails = events.filter(event => event.date === selectedDate);

  return (
    <div style={{ maxWidth: "350px", margin: "2rem auto" }}>
      <Calendar
        onClickDay={handleDayClick}
        value={new Date(selectedDate)}
        tileClassName={({ date, view }) => {
          if (view === 'month' && events.some(ev => ev.date === formatDate(date))) {
            return 'event-marked';
          }
          if (selectedDate === formatDate(date)) {
            return 'selected';
          }
          return null;
        }}
      />
      <div>
        <h3>Events on {selectedDate}:</h3>
        {eventDetails.length > 0 ? (
          eventDetails.map((event, idx) => (
            <div key={idx}>
              <b>{event.title}</b>: {event.description}
            </div>
          ))
        ) : (
          <p>No events for this date.</p>
        )}
      </div>
      <style>{`
        .selected {
          background: #007bff !important;
          color: #fff !important;
        }
        .event-marked {
          border: 2px solid #ff4081;
        }
      `}</style>
    </div>
  );
}
