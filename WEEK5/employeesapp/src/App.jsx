import React, { useState } from 'react';
import ThemeContext from './ThemeContext';
import EmployeesList from './EmployeesList';
import './App.css';

function App() {
  // Theme value stored in component state
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const sampleEmployees = [
    { id: 101, name: 'Ananya Sharma', designation: 'Senior Software Engineer', department: 'Full Stack Web' },
    { id: 102, name: 'Vikram Malhotra', designation: 'Lead UI/UX Designer', department: 'Product Design' },
    { id: 103, name: 'Rohan Mehta', designation: 'DevOps Architect', department: 'Cloud Infrastructure' },
    { id: 104, name: 'Sanya Gupta', designation: 'Product Manager', department: 'Strategy & Ops' }
  ];

  return (
    // Step 2: Wrap the entire JSX inside a ThemeContext.Provider, passing theme value from component state
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app-container ${theme === 'dark' ? 'app-dark' : 'app-light'}`}>
        <header className="app-header">
          <div className="header-top">
            <h1 className="main-title">Employees Directory Portal</h1>
            <button onClick={toggleTheme} className="theme-toggle-btn">
              {theme === 'light' ? '🌙 Switch to Dark Theme' : '☀️ Switch to Light Theme'}
            </button>
          </div>
          <p className="subtitle">Demonstrating React Context API & <code>useContext()</code> to eliminate prop-drilling</p>
        </header>

        <main className="app-main">
          {/* Note: EmployeesList is invoked WITHOUT passing any theme prop */}
          <EmployeesList employees={sampleEmployees} />
        </main>

        <footer className="app-footer">
          <p>© 2026 Employees App. Context Provider & Consumer Demonstration.</p>
        </footer>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
