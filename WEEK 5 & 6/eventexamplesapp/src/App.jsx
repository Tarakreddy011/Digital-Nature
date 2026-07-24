import React from 'react';
import CounterEvents from './CounterEvents';
import CurrencyConvertor from './CurrencyConvertor';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="main-title">React Event Handling Hub</h1>
        <p className="subtitle">Synthetic Events, Multi-Method Handlers, and Event-Driven Currency Conversion</p>
      </header>

      <main className="app-main">
        <CounterEvents />
        <CurrencyConvertor />
      </main>

      <footer className="app-footer">
        <p>© 2026 EventExamples App. React Synthetic Events Demonstration.</p>
      </footer>
    </div>
  );
}

export default App;
