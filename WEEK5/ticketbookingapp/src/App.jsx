import React, { useState } from 'react';
import GuestGreeting from './GuestGreeting';
import UserGreeting from './UserGreeting';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginClick = () => {
    setIsLoggedIn(true);
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
  };

  // Defining Element Variable for Conditional Rendering
  let greetingElement;
  if (isLoggedIn) {
    greetingElement = <UserGreeting />;
  } else {
    greetingElement = <GuestGreeting />;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-bar">
          <h1 className="main-title">SkyFly Ticket Booking</h1>
          
          <div className="auth-controls">
            <span className="auth-status">
              Status: <strong>{isLoggedIn ? '🟢 Logged In' : '🔴 Guest Mode'}</strong>
            </span>
            {/* Login and Logout buttons to toggle authentication state */}
            {isLoggedIn ? (
              <button onClick={handleLogoutClick} className="auth-btn logout">
                🚪 Logout
              </button>
            ) : (
              <button onClick={handleLoginClick} className="auth-btn login">
                🔑 Login
              </button>
            )}
          </div>
        </div>

        <p className="subtitle">
          Demonstrating React Conditional Rendering & Element Variables (<code>UserGreeting</code> vs <code>GuestGreeting</code>)
        </p>
      </header>

      <main className="app-main">
        {/* Render the conditionally assigned Element Variable */}
        {greetingElement}
      </main>

      <footer className="app-footer">
        <p>© 2026 TicketBooking App. Conditional Rendering Demonstration.</p>
      </footer>
    </div>
  );
}

export default App;
