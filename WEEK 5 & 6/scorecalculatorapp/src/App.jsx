// Step 5: Edit App.js to invoke the CalculateScore functional component, passing the respective data properties.
import React from 'react';
import CalculateScore from './Components/CalculateScore';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="main-title">Student Score Calculator</h1>
        <p className="subtitle">Functional component demonstrating props-driven average score calculation</p>
      </header>

      <main className="app-main">
        <div className="scores-grid">
          <CalculateScore Name="Arjun Mehta" School="Delhi Public School" Total={420} goal={5} />
          <CalculateScore Name="Sneha Sharma" School="St. Xavier's Academy" Total={385} goal={5} />
          <CalculateScore Name="Rahul Verma" School="Kendriya Vidyalaya" Total={290} goal={5} />
          <CalculateScore Name="Priya Das" School="National School of Excellence" Total={150} goal={5} />
          <CalculateScore Name="Kiran Reddy" School="Hyderabad International" Total={470} goal={5} />
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2026 Score Calculator App. Function Component Demonstration.</p>
      </footer>
    </div>
  );
}

export default App;
