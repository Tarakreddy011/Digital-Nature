import React from 'react';
import OnlineShopping from './OnlineShopping';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="main-title">E-Lux Boutique</h1>
        <p className="subtitle">Premium e-commerce listings built using React Class Components & Props</p>
      </header>

      <main className="app-main">
        <OnlineShopping />
      </main>

      <footer className="app-footer">
        <p>© 2026 E-Lux Shopping Portal. Built with Prop Drilling & Loop Rendering.</p>
      </footer>
    </div>
  );
}

export default App;
