// Step 3: Inside CalculateScore.js, create a function component named CalculateScore
// that accepts Name, School, Total, and goal to calculate and display a student's average score.
import React from 'react';
import '../Stylesheets/mystyle.css';

function CalculateScore({ Name, School, Total, goal }) {
  // Calculate the average (assuming goal represents the number of subjects)
  const average = (Total / goal).toFixed(2);
  const percentage = ((Total / (goal * 100)) * 100).toFixed(1);
  const isPassed = percentage >= 40;

  return (
    <div className="score-card">
      <div className="student-avatar">🎓</div>
      <h3 className="student-name">{Name}</h3>
      <p className="student-school">{School}</p>

      <div className="score-details">
        <div className="score-row">
          <span className="score-label">Total Score</span>
          <span className="score-value">{Total}</span>
        </div>
        <div className="score-row">
          <span className="score-label">Subjects (Goal)</span>
          <span className="score-value">{goal}</span>
        </div>
        <div className="score-row">
          <span className="score-label">Average Score</span>
          <span className="score-value highlight">{average}</span>
        </div>
        <div className="score-row">
          <span className="score-label">Percentage</span>
          <span className={`score-value ${isPassed ? 'pass' : 'fail'}`}>{percentage}%</span>
        </div>
      </div>

      <div className={`status-badge ${isPassed ? 'badge-pass' : 'badge-fail'}`}>
        {isPassed ? '✅ Passed' : '❌ Failed'}
      </div>
    </div>
  );
}

export default CalculateScore;
