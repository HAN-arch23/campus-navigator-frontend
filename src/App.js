// src/App.js
import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import HomePage from './components/HomePage';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';
import LoginPage from './components/LoginPage';
import AdminPanel from './components/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';
import './PageTransition.css';

const AnimatedRoutes = () => {
  const location = useLocation();
  const nodeRef = useRef(null); // Ref for CSSTransition

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.pathname}
        classNames="fade"
        timeout={300}
        nodeRef={nodeRef}
        unmountOnExit
      >
        <div ref={nodeRef}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/book" element={<BookingForm />} />
            <Route path="/bookings" element={<BookingList />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminPanel /></ProtectedRoute>} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;