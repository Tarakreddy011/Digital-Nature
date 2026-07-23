// Step 6: Create a TrainersList component in a Trainerlist.jsx file that accepts trainer data as a parameter and renders it as a list of clickable hyperlinks.
// Step 11: Modify the TrainersList component to add Links to the TrainerDetail component, passing the ID.
import React from 'react';
import { Link } from 'react-router-dom';

function TrainersList({ trainers }) {
  return (
    <div className="trainers-list-container">
      <h2 className="section-title">🎓 Certified Academic Trainers</h2>
      <p className="section-subtitle">Click on any trainer to view their full credentials and expert skillset.</p>
      
      <div className="trainers-list">
        {trainers.map((trainer) => (
          <Link 
            key={trainer.TrainerId} 
            to={`/trainers/${trainer.TrainerId}`} 
            className="trainer-link-card"
          >
            <div className="trainer-link-content">
              <div className="avatar-circle">👨‍🏫</div>
              <div className="brief-info">
                <h3 className="trainer-link-name">{trainer.Name}</h3>
                <span className="trainer-link-tech">{trainer.Technology}</span>
              </div>
            </div>
            <div className="card-arrow">→</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TrainersList;
