import React, { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  // Input event handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Form submit handler with validation rules
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Rule 1: Name must have at least 5 characters
    if (!formData.name || formData.name.trim().length < 5) {
      newErrors.name = 'Name must be at least 5 characters long.';
    }

    // Rule 2: Email must contain '@' and '.'
    if (!formData.email || !formData.email.includes('@') || !formData.email.includes('.')) {
      newErrors.email = 'Email must contain both "@" and "." characters.';
    }

    // Rule 3: Password must be at least 8 characters long
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }

    setErrors(newErrors);

    // Trigger alert messages
    if (Object.keys(newErrors).length > 0) {
      const errorMessage = Object.values(newErrors).join('\n• ');
      alert(`⚠️ Registration Failed:\n• ${errorMessage}`);
    } else {
      alert(`✅ Registration Successful!\n\nWelcome, ${formData.name}!\nAccount created for ${formData.email}.`);
      setFormData({ name: '', email: '', password: '' });
      setErrors({});
    }
  };

  return (
    <div className="register-card">
      <h2 className="form-title">📝 User Registration</h2>
      <p className="form-subtitle">Fill in your details below to create an account</p>

      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter full name (min 5 chars)"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <span className="error-msg">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@mail.com"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="error-msg">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Minimum 8 characters"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && <span className="error-msg">{errors.password}</span>}
        </div>

        <button type="submit" className="submit-btn">
          🚀 Register Now
        </button>
      </form>
    </div>
  );
}

export default Register;
