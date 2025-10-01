import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Mock login - will be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (formData.email === 'demo@example.com' && formData.password === 'password') {
        // Successful login
        alert('Login successful! (This is a demo)');
        // Redirect to home or dashboard
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Login</h2>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            style={{ width: '100%', marginBottom: '20px' }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#666' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#007bff', textDecoration: 'none' }}>
              Register here
            </Link>
          </p>
        </div>

        <div style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '4px' }}>
          <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>
            <strong>Demo credentials:</strong><br />
            Email: demo@example.com<br />
            Password: password
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
