import React, { useState } from 'react';

// Step 2: Create a ComplaintRegister component containing a form with a textbox for employee name and a textarea for complaint.
function ComplaintRegister() {
  const [formData, setFormData] = useState({
    employeeName: '',
    complaint: ''
  });

  const [referenceId, setReferenceId] = useState(null);

  // Manage input states using a handleChange event method
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Event Handling: Use the handleSubmit event to process submission and generate an alert box displaying a transaction/reference ID
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.employeeName.trim() || !formData.complaint.trim()) {
      alert('⚠️ Please enter both your Employee Name and Complaint details.');
      return;
    }

    // Generate a unique transaction / reference ID for follow-up
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const refId = `REF-${randomNum}`;

    setReferenceId(refId);

    // Alert box displaying transaction/reference ID
    alert(`✅ Complaint Logged Successfully!\n\nThank you, ${formData.employeeName}.\nYour Reference ID for follow-up is: ${refId}\n\nDetails Submitted:\n"${formData.complaint}"`);

    // Reset controlled inputs
    setFormData({
      employeeName: '',
      complaint: ''
    });
  };

  return (
    <div className="complaint-card">
      <h2 className="form-title">🎫 Employee Complaint Portal</h2>
      <p className="form-subtitle">Log a workplace or technical issue to receive an immediate tracking Reference ID.</p>

      {referenceId && (
        <div className="ref-banner">
          <p>📌 Last Generated Reference ID: <strong>{referenceId}</strong></p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="complaint-form">
        <div className="form-group">
          <label htmlFor="employeeName">Employee Name</label>
          <input
            type="text"
            id="employeeName"
            name="employeeName"
            placeholder="e.g. Rajesh Kumar"
            value={formData.employeeName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="complaint">Complaint Details</label>
          <textarea
            id="complaint"
            name="complaint"
            rows="5"
            placeholder="Describe the complaint or issue in detail..."
            value={formData.complaint}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          📋 Submit Complaint
        </button>
      </form>
    </div>
  );
}

export default ComplaintRegister;
