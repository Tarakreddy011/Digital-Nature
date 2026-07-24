// Step 4: Create a Contact.js file containing a Contact component displaying its respective welcome message.
import React from 'react';

function Contact() {
  return (
    <div className="component-card contact-card">
      <div className="card-icon">📧</div>
      <h2 className="card-heading">Contact</h2>
      <p className="card-text">Welcome to the Contact page of Student Management Portal</p>
    </div>
  );
}

export default Contact;
