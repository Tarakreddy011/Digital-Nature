import React, { Component } from 'react';

// Step 2 & 3: Component Logic - Create a component named Getuser using Class Component lifecycle methods.
class Getuser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true,
      error: null
    };
  }

  // Step 3: Within the asynchronous componentDidMount() lifecycle method, invoke the API URL using fetch.
  async componentDidMount() {
    try {
      // https://api.randomuser.me/ or https://randomuser.me/api/
      const response = await fetch('https://randomuser.me/api/');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // Parse the JSON response and update the component's state
      if (data.results && data.results.length > 0) {
        this.setState({
          user: data.results[0],
          loading: false
        });
      } else {
        throw new Error('No user data returned from API');
      }
    } catch (err) {
      console.error('Error fetching user:', err);
      this.setState({
        error: err.message || 'Failed to fetch user',
        loading: false
      });
    }
  }

  // Method to fetch a new user manually
  fetchNewUser = async () => {
    this.setState({ loading: true, error: null });
    await this.componentDidMount();
  };

  render() {
    const { user, loading, error } = this.state;

    return (
      <div className="user-card-container">
        {loading && (
          <div className="user-card-status">
            <div className="spinner"></div>
            <p>Fetching random user profile...</p>
          </div>
        )}

        {error && (
          <div className="user-card-status error">
            <p>⚠️ Error: {error}</p>
            <button onClick={this.fetchNewUser} className="retry-btn">Retry Fetch</button>
          </div>
        )}

        {!loading && !error && user && (
          <div className="user-card">
            <div className="user-avatar-wrapper">
              {/* Display user's image */}
              <img 
                src={user.picture.large || user.picture.medium} 
                alt={`${user.name.first} ${user.name.last}`} 
                className="user-avatar" 
              />
              <span className="online-badge"></span>
            </div>

            <div className="user-info">
              {/* Display user's title and first name */}
              <h2 className="user-name">
                <span className="user-title">{user.name.title}.</span> {user.name.first} {user.name.last}
              </h2>
              <p className="user-email">✉️ {user.email}</p>
              <p className="user-location">📍 {user.location.city}, {user.location.country}</p>
              <p className="user-phone">📞 {user.phone}</p>
            </div>

            <button onClick={this.fetchNewUser} className="refresh-btn">
              🔄 Fetch Another User
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Getuser;
