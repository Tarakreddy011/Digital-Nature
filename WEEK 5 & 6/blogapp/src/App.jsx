// Step 10: Add the Posts component into the App component.
import React from 'react';
import Posts from './Posts';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="main-title">React Blog Engine</h1>
        <p className="subtitle">Lifecycle-driven posts loaded via componentDidMount() and Fetch API</p>
      </header>

      <main className="app-main">
        <Posts />
      </main>

      <footer className="app-footer">
        <p>© 2026 BlogApp. Component Lifecycle Demonstration.</p>
      </footer>
    </div>
  );
}

export default App;
