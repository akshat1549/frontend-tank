import React, { useState, useEffect } from 'react';
import Header from './Header';
import './WinnerReveal.css';

const WinnerReveal = () => {
  const [participants, setParticipants] = useState([
    { id: 1, game_username: 'GamerPro123', game_id: 'GP123456', youtube_username: 'GamerPro' },
    { id: 2, game_username: 'TankMaster', game_id: 'TM789012', youtube_username: 'TankMaster' },
    { id: 3, game_username: 'SniperKing', game_id: 'SK345678', youtube_username: 'SniperKing' },
    { id: 4, game_username: 'BattleHero', game_id: 'BH901234', youtube_username: 'BattleHero' },
    { id: 5, game_username: 'WarLord99', game_id: 'WL567890', youtube_username: 'WarLord99' }
  ]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [password, setPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    // Keep sample data, don't fetch from API yet
    // fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/participants');
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

  const spinWheel = () => {
    if (!isAdminMode) {
      alert('Only admin can spin the wheel!');
      return;
    }
    
    if (participants.length === 0) {
      alert('No participants yet!');
      return;
    }

    setIsSpinning(true);
    setWinner(null);

    const randomIndex = Math.floor(Math.random() * participants.length);
    const winnerData = participants[randomIndex];
    
    const spins = 5 + Math.random() * 5;
    const finalRotation = rotation + (spins * 360) + (randomIndex * (360 / participants.length));
    
    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setWinner(winnerData);
    }, 3000);
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
        <h1 className="winner-title">🎯 WINNER REVEAL ZONE 🎯</h1>
        
        <div className="winner-content">
          <div className="wheel-section">
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
            
            <div className="wheel-container">
              {!isAdminMode && (
                <div className="wheel-lock-3d" onClick={handleLockClick}>
                  <div className="lock-body">
                    <div className="lock-shackle"></div>
                    <div className="lock-keyhole"></div>
                  </div>
                  <p className="lock-text">Admin Only</p>
                </div>
              )}
              <div 
                className={`spin-wheel ${isSpinning ? 'spinning' : ''}`}
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {participants.map((participant, index) => (
                  <div
                    key={participant.id}
                    className="wheel-segment"
                    style={{
                      transform: `rotate(${index * (360 / participants.length)}deg)`,
                      '--segment-color': `hsl(${index * (360 / participants.length)}, 80%, 60%)`
                    }}
                  >
                    <span className="segment-text">{participant.game_username}</span>
                  </div>
                ))}
              </div>
              <div className="wheel-pointer">▼</div>
            </div>
            
            {isAdminMode && (
              <button 
                className="spin-btn" 
                onClick={spinWheel}
                disabled={isSpinning || participants.length === 0}
              >
                {isSpinning ? '🎲 SPINNING...' : '🎲 SPIN WHEEL'}
              </button>
            )}
            
            {!isAdminMode && (
              <p className="viewer-message">
                👁️ Viewing Mode - Only admin can spin the wheel
              </p>
            )}
            
            {winner && (
              <div className="winner-announcement">
                <h3>🏆 WINNER 🏆</h3>
                <div className="winner-details">
                  <p><strong>Game Username:</strong> {winner.game_username}</p>
                  <p><strong>Game ID:</strong> {winner.game_id}</p>
                  <p><strong>YouTube:</strong> {winner.youtube_username}</p>
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