import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Layout.css';

function Layout({ children }) {
  const username = localStorage.getItem('user');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div>
      <header className="navbar">
        <h2>Campus Navigator</h2>
        <nav className="nav-links">
          {username && (
            <>
              <span className="welcome-msg">👋 {username}</span>
              <button className="logout-link" onClick={handleLogout}>Logout</button>
            </>
          )}
        </nav>
      </header>

      <main className="content">{children}</main>

      <footer className="footer">
        &copy; {new Date().getFullYear()} Campus Navigator System
      </footer>
    </div>
  );
}

export default Layout;