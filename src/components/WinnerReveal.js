import React, { useState, useEffect } from 'react';
import Header from './Header';
import './WinnerReveal.css';

const WinnerReveal = () => {
  const [participants, setParticipants] = useState([]);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [password, setPassword] = useState('');
  const [revealedWinners, setRevealedWinners] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentParchment, setCurrentParchment] = useState(null);

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const response = await fetch('https://backend-tank.onrender.com/api/participants');
      const data = await response.json();
      if (Array.isArray(data)) {
        setParticipants(data);
      }
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  };

  const handleLogin = () => {
    if (password === 'satty123654') {
      setIsAdminMode(true);
    } else {
      alert('Wrong Password');
    }
  };

  const revealWinner = () => {
    if (revealedWinners.length >= 4 || isAnimating || participants.length < 4) return;

    setIsAnimating(true);

    const participantsCopy = [...participants].filter(
      p => !revealedWinners.find(w => w.id === p.id)
    );
    const randomIndex = Math.floor(Math.random() * participantsCopy.length);
    const winner = participantsCopy[randomIndex];

    setCurrentParchment(winner);

    setTimeout(() => {
      setRevealedWinners([...revealedWinners, winner]);
      setCurrentParchment(null);
      setIsAnimating(false);
    }, 2000);
  };

  if (!isAdminMode) {
    return (
      <>
        <Header />
        <div className="login-container">
          <h2>Admin Login</h2>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Enter</button>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="magical-bg">
        <div className={`goblet ${isAnimating ? 'ignite' : ''}`} onClick={revealWinner}>
          🔥
        </div>

        {currentParchment && (
          <div className="parchment">
            {currentParchment.game_username}
          </div>
        )}

        {revealedWinners.length > 0 && (
          <div className="winners-list">
            {revealedWinners.map((winner, index) => (
              <div key={index} className="winner-item">
                #{index + 1}: {winner.game_username} - {winner.game_id}
              </div>
            ))}
          </div>
        )}

        {revealedWinners.length >= 4 && (
          <div className="finished">All Winners Revealed!</div>
        )}

        <div className="participants-section">
          <h2>🎮 Participants ({participants.length})</h2>
          <div className="participants-list">
            {participants.map((participant, index) => (
              <div key={participant.id} className="participant-card">
                <span className="participant-number">#{index + 1}</span>
                <span className="participant-name">{participant.game_username}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WinnerReveal;