import React from 'react';
import Register from './register';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="main-title">Mail Register Portal</h1>
        <p className="subtitle">React Forms Handling & Input Control Validation</p>
      </header>

      <main className="app-main">
        <Register />
      </main>

      <footer className="app-footer">
        <p>© 2026 MailRegister App. Form Validation Demonstration.</p>
      </footer>
    </div>
  );
}

export default App;
