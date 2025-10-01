import React, { useState, useEffect } from 'react';

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  game: string;
}

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState<string>('all');

  useEffect(() => {
    // Mock data - will be replaced with API call
    const mockData: LeaderboardEntry[] = [
      { rank: 1, username: 'GameMaster', score: 12500, game: 'Puzzle Master' },
      { rank: 2, username: 'SpeedDemon', score: 11800, game: 'Speed Runner' },
      { rank: 3, username: 'TargetPro', score: 11200, game: 'Target Practice' },
      { rank: 4, username: 'MemoryKing', score: 10800, game: 'Memory Challenge' },
      { rank: 5, username: 'SpaceExplorer', score: 10500, game: 'Space Adventure' },
      { rank: 6, username: 'RacingChamp', score: 10200, game: 'Racing Fever' },
      { rank: 7, username: 'PuzzlePro', score: 9800, game: 'Puzzle Master' },
      { rank: 8, username: 'FastRunner', score: 9500, game: 'Speed Runner' },
      { rank: 9, username: 'SharpShooter', score: 9200, game: 'Target Practice' },
      { rank: 10, username: 'BrainTrainer', score: 8900, game: 'Memory Challenge' }
    ];

    setTimeout(() => {
      setLeaderboard(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredLeaderboard = selectedGame === 'all' 
    ? leaderboard 
    : leaderboard.filter(entry => entry.game === selectedGame);

  const games = ['all', ...Array.from(new Set(leaderboard.map(entry => entry.game)))];

  if (loading) {
    return (
      <div className="container">
        <h1>Leaderboard</h1>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Leaderboard</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        See how you rank against other players!
      </p>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="game-filter" style={{ marginRight: '10px', fontWeight: 'bold' }}>
          Filter by game:
        </label>
        <select 
          id="game-filter"
          value={selectedGame}
          onChange={(e) => setSelectedGame(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
        >
          {games.map(game => (
            <option key={game} value={game}>
              {game === 'all' ? 'All Games' : game}
            </option>
          ))}
        </select>
      </div>

      <div className="card">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Game</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaderboard.map((entry) => (
              <tr key={entry.rank}>
                <td className="rank">#{entry.rank}</td>
                <td>{entry.username}</td>
                <td>{entry.game}</td>
                <td>{entry.score.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredLeaderboard.length === 0 && (
        <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
          <p>No scores found for the selected game.</p>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
