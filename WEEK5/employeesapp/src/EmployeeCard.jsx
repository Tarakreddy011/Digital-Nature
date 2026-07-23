import React, { useContext } from 'react';
import ThemeContext from './ThemeContext';

function EmployeeCard({ employee }) {
  // Step 2 (Refactoring): Use the useContext() hook to retrieve the theme value directly from ThemeContext.
  const themeContextValue = useContext(ThemeContext);
  
  // Support both object context { theme, toggleTheme } or simple string context
  const theme = typeof themeContextValue === 'object' ? themeContextValue.theme : themeContextValue;

  const isDark = theme === 'dark';

  return (
    <div className={`employee-card ${isDark ? 'card-dark' : 'card-light'}`}>
      <div className="avatar-circle">{employee.name.charAt(0)}</div>
      <div className="employee-info">
        <h3 className="employee-name">{employee.name}</h3>
        <p className="employee-role">💼 {employee.designation}</p>
        <p className="employee-dept">🏢 {employee.department}</p>
      </div>

      {/* Apply theme styling to the action buttons */}
      <button className={`action-btn ${isDark ? 'btn-dark' : 'btn-light'}`}>
        View Profile
      </button>
    </div>
  );
}

export default EmployeeCard;
