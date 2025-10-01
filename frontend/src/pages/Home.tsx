import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container">
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px', color: '#333' }}>
          Welcome to BroadGame
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '40px' }}>
          Play amazing games and compete with players worldwide
        </p>
        
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <Link to="/games" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '15px 30px' }}>
            Browse Games
          </Link>
          <Link to="/leaderboard" className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '15px 30px' }}>
            View Leaderboard
          </Link>
        </div>
      </div>

      <div style={{ marginTop: '60px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Featured Games</h2>
        <div className="game-grid">
          <div className="game-card">
            <div className="game-image">🎮</div>
            <div className="game-info">
              <h3 className="game-title">Sample Game 1</h3>
              <p className="game-description">
                An exciting puzzle game that challenges your mind and reflexes.
              </p>
              <div className="game-stats">
                <span className="score">High Score: 1,250</span>
                <button className="play-button">Play Now</button>
              </div>
            </div>
          </div>

          <div className="game-card">
            <div className="game-image">🏆</div>
            <div className="game-info">
              <h3 className="game-title">Sample Game 2</h3>
              <p className="game-description">
                A fast-paced action game with stunning graphics and smooth gameplay.
              </p>
              <div className="game-stats">
                <span className="score">High Score: 2,100</span>
                <button className="play-button">Play Now</button>
              </div>
            </div>
          </div>

          <div className="game-card">
            <div className="game-image">🎯</div>
            <div className="game-info">
              <h3 className="game-title">Sample Game 3</h3>
              <p className="game-description">
                Test your accuracy and timing in this challenging arcade game.
              </p>
              <div className="game-stats">
                <span className="score">High Score: 850</span>
                <button className="play-button">Play Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
