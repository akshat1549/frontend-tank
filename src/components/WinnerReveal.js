import React, { useState, useEffect } from 'react';
import Header from './Header';
import './WinnerReveal.css';

const WinnerReveal = () => {
  const [participants, setParticipants] = useState([]);
  const [isRevealing, setIsRevealing] = useState(false);
  const [winners, setWinners] = useState([]);
  const [currentParchment, setCurrentParchment] = useState(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [password, setPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);

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

  const handleLockClick = () => {
    setShowPasswordModal(true);
  };

  const handleUnlock = (e) => {
    e.preventDefault();
    if (password === 'satty123654') {
      setIsAdminMode(true);
      setShowPasswordModal(false);
      setPassword('');
    } else {
      alert('Incorrect password!');
      setPassword('');
    }
  };

  const revealWinners = () => {
    if (!isAdminMode) {
      alert('Only admin can reveal winners!');
      return;
    }
    
    if (participants.length < 4) {
      alert('Need at least 4 participants!');
      return;
    }

    setIsRevealing(true);
    setWinners([]);
    setCurrentParchment(null);

    const selectedWinners = [];
    const participantsCopy = [...participants];
    
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * participantsCopy.length);
      selectedWinners.push(participantsCopy[randomIndex]);
      participantsCopy.splice(randomIndex, 1);
    }

    selectedWinners.forEach((winner, index) => {
      setTimeout(() => {
        setCurrentParchment(winner);
        setTimeout(() => {
          setWinners(prev => [...prev, winner]);
          setCurrentParchment(null);
        }, 3000);
      }, index * 4000);
    });

    setTimeout(() => {
      setIsRevealing(false);
    }, 16000);
  };

  return (
    <div className="winner-reveal-page">
      <Header />
      
      {/* Moving Dots Layers */}
      <div className="dots-layer"></div>
      
      {/* Floating Orbs */}
      <div className="orbs-layer">
        <div className="orb"></div>
        <div className="orb"></div>
        <div className="orb"></div>
      </div>
      
      <div className="winner-container">
        <h1 className="winner-title">🎁 WINNER REVEAL CHEST 🎁</h1>
        
        <div className="winner-content">
          <div className="chest-section">
            {showPasswordModal && (
              <div className="lock-overlay">
                <div className="lock-modal">
                  <span className="lock-icon">🔒</span>
                  <h3>Admin Access</h3>
                  <p>Enter admin password to unlock controls</p>
                  <form onSubmit={handleUnlock}>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="password-input"
                      autoFocus
                    />
                    <button type="submit" className="unlock-btn">
                      🔓 UNLOCK
                    </button>
                    <button 
                      type="button" 
                      className="cancel-btn"
                      onClick={() => setShowPasswordModal(false)}
                    >
                      CANCEL
                    </button>
                  </form>
                </div>
              </div>
            )}
            
            <div className="chest-container">
              {!isAdminMode && (
                <div className="chest-lock-3d" onClick={handleLockClick}>
                  <div className="lock-body">
                    <div className="lock-shackle"></div>
                    <div className="lock-keyhole"></div>
                  </div>
                  <p className="lock-text">Admin Only</p>
                </div>
              )}
              
              <div className={`goblet-of-fire ${isRevealing ? 'active' : ''}`}>
                <div className="goblet-cup">
                  <div className="goblet-rim"></div>
                  <div className="goblet-body"></div>
                  <div className="goblet-stem"></div>
                  <div className="goblet-base"></div>
                </div>
                <div className="blue-flames">
                  <div className="flame"></div>
                  <div className="flame"></div>
                  <div className="flame"></div>
                </div>
              </div>
              
              {currentParchment && (
                <div className="parchment-reveal">
                  <div className="parchment">
                    <div className="parchment-text">{currentParchment.game_username}</div>
                  </div>
                </div>
              )}
            </div>
            
            {isAdminMode && (
              <button 
                className="reveal-btn" 
                onClick={revealWinners}
                disabled={isRevealing || participants.length < 4}
              >
                {isRevealing ? '🔥 REVEALING...' : '🔥 REVEAL WINNERS'}
              </button>
            )}
            
            {!isAdminMode && (
              <p className="viewer-message">
                👁️ Viewing Mode - Only admin can reveal winners
              </p>
            )}
            
            {winners.length > 0 && (
              <div className="winners-announcement">
                <h3>🏆 WINNERS 🏆</h3>
                <div className="winners-grid">
                  {winners.map((winner, index) => (
                    <div key={index} className="winner-card" style={{animationDelay: `${index * 0.2}s`}}>
                      <div className="winner-rank">#{index + 1}</div>
                      <p><strong>Game:</strong> {winner.game_username}</p>
                      <p><strong>ID:</strong> {winner.game_id}</p>
                      <p><strong>YouTube:</strong> {winner.youtube_username}</p>
                      <p><strong>Server:</strong> {winner.server}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="participants-section">
            <h2>🎮 Participants ({participants.length})</h2>
            <div className="participants-list">
              {participants.length === 0 ? (
                <p>No participants yet!</p>
              ) : (
                participants.map((participant, index) => (
                  <div key={participant.id} className="participant-card">
                    <span className="participant-number">#{index + 1}</span>
                    <span className="participant-name">{participant.game_username}</span>
                    <span className="participant-game-id">{participant.game_id}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerReveal;