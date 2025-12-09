import React, { useState } from 'react';
import Header from './Header';
import './Participate.css';

const Participate = () => {
  const [formData, setFormData] = useState({
    gameUsername: '',
    email: '',
    server: 'Singapore',
    gameId: '',
    youtubeUsername: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/api/participants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('🎉 Successfully registered for the giveaway! Good luck!');
        setFormData({
          gameUsername: '',
          email: '',
          server: 'Singapore',
          gameId: '',
          youtubeUsername: ''
        });
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  return (
    <div className="participate-page">
      <Header />
      
      {/* Moving Dots Layers */}
      <div className="dots-layer"></div>
      
      {/* Floating Orbs */}
      <div className="orbs-layer">
        <div className="orb"></div>
        <div className="orb"></div>
        <div className="orb"></div>
      </div>
      
      <div className="participate-container">
        <div className="giveaway-content">
          <div className="logo-section-page">
            <img src="/discord pfp5.webp" alt="Channel Logo" className="page-logo" />
          </div>
          
          <h1 className="giveaway-title">Locked & Loaded! Exclusive TankForce Giveaway by SatanISLIVE</h1>
          
          <div className="giveaway-description">
            <h2>Official 250 Subscribers VIP Giveaway</h2>
            <p>Thank you for being part of our growing community! As we work towards our milestone of 250 subscribers, we're giving back with an exclusive reward for our supporters.</p>
            
            <div className="prize-section">
              <h3>📌 Prize:</h3>
              <ul>
                <li>🏆 VIP 40 Days (30 + 10 Bonus)</li>
                <li>🎉 3 Lucky Winners</li>
                <li>🌍 Valid for Singapore Server Only</li>
              </ul>
            </div>
            
            <div className="how-to-section">
              <h3>📢 How to Participate:</h3>
              <ul>
                <li>Fill in all required details in below accurately.</li>
                <li>Make sure you are subscribed to the channel.</li>
                <li>Stay active and support the channel</li>
                <li>Winners will be selected once we reach 250 subscribers.</li>
              </ul>
            </div>
            
            <div className="winner-section">
              <h3>🎁 Winner Selection:</h3>
              <ul>
                <li>🔄 All valid participants will be added to the Spin Wheel.</li>
                <li>🎯 3 names will be picked live using the wheel.</li>
                <li>🔔 Winners will then be contacted and announced officially.</li>
              </ul>
            </div>
          </div>
          
          <form className="participate-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Game Username *</label>
              <input
                type="text"
                name="gameUsername"
                value={formData.gameUsername}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label>Server *</label>
              <select
                name="server"
                value={formData.server}
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="Singapore">Singapore</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Game ID *</label>
              <input
                type="text"
                name="gameId"
                value={formData.gameId}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            
            <div className="form-group">
              <label>YouTube Username *</label>
              <input
                type="text"
                name="youtubeUsername"
                value={formData.youtubeUsername}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            
            <button type="submit" className="submit-btn">
              🎮 ENTER GIVEAWAY
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Participate;