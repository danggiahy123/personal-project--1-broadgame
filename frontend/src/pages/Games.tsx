import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Game {
  id: string;
  name: string;
  description: string;
  image: string;
  highScore: number;
}

const Games: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for now - will be replaced with API call
    const mockGames: Game[] = [
      {
        id: '1',
        name: 'Puzzle Master',
        description: 'Challenge your mind with this exciting puzzle game',
        image: '🧩',
        highScore: 1250
      },
      {
        id: '2',
        name: 'Speed Runner',
        description: 'Fast-paced action game with stunning graphics',
        image: '🏃',
        highScore: 2100
      },
      {
        id: '3',
        name: 'Target Practice',
        description: 'Test your accuracy and timing skills',
        image: '🎯',
        highScore: 850
      },
      {
        id: '4',
        name: 'Memory Challenge',
        description: 'Improve your memory with this brain training game',
        image: '🧠',
        highScore: 1500
      },
      {
        id: '5',
        name: 'Space Adventure',
        description: 'Explore the galaxy in this epic space game',
        image: '🚀',
        highScore: 3200
      },
      {
        id: '6',
        name: 'Racing Fever',
        description: 'High-speed racing action with realistic physics',
        image: '🏎️',
        highScore: 1800
      }
    ];

    setTimeout(() => {
      setGames(mockGames);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="container">
        <h1>Games</h1>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Loading games...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>All Games</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Choose from our collection of exciting games and start playing!
      </p>
      
      <div className="game-grid">
        {games.map((game) => (
          <div key={game.id} className="game-card">
            <div className="game-image">{game.image}</div>
            <div className="game-info">
              <h3 className="game-title">{game.name}</h3>
              <p className="game-description">{game.description}</p>
              <div className="game-stats">
                <span className="score">High Score: {game.highScore.toLocaleString()}</span>
                <Link to={`/games/${game.id}`} className="play-button">
                  Play Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
