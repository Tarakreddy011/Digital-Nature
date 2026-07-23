// Step 4: Create an About.js file containing an About component displaying its respective welcome message.
import React from 'react';

function About() {
  return (
    <div className="component-card about-card">
      <div className="card-icon">ℹ️</div>
      <h2 className="card-heading">About</h2>
      <p className="card-text">Welcome to the About page of Student Management Portal</p>
    </div>
  );
}

export default About;
