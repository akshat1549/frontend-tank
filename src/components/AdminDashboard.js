import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState('');

  const API_URL = 'https://backend-tank.onrender.com/api';

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'sattyislive' && password === 'satty123654') {
      setIsAuthenticated(true);
      setError('');
      fetchParticipants();
    } else {
      setError('Invalid credentials');
    }
  };

  const fetchParticipants = async () => {
    try {
      const response = await axios.get(`${API_URL}/participants`);
      setParticipants(response.data);
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  };

  const deleteParticipant = async (id) => {
    if (!window.confirm('Delete this participant?')) return;
    try {
      await axios.delete(`${API_URL}/participants/${id}`);
      fetchParticipants();
    } catch (error) {
      console.error('Error deleting participant:', error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setParticipants([]);
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-box">
          <h2>🔒 Admin Access</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="error">{error}</p>}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>⚙️ Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Participants</h3>
          <p className="stat-number">{participants.length}</p>
        </div>
      </div>

      <div className="participants-section">
        <h2>Giveaway Participants</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Game Username</th>
                <th>Email</th>
                <th>Server</th>
                <th>Game ID</th>
                <th>YouTube Username</th>
                <th>Registered</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.game_username}</td>
                  <td>{p.email || 'N/A'}</td>
                  <td>{p.server}</td>
                  <td>{p.game_id}</td>
                  <td>{p.youtube_username}</td>
                  <td>{new Date(p.created_date).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => deleteParticipant(p.id)} className="delete-btn">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
