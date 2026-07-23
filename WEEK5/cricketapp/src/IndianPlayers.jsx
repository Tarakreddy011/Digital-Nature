import React from 'react';

function IndianPlayers() {
  // Step 6: Display the Odd Team players and Even Team players by utilizing the destructuring features of ES6.
  const initialPlayers = [
    "Virat Kohli",       // index 0 -> 1st player (Odd)
    "Rohit Sharma",       // index 1 -> 2nd player (Even)
    "Jasprit Bumrah",     // index 2 -> 3rd player (Odd)
    "KL Rahul",           // index 3 -> 4th player (Even)
    "Rishabh Pant",       // index 4 -> 5th player (Odd)
    "Hardik Pandya",      // index 5 -> 6th player (Even)
    "Ravindra Jadeja",    // index 6 -> 7th player (Odd)
    "Shubman Gill",       // index 7 -> 8th player (Even)
    "Shreyas Iyer",       // index 8 -> 9th player (Odd)
    "Mohammed Shami",     // index 9 -> 10th player (Even)
    "Yuzvendra Chahal"    // index 10 -> 11th player (Odd)
  ];

  // Destructure all 11 players from the array
  const [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11] = initialPlayers;

  // Group by Odd Team and Even Team based on their positions (1-based: 1,3,5,7,9,11 are Odd; 2,4,6,8,10 are Even)
  const oddTeam = [p1, p3, p5, p7, p9, p11];
  const evenTeam = [p2, p4, p6, p8, p10];

  // Step 7: Declare two arrays, T20players and RanjiTrophy players, merge them using the ES6 merge feature, and display the result.
  const T20players = ["Suryakumar Yadav", "Yashasvi Jaiswal", "Rinku Singh", "Shivam Dube"];
  const RanjiTrophyPlayers = ["Sarfaraz Khan", "Abhimanyu Easwaran", "Yash Dhull", "Tanush Kotian"];

  // Merge using ES6 spread operator
  const mergedSquad = [...T20players, ...RanjiTrophyPlayers];

  return (
    <div className="component-card">
      <h2 className="component-title">🇮🇳 Indian Players & Squad Selection</h2>

      {/* Destructuring Teams Display */}
      <div className="roster-container">
        <div className="roster-column odd-team">
          <h3>Odd Team Players (1st, 3rd, 5th...)</h3>
          <ul className="player-list">
            {oddTeam.map((player, idx) => (
              <li key={idx} className="player-item odd-item">
                <span className="player-num">#{idx * 2 + 1}</span> {player}
              </li>
            ))}
          </ul>
        </div>

        <div className="roster-column even-team">
          <h3>Even Team Players (2nd, 4th, 6th...)</h3>
          <ul className="player-list">
            {evenTeam.map((player, idx) => (
              <li key={idx} className="player-item even-item">
                <span className="player-num">#{idx * 2 + 2}</span> {player}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Merged Squad Display */}
      <div className="merged-squad-section">
        <h3>Merged T20 & Ranji Trophy Squad (Spread Operator Merge)</h3>
        <p className="description-note">
          T20 Squad and Ranji Trophy Squad merged seamlessly using ES6 Spread syntax: <code>[...T20players, ...RanjiTrophyPlayers]</code>.
        </p>
        <div className="squad-grid">
          {mergedSquad.map((player, idx) => (
            <div key={idx} className="squad-member-card">
              <span className="member-avatar">👤</span>
              <span className="member-name">{player}</span>
              <span className={`member-source-badge ${idx < T20players.length ? 't20-badge' : 'ranji-badge'}`}>
                {idx < T20players.length ? 'T20' : 'Ranji'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default IndianPlayers;
