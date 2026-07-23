// Step 3: Add code in Home.js to create a Home component that displays "Welcome to the Home page of Student Management Portal".
import React from 'react';

function Home() {
  return (
    <div className="component-card home-card">
      <div className="card-icon">🏠</div>
      <h2 className="card-heading">Home</h2>
      <p className="card-text">Welcome to the Home page of Student Management Portal</p>
    </div>
  );
}

export default Home;
