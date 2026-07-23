import React, { useState } from 'react';

function CounterEvents() {
  const [count, setCount] = useState(0);

  // Static message method
  const sayHello = () => {
    alert('👋 Hello from static method!');
  };

  // Multi-method handler for Increment button
  const handleIncrement = () => {
    setCount((prev) => prev + 1);
    sayHello(); // Triggers static Hello message simultaneously
  };

  // Handler for Decrement button
  const handleDecrement = () => {
    setCount((prev) => prev - 1);
  };

  // Handler taking argument (e.g., "Welcome")
  const handleSayWelcome = (msg) => {
    alert(`🎉 Greetings: ${msg}!`);
  };

  // Synthetic event handler displaying "I was clicked" alert
  const handleSyntheticClick = (e) => {
    alert(`⚡ Synthetic Event Triggered!\nEvent Type: ${e.type}\nMessage: "I was clicked"`);
  };

  return (
    <div className="event-section-card">
      <h2 className="section-title">🔢 Counter & Synthetic Event Triggers</h2>
      
      <div className="counter-display">
        <span className="counter-label">Current Counter Value:</span>
        <span className="counter-number">{count}</span>
      </div>

      <div className="buttons-grid">
        {/* Increment button triggering multiple methods simultaneously (counter + static Hello) */}
        <button onClick={handleIncrement} className="evt-btn btn-inc">
          ➕ Increment (+ Static Hello)
        </button>

        {/* Decrement button */}
        <button onClick={handleDecrement} className="evt-btn btn-dec">
          ➖ Decrement
        </button>

        {/* Say Welcome button invoking function with "Welcome" argument */}
        <button onClick={() => handleSayWelcome('Welcome')} className="evt-btn btn-welcome">
          💬 Say Welcome
        </button>

        {/* Synthetic OnPress / onClick event button */}
        <button onClick={handleSyntheticClick} className="evt-btn btn-click">
          ⚡ Synthetic OnPress Event
        </button>
      </div>
    </div>
  );
}

export default CounterEvents;
