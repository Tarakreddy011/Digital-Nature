import React from 'react';
import EmployeeCard from './EmployeeCard';

// Refactoring: Remove the theme prop being passed down to the EmployeesList component,
// ensuring it no longer passes theme to its children explicitly.
function EmployeesList({ employees }) {
  return (
    <div className="employees-list-container">
      <h2 className="list-title">👥 Team Directory</h2>
      <div className="employees-grid">
        {employees.map((emp) => (
          // EmployeeCard retrieves theme from ThemeContext directly via useContext hook
          <EmployeeCard key={emp.id} employee={emp} />
        ))}
      </div>
    </div>
  );
}

export default EmployeesList;
