// Step 5: Edit App.js to import and invoke the Home, About, and Contact components inside a container div.
import React from 'react';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="main-title">Student Management Portal</h1>
        <p className="subtitle">Demonstrating multiple component creation and composition</p>
      </header>

      <main className="app-main">
        <div className="components-grid">
          <Home />
          <About />
          <Contact />
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2026 Student App. Multiple Components Demonstration.</p>
      </footer>
    </div>
  );
}

export default App;
