import React from 'react';
import CountPeople from './CountPeople';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="main-title">Office Occupancy Tracker</h1>
        <p className="subtitle">Real-time dashboard for managing facility entries and exits using React State</p>
      </header>

      <main className="app-main">
        <CountPeople />
      </main>

      <footer className="app-footer">
        <p>© 2026 Facility Counter App. Built with React Class Component State.</p>
      </footer>
    </div>
  );
}

export default App;
