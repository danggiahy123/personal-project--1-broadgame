import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Game {
  id: string;
  name: string;
  description: string;
  image: string;
  highScore: number;
  instructions: string;
}

const GameDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - will be replaced with API call
    const mockGame: Game = {
      id: id || '1',
      name: 'Puzzle Master',
      description: 'Challenge your mind with this exciting puzzle game that tests your logic and problem-solving skills.',
      image: '🧩',
      highScore: 1250,
      instructions: 'Match the colored blocks to clear the board. Use your mouse or touch to drag and drop blocks. Clear all blocks to advance to the next level!'
    };

    setTimeout(() => {
      setGame(mockGame);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Loading game...</p>
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Game not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '5rem', marginBottom: '20px' }}>
            {game.image}
          </div>
          <h1 style={{ marginBottom: '10px' }}>{game.name}</h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>{game.description}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
          <div>
            <h3>Game Statistics</h3>
            <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
              <p><strong>High Score:</strong> {game.highScore.toLocaleString()}</p>
              <p><strong>Players:</strong> 1,234</p>
              <p><strong>Difficulty:</strong> Medium</p>
            </div>
          </div>
          
          <div>
            <h3>How to Play</h3>
            <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
              <p>{game.instructions}</p>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button 
            className="btn btn-primary" 
            style={{ fontSize: '1.2rem', padding: '15px 40px' }}
            onClick={() => {
              // Game logic will be implemented here
              alert('Game starting! (This is a demo)');
            }}
          >
            Start Playing
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
