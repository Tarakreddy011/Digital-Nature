import React from 'react';
import Getuser from './Getuser';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="main-title">Random User Explorer</h1>
        <p className="subtitle">Consuming REST APIs in React Class Components via <code>componentDidMount()</code></p>
      </header>

      <main className="app-main">
        <Getuser />
      </main>

      <footer className="app-footer">
        <p>© 2026 FetchUser App. REST API Integration Demonstration.</p>
      </footer>
    </div>
  );
}

export default App;
