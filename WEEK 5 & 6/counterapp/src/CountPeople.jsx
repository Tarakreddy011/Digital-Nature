import React, { Component } from 'react';

class CountPeople extends Component {
  // Step 3: Use a constructor and state to store the entrycount and exitcount.
  constructor(props) {
    super(props);
    this.state = {
      entrycount: 0,
      exitcount: 0
    };
  }

  // Step 2: UpdateEntry() method (to display people entering)
  UpdateEntry = () => {
    this.setState((prevState) => ({
      entrycount: prevState.entrycount + 1
    }));
  }

  // Step 2: UpdateExit() method (to display people exiting)
  UpdateExit = () => {
    this.setState((prevState) => ({
      exitcount: prevState.exitcount + 1
    }));
  }

  render() {
    return (
      <div className="counter-card">
        <h2 className="card-title">👥 People Flow Manager</h2>
        
        <div className="stats-container">
          {/* Entry Stats */}
          <div className="stat-box entry-box">
            <span className="stat-label">Total Entries</span>
            <span className="stat-value">{this.state.entrycount}</span>
            {/* Step 4: Add a "Login" button to the component that increments the entrycount by 1 when clicked. */}
            <button className="btn btn-login" onClick={this.UpdateEntry}>
              🚪 Login (Enter)
            </button>
          </div>

          {/* Exit Stats */}
          <div className="stat-box exit-box">
            <span className="stat-label">Total Exits</span>
            <span className="stat-value">{this.state.exitcount}</span>
            {/* Step 5: Add an "Exit" button to the component that increments the exitcount by 1 when clicked. */}
            <button className="btn btn-exit" onClick={this.UpdateExit}>
              🚶 Exit (Leave)
            </button>
          </div>
        </div>

        {/* Dynamic Calculation showing occupancy */}
        <div className="occupancy-box">
          <span className="occupancy-label">Current Inside Office: </span>
          <span className="occupancy-value">{Math.max(0, this.state.entrycount - this.state.exitcount)} people</span>
        </div>
      </div>
    );
  }
}

export default CountPeople;
