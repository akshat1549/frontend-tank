import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="main-header">
      <div className="logo-section">
        <a href="https://www.youtube.com/@SaittanIsLive?sub_confirmation=1" target="_blank" rel="noopener noreferrer">
          <img src="/discord pfp5.webp" alt="Channel Logo" className="channel-logo" />
        </a>
      </div>
      
      <div className="marquee-section">
        <div className="marquee">
          <span className="marquee-text">SatanISLIVE</span>
        </div>
      </div>
      
      <div className="nav-section">
        <Link to="/" className="participate-btn home-btn">HOME</Link>
        <Link to="/participate" className="participate-btn">GIVEAWAYCONTEXT</Link>
        <Link to="/winner-reveal" className="participate-btn winner-btn">WINNER REVEAL</Link>
      </div>
    </header>
  );
};

export default Header;