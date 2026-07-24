import React from 'react';
import CohortDetails from './CohortDetails';
import './App.css';

function App() {
  // Sample cohorts list demonstrating ongoing (green) and other statuses (blue)
  const cohorts = [
    {
      title: "Full Stack Web Cohort",
      status: "ongoing",
      code: "FS-COH-08",
      startDate: "May 10, 2026",
      size: 32
    },
    {
      title: "Cloud Devops Cohort",
      status: "completed",
      code: "CD-COH-04",
      startDate: "January 15, 2026",
      size: 28
    },
    {
      title: "AI Engineering Cohort",
      status: "upcoming",
      code: "AI-COH-02",
      startDate: "August 20, 2026",
      size: 40
    }
  ];

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="main-title">Cohorts Tracker Dashboard</h1>
        <p className="subtitle">Visualizing cohort tracks using modularized CSS and conditional inline styling</p>
      </header>

      <main className="app-main">
        <div className="cohorts-flex">
          {cohorts.map((cohort, index) => (
            <CohortDetails key={index} cohort={cohort} />
          ))}
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2026 Academia Tracker. CSS Modules Demonstration.</p>
      </footer>
    </div>
  );
}

export default App;
