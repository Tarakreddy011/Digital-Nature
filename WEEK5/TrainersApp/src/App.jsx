// Step 8: Modify the App component to add routing using BrowserRouter, Routes, Route, and Link from the react-router-dom library.
// Set the / URL to redirect to the Home component and /trainers to the TrainersList component.
// Step 11: Define the corresponding route to TrainerDetail in the App component.
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import TrainersList from './Trainerlist';
import TrainerDetail from './TrainerDetails';
import { mockTrainers } from './TrainersMock';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="app-header">
          <div className="navbar-logo">
            <Link to="/" className="logo-link">🎓 AcademiaTrainers</Link>
          </div>
          <nav className="app-nav">
            {/* Routing Links */}
            <Link to="/" className="nav-tab-link">Home</Link>
            <Link to="/trainers" className="nav-tab-link">Trainers Directory</Link>
          </nav>
        </header>

        <main className="app-main">
          {/* Routing Configuration */}
          <Routes>
            {/* / URL points to Home component */}
            <Route path="/" element={<Home />} />
            
            {/* /trainers URL points to TrainersList component, passing mock trainers data */}
            <Route path="/trainers" element={<TrainersList trainers={mockTrainers} />} />
            
            {/* /trainers/:id URL points to TrainerDetail component */}
            <Route path="/trainers/:id" element={<TrainerDetail />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>© 2026 AcademiaTrainers Inc. All rights reserved. React Router v6 Implementation.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
