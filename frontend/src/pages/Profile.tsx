import React, { useState } from 'react';

const Profile: React.FC = () => {
  const [user, setUser] = useState({
    username: 'DemoUser',
    email: 'demo@example.com',
    joinDate: '2024-01-01',
    totalGamesPlayed: 25,
    totalScore: 15000,
    bestGame: 'Puzzle Master',
    rank: 15
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: user.username,
    email: user.email
  });

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setUser({
      ...user,
      ...editData
    });
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditData({
      username: user.username,
      email: user.email
    });
    setIsEditing(false);
  };

  return (
    <div className="container">
      <h1>Profile</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Profile Information */}
        <div className="card">
          <h3>Profile Information</h3>
          
          {!isEditing ? (
            <div>
              <div style={{ marginBottom: '15px' }}>
                <strong>Username:</strong> {user.username}
              </div>
              <div style={{ marginBottom: '15px' }}>
                <strong>Email:</strong> {user.email}
              </div>
              <div style={{ marginBottom: '15px' }}>
                <strong>Member since:</strong> {new Date(user.joinDate).toLocaleDateString()}
              </div>
              <button 
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={editData.username}
                  onChange={handleEditChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editData.email}
                  onChange={handleEditChange}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="card">
          <h3>Statistics</h3>
          
          <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
            <div style={{ marginBottom: '15px' }}>
              <strong>Total Games Played:</strong> {user.totalGamesPlayed}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>Total Score:</strong> {user.totalScore.toLocaleString()}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>Best Game:</strong> {user.bestGame}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>Global Rank:</strong> #{user.rank}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Games */}
      <div className="card" style={{ marginTop: '30px' }}>
        <h3>Recent Games</h3>
        
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Game</th>
              <th>Score</th>
              <th>Date</th>
              <th>Rank</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Puzzle Master</td>
              <td>1,250</td>
              <td>2024-01-10</td>
              <td>#5</td>
            </tr>
            <tr>
              <td>Speed Runner</td>
              <td>2,100</td>
              <td>2024-01-09</td>
              <td>#12</td>
            </tr>
            <tr>
              <td>Target Practice</td>
              <td>850</td>
              <td>2024-01-08</td>
              <td>#8</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
