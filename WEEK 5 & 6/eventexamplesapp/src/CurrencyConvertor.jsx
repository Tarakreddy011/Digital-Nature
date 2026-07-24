import React, { useState } from 'react';

// Currency Conversion Component
function CurrencyConvertor() {
  const [euros, setEuros] = useState('');
  const [rupees, setRupees] = useState(null);

  // Conversion rate: 1 Euro = 90.00 INR
  const conversionRate = 90.00;

  // Attach a click event handler to the "Submit" button to trigger a handleSubmit event
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const euroVal = parseFloat(euros);
    if (isNaN(euroVal) || euroVal <= 0) {
      alert('⚠️ Please enter a valid positive number for Euros.');
      return;
    }

    const calculatedRupees = (euroVal * conversionRate).toFixed(2);
    setRupees(calculatedRupees);

    // Calculates and alerts the user of the conversion from Euros to Indian Rupees
    alert(`💶 Currency Conversion Result:\n\n€${euroVal.toLocaleString()} EUR = ₹${Number(calculatedRupees).toLocaleString('en-IN')} INR\n(Rate: 1 EUR = ₹${conversionRate} INR)`);
  };

  return (
    <div className="event-section-card">
      <h2 className="section-title">💱 Currency Convertor (EUR to INR)</h2>
      <p className="section-subtitle">Event-driven currency conversion using form submission handler</p>

      <form onSubmit={handleSubmit} className="currency-form">
        <div className="form-group">
          <label htmlFor="eurosInput">Amount in Euros (€)</label>
          <input 
            type="number" 
            id="eurosInput" 
            placeholder="Enter Euros amount (e.g. 50)" 
            value={euros} 
            onChange={(e) => setEuros(e.target.value)} 
            step="any" 
            required 
          />
        </div>

        {/* Submit button with click event handler */}
        <button type="submit" className="convert-btn">
          🔄 Submit & Convert to INR
        </button>
      </form>

      {rupees && (
        <div className="result-box">
          <p>💰 Converted Amount: <strong>₹{Number(rupees).toLocaleString('en-IN')} INR</strong></p>
        </div>
      )}
    </div>
  );
}

export default CurrencyConvertor;
