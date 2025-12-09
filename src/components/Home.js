import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', category: 'General' });
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [stats, setStats] = useState({ total: 0, categories: {} });

  const API_URL = 'http://localhost:3001/api';
  const categories = ['General', 'Work', 'Personal', 'Shopping', 'Health', 'Education'];
  const [clickSmokes, setClickSmokes] = useState([]);

  const handleTankClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newSmokes = [];
    for (let i = 0; i < 16; i++) {
      newSmokes.push({
        id: Date.now() + i + Math.random(),
        x: x,
        y: y,
        angle: (i * 22.5)
      });
    }
    
    setClickSmokes(prev => [...prev, ...newSmokes]);
    
    setTimeout(() => {
      setClickSmokes(prev => prev.filter(smoke => !newSmokes.includes(smoke)));
    }, 2000);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    updateStats();
  }, [items]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/items`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
    setLoading(false);
  };

  const updateStats = () => {
    const categoryCount = items.reduce((acc, item) => {
      acc[item.category || 'General'] = (acc[item.category || 'General'] || 0) + 1;
      return acc;
    }, {});
    setStats({ total: items.length, categories: categoryCount });
  };

  const addItem = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    
    try {
      await axios.post(`${API_URL}/items`, formData);
      setFormData({ name: '', category: 'General' });
      fetchItems();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      await axios.delete(`${API_URL}/items/${id}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const startEdit = (item) => {
    setEditingItem(item);
    setFormData({ name: item.name, category: item.category || 'General' });
  };

  const updateItem = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    
    try {
      await axios.put(`${API_URL}/items/${editingItem.id}`, formData);
      setEditingItem(null);
      setFormData({ name: '', category: 'General' });
      fetchItems();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setFormData({ name: '', category: 'General' });
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateParticles = () => {
    const particles = [];
    for (let i = 0; i < 20; i++) {
      particles.push(
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`
          }}
        />
      );
    }
    return particles;
  };

  return (
    <>
      {/* Moving Dots Layers */}
      <div className="dots-layer"></div>
      
      {/* Floating Orbs */}
      <div className="orbs-layer">
        <div className="orb"></div>
        <div className="orb"></div>
        <div className="orb"></div>
      </div>
      
      {/* Floating Particles */}
      <div className="particles">
        {generateParticles()}
      </div>
      
      <div className="container" style={{marginTop: '100px'}}>
        <header className="header">
          <h1 className="glitch cyber-text" data-text="TANK GAMING HUB">TANK GAMING HUB</h1>
          <p>⚡ LEVEL UP YOUR GAMING EXPERIENCE ⚡</p>
        </header>
        <div className="tank-container" onClick={handleTankClick}>
          <img 
            src="/kvandebp-removebg-preview.png" 
            alt="Tank" 
            className="tank-image"
          />
          
          {clickSmokes.map((smoke) => (
            <div
              key={smoke.id}
              className="click-smoke"
              style={{
                left: smoke.x,
                top: smoke.y,
                '--angle': `${smoke.angle}deg`
              }}
            />
          ))}
        </div>

        {/* Hero Section */}
        <section className="hero-section">
          <h2 className="hero-title">🔥 SatanIsLive — Where Skill Meets Chaos 🔥</h2>
          <p className="hero-subtitle">High-Intensity Montages • Competitive Gameplay • Casual Vibes • Raw Moments</p>
          <p className="hero-description">
            Welcome to the official home of SatanIsLive.<br/>
            Step into a world where pro-level plays, cinematic edits, and real gaming energy collide.
          </p>
          <div className="hero-buttons">
            <a href="https://www.youtube.com/@SaittanIsLive" target="_blank" rel="noopener noreferrer" className="hero-btn primary">
              🎥 Watch Latest Video
            </a>
            <a href="https://www.youtube.com/@SaittanIsLive?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className="hero-btn secondary">
              🎮 Subscribe on YouTube
            </a>
          </div>
        </section>

        {/* Featured Intro */}
        <section className="content-section">
          <h3 className="section-title">Gaming Isn't Just a Hobby — It's a Lifestyle.</h3>
          <p className="section-text">SatanIsLive brings you a unique blend of:</p>
          <ul className="feature-list">
            <li>Competitive gameplay</li>
            <li>Cinematic montage edits</li>
            <li>Relaxed &amp; casual gaming moments</li>
            <li>High-skill clutch plays</li>
            <li>Tips, strategies &amp; raw reactions</li>
          </ul>
          <p className="section-text highlight">
            If you're a gamer who loves creativity, skill, and hype gameplay moments — you're in the right place.
          </p>
        </section>

        {/* Why SatanIsLive */}
        <section className="content-section">
          <h3 className="section-title">Why SatanIsLive?</h3>
          <p className="section-text">Because this channel is built for gamers who want:</p>
          <div className="why-grid">
            <div className="why-card">
              <span className="why-icon">🎮</span>
              <h4>Real Skill</h4>
              <p>No fake reactions, no staged clips</p>
            </div>
            <div className="why-card">
              <span className="why-icon">🔥</span>
              <h4>Clean Edits &amp; Montages</h4>
              <p>Fast, cinematic, impactful</p>
            </div>
            <div className="why-card">
              <span className="why-icon">🏆</span>
              <h4>Gaming Mindset</h4>
              <p>Strategies, positioning, improvement</p>
            </div>
            <div className="why-card">
              <span className="why-icon">😂</span>
              <h4>Casual Fun</h4>
              <p>Real reactions, fun moments, raw vibes</p>
            </div>
          </div>
          <p className="section-text highlight">It's everything you love about gaming — in one place.</p>
        </section>

        {/* About Section */}
        <section className="content-section about-section">
          <h3 className="section-title">👤 WHO IS SATANISLIVE?</h3>
          <p className="section-text">
            I'm SatanIsLive, a passionate gamer who loves turning gameplay into stories.<br/>
            My content mixes:
          </p>
          <ul className="feature-list">
            <li>Serious competitive sessions</li>
            <li>Replay breakdowns</li>
            <li>Casual fun nights</li>
            <li>Insane montage edits</li>
          </ul>
          <p className="section-text">
            My goal is to create a community where gamers grow, enjoy, compete, and connect.
          </p>
          <p className="section-text highlight">
            Whether you want entertainment or inspiration — this channel brings it all together.
          </p>
          <p className="section-text cta">📌 Join the community and be part of something epic.</p>
        </section>

        {/* Contact Section */}
        <section className="content-section contact-section">
          <h3 className="section-title">📩 Contact Me</h3>
          <p className="section-text">
            Got a collaboration idea?<br/>
            Want your clips featured?<br/>
            Business inquiry?
          </p>
          <div className="contact-info">
            <p>📧 Email: <a href="mailto:contact@satanislive.com" className="contact-link">contact@satanislive.com</a></p>
            <p>📱 Instagram: <a href="https://www.instagram.com/satan_is_live?utm_source=qr&igsh=MmczNnIydzYxZG0w" target="_blank" rel="noopener noreferrer" className="contact-link">@satanislive</a></p>
            <p>🎮 Discord: <a href="https://discord.gg/XG6aRbMrCq" target="_blank" rel="noopener noreferrer" className="contact-link">Join Server</a></p>
            <p>▶️ YouTube: <a href="https://www.youtube.com/@SaittanIsLive" target="_blank" rel="noopener noreferrer" className="contact-link">youtube.com/@satanislive</a></p>
          </div>
          <p className="section-text small">I respond to genuine inquiries only.</p>
        </section>

        {/* Footer */}
        <footer className="home-footer">
          <p>© 2025 SatanIsLive Gaming. All Rights Reserved.</p>
          <p className="footer-tagline">Powered by Passion, Skill &amp; Pure Chaos.</p>
        </footer>
      </div>
    </>
  );
};

export default Home;