import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Participate from './components/Participate';
import WinnerReveal from './components/WinnerReveal';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function App() {

  return (
    <Router>
      <div className="App fade-in">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <Home />
            </>
          } />
          <Route path="/participate" element={<Participate />} />
          <Route path="/winner-reveal" element={<WinnerReveal />} />
          <Route path="/admin-satty-dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;