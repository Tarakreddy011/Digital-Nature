import React, { useState, useEffect } from 'react';
import GitClient from './GitClient';
import './App.css';

function App() {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userName = "techiesyed";

  useEffect(() => {
    const gitClient = new GitClient();
    gitClient.getRepositories(userName)
      .then((data) => {
        setRepositories(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch repositories');
        setLoading(false);
      });
  }, [userName]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="main-title">GitHub Client Dashboard</h1>
        <p className="subtitle">Displaying public repositories for <strong>@{userName}</strong></p>
      </header>

      <main className="app-main">
        {loading && (
          <div className="status-box loading">
            <div className="spinner"></div>
            <p>Fetching repositories from GitHub API...</p>
          </div>
        )}

        {error && (
          <div className="status-box error">
            <p>⚠️ Error: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="repo-grid">
            {repositories.length === 0 ? (
              <p>No repositories found for user {userName}.</p>
            ) : (
              repositories.map((repo) => (
                <div key={repo.id} className="repo-card">
                  <div className="repo-header">
                    <span className="repo-icon">📁</span>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-name">
                      {repo.name}
                    </a>
                  </div>
                  <p className="repo-desc">
                    {repo.description || 'No description provided.'}
                  </p>
                  <div className="repo-footer">
                    <span className="repo-lang">🏷️ {repo.language || 'Code'}</span>
                    <span className="repo-stars">⭐ {repo.stargazers_count || 0}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>© 2026 GitClient App. Unit Testing & Mocking Demonstration.</p>
      </footer>
    </div>
  );
}

export default App;
