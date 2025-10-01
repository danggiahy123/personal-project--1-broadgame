import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          BroadGame
        </Link>
        
        <nav className="nav">
          <Link 
            to="/games" 
            className={location.pathname === '/games' ? 'active' : ''}
          >
            Games
          </Link>
          <Link 
            to="/leaderboard" 
            className={location.pathname === '/leaderboard' ? 'active' : ''}
          >
            Leaderboard
          </Link>
        </nav>

        <div className="auth-buttons">
          <Link to="/login" className="btn-login">
            Login
          </Link>
          <Link to="/register" className="btn-register">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
