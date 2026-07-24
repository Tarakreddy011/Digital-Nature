// Step 7: Create a Home component in Home.jsx to display a welcome message.
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-hero">
      <h2 className="welcome-title">Welcome to the Trainers Academy</h2>
      <p className="welcome-text">
        Accelerate your career by learning from our certified industry experts. We offer targeted mentorship across cutting-edge fields including Web Dev, Cloud Architecture, AI/ML, Mobile Tech, and Cybersecurity.
      </p>
      <div className="cta-container">
        <Link to="/trainers" className="btn-cta">
          🔍 Browse Available Trainers
        </Link>
      </div>
    </div>
  );
}

export default Home;
