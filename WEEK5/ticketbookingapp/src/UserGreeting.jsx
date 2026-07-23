import React, { useState } from 'react';

// User page: Page allowing logged-in users to book tickets
function UserGreeting() {
  const [selectedFlight, setSelectedFlight] = useState('AI-204');
  const [passengerCount, setPassengerCount] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBooking = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    alert(`🎉 Ticket Booking Confirmed!\n\nFlight: ${selectedFlight}\nPassengers: ${passengerCount}\nPNR Reference: PNR-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  return (
    <div className="view-card user-view">
      <div className="view-header">
        <h2>🎉 Welcome Back, Authorized Traveler!</h2>
        <p>You are logged in. Complete your flight ticket booking below.</p>
      </div>

      <form onSubmit={handleBooking} className="booking-form">
        <div className="form-group">
          <label htmlFor="flightSelect">Select Flight Route</label>
          <select 
            id="flightSelect" 
            value={selectedFlight} 
            onChange={(e) => setSelectedFlight(e.target.value)}
          >
            <option value="AI-204">AI-204: Delhi (DEL) ➔ Mumbai (BOM) — ₹4,500</option>
            <option value="6E-512">6E-512: Bengaluru (BLR) ➔ Hyderabad (HYD) — ₹3,200</option>
            <option value="UK-819">UK-819: Chennai (MAA) ➔ Kolkata (CCU) — ₹5,100</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="passengers">Number of Passengers</label>
          <input 
            type="number" 
            id="passengers" 
            min="1" 
            max="6" 
            value={passengerCount} 
            onChange={(e) => setPassengerCount(e.target.value)}
          />
        </div>

        <button type="submit" className="book-btn">
          🎫 Confirm & Book Ticket
        </button>
      </form>

      {bookingSuccess && (
        <div className="success-banner">
          <p>✅ Active Booking Confirmed! PNR status sent to your registered mobile number.</p>
        </div>
      )}
    </div>
  );
}

export default UserGreeting;
