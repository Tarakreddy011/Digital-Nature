import React from 'react';

function ListofPlayers() {
  // Step 3: Declare an array of 11 players and store their names and scores using the ES6 map() feature.
  const rawPlayerNames = [
    "Virat Kohli",
    "Rohit Sharma",
    "Jasprit Bumrah",
    "Rishabh Pant",
    "KL Rahul",
    "Shubman Gill",
    "Ravindra Jadeja",
    "Hardik Pandya",
    "Shreyas Iyer",
    "Mohammed Siraj",
    "Yuzvendra Chahal"
  ];

  const rawScores = [88, 95, 25, 78, 42, 69, 55, 74, 38, 12, 5];

  // We use the ES6 map() feature to construct the list of player objects with names and scores.
  const players = rawPlayerNames.map((name, index) => ({
    id: index + 1,
    name: name,
    score: rawScores[index]
  }));

  // Step 4: Filter out players with scores below 70 using ES6 arrow functions.
  // "Filter out scores below 70" means keeping those with score >= 70.
  const highScorers = players.filter(player => player.score >= 70);

  return (
    <div className="component-card">
      <h2 className="component-title">🏏 Players Roster & High Scorers</h2>
      
      <div className="roster-container">
        {/* Section 1: All Players */}
        <div className="roster-column">
          <h3>All Players (Mapped)</h3>
          <ul className="player-list">
            {players.map((player) => (
              <li key={player.id} className="player-item">
                <span className="player-name">{player.name}</span>
                <span className="player-score badge">{player.score} runs</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 2: Filtered High Scorers */}
        <div className="roster-column highlighted-column">
          <h3>Elite Performers (Score ≥ 70)</h3>
          <ul className="player-list">
            {highScorers.map((player) => (
              <li key={player.id} className="player-item high-scorer">
                <span className="player-name">⭐ {player.name}</span>
                <span className="player-score badge gold-badge">{player.score} runs</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ListofPlayers;
