// Step 9: Create a TrainerDetail component in a TrainerDetails.jsx file.
// Step 10: Have the component retrieve an id parameter from the URL using the useParams hook, query the mock data with this id, and display the specific trainer's details.
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockTrainers } from './TrainersMock';

function TrainerDetail() {
  // Retrieve the id parameter from the URL using useParams
  const { id } = useParams();
  
  // Query the mock data with this id (useParams returns a string, parse to integer for lookup)
  const trainer = mockTrainers.find((t) => t.TrainerId === parseInt(id));

  if (!trainer) {
    return (
      <div className="trainer-error-container">
        <h2>⚠️ Trainer Profile Not Found</h2>
        <p>No profile matches the requested ID: <strong>{id}</strong>.</p>
        <Link to="/trainers" className="btn-back">← Return to Trainers list</Link>
      </div>
    );
  }

  return (
    <div className="trainer-detail-card">
      <div className="detail-card-header">
        <div className="detail-avatar-circle">👨‍🏫</div>
        <div className="detail-header-brief">
          <h2 className="detail-name">{trainer.Name}</h2>
          <span className="detail-technology">{trainer.Technology}</span>
        </div>
      </div>

      <div className="detail-card-body">
        <div className="detail-info-row">
          <span className="info-label">Identification Code</span>
          <span className="info-value">ID-{trainer.TrainerId}</span>
        </div>

        <div className="detail-info-row">
          <span className="info-label">Email Address</span>
          <span className="info-value">
            <a href={`mailto:${trainer.Email}`} className="contact-link">{trainer.Email}</a>
          </span>
        </div>

        <div className="detail-info-row">
          <span className="info-label">Phone Number</span>
          <span className="info-value">{trainer.Phone}</span>
        </div>

        <div className="detail-skills-section">
          <h4 className="skills-heading">Core Skills & Frameworks</h4>
          <div className="skills-tags-container">
            {trainer.Skills.split(',').map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="detail-card-footer">
        <Link to="/trainers" className="btn-back">
          ← Back to Trainers Directory
        </Link>
      </div>
    </div>
  );
}

export default TrainerDetail;
