import React from 'react';

// Guest page: View for guest users to browse flight details
function GuestGreeting() {
  const flights = [
    { flightNo: 'AI-204', origin: 'Delhi (DEL)', destination: 'Mumbai (BOM)', price: '₹4,500', departure: '08:30 AM' },
    { flightNo: '6E-512', origin: 'Bengaluru (BLR)', destination: 'Hyderabad (HYD)', price: '₹3,200', departure: '11:15 AM' },
    { flightNo: 'UK-819', origin: 'Chennai (MAA)', destination: 'Kolkata (CCU)', price: '₹5,100', departure: '02:45 PM' }
  ];

  return (
    <div className="view-card guest-view">
      <div className="view-header">
        <h2>👋 Welcome, Guest Explorer!</h2>
        <p>Browse available flight schedules below. Please log in to book your tickets.</p>
      </div>

      <div className="flight-list">
        <h3>✈️ Flight Schedules & Fares</h3>
        <div className="flight-grid">
          {flights.map((f, i) => (
            <div key={i} className="flight-card">
              <div className="flight-no">{f.flightNo}</div>
              <div className="flight-route">{f.origin} ➔ {f.destination}</div>
              <div className="flight-time">🕒 {f.departure}</div>
              <div className="flight-price">{f.price}</div>
              <span className="login-prompt-badge">Log in to Book</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GuestGreeting;
