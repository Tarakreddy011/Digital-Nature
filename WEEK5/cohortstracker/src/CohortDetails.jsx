// Step 7: Open the cohort details component and import the CSS Module.
import React from 'react';
import styles from './CohortDetails.module.css';

function CohortDetails({ cohort }) {
  const { title, status, code, startDate, size } = cohort;

  // Step 9: Define an inline style for the <h3> element to use a green font if the cohort status is "ongoing", and a blue font for all other scenarios.
  const headerInlineStyle = {
    color: status.toLowerCase() === 'ongoing' ? 'green' : 'blue'
  };

  return (
    // Step 8: Apply the box class to the container div.
    <div className={styles.box}>
      <h3 style={headerInlineStyle}>{title}</h3>
      
      <dl>
        <dt>Cohort Code</dt>
        <dd>{code}</dd>

        <dt>Start Date</dt>
        <dd>{startDate}</dd>

        <dt>Cohort Size</dt>
        <dd>{size} Learners</dd>

        <dt>Status</dt>
        <dd style={{ textTransform: 'capitalize' }}>{status}</dd>
      </dl>
    </div>
  );
}

export default CohortDetails;
