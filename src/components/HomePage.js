// src/components/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  const backgroundStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/campus.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={backgroundStyle}>
      <div className="overlay">
        <BackButton />
        <h1 className="homepage-title">🎓 Campus Navigator Booking System</h1>
        <p className="homepage-subtitle">Book rooms. View schedules. Simplify campus navigation.</p>
        <div className="homepage-links">
          <button className="homepage-button" onClick={() => navigate('/book')}>Book a Room</button>
          <button className="homepage-button" onClick={() => navigate('/bookings')}>View Bookings</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;