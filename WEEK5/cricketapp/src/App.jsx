import React, { useState } from 'react';
import ListofPlayers from './ListofPlayers';
import IndianPlayers from './IndianPlayers';
import './App.css';

function App() {
  // Flag variable to control which component to render
  const [showPlayersList, setShowPlayersList] = useState(true);

  // Step 8: Display these components on the same home page using a simple if/else statement with a flag variable.
  let renderedComponent;
  if (showPlayersList) {
    renderedComponent = <ListofPlayers />;
  } else {
    renderedComponent = <IndianPlayers />;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="main-title">Cricket App Dashboard</h1>
        <p className="subtitle">Demonstrating ES6 Map, Filter, Destructuring, Spread Merge & Conditional Rendering</p>

        {/* Tab Controls to Toggle the Flag Variable */}
        <div className="toggle-container">
          <button 
            className={`toggle-button ${showPlayersList ? 'active' : ''}`}
            onClick={() => setShowPlayersList(true)}
          >
            📋 Player Roster (Map & Filter)
          </button>
          <button 
            className={`toggle-button ${!showPlayersList ? 'active' : ''}`}
            onClick={() => setShowPlayersList(false)}
          >
            🇮🇳 Squad Destructuring & Spread Merge
          </button>
        </div>
      </header>

      <main className="app-main">
        {/* Render the selected component computed via if/else block */}
        {renderedComponent}
      </main>

      <footer className="app-footer">
        <p>© 2026 Cricket App ES6 Lab. Powered by React + ES6 Features.</p>
      </footer>
    </div>
  );
}

export default App;
