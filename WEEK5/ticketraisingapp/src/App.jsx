import React from 'react';
import ComplaintRegister from './ComplaintRegister';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="main-title">Ticket Raising Application</h1>
        <p className="subtitle">Controlled Components & Form Submission Event Handling</p>
      </header>

      <main className="app-main">
        <ComplaintRegister />
      </main>

      <footer className="app-footer">
        <p>© 2026 TicketRaising App. Controlled Components Demonstration.</p>
      </footer>
    </div>
  );
}

export default App;
