// src/components/BookingModal.js
import React, { useState } from 'react';
import './BookingModal.css';

function BookingModal({ room, onClose, onBook }) {
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [user, setUser] = useState(localStorage.getItem('user') || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !timeSlot || !user) return;
    onBook({ roomId: room._id, date, timeSlot, user });
    onClose(); // close modal after booking
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Book {room.name}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Date:
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </label>

          <label>
            Time Slot:
            <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} required>
              <option value="">Select</option>
              <option>08:00AM - 10:00AM</option>
              <option>10:00AM - 12:00PM</option>
              <option>12:00PM - 02:00PM</option>
              <option>02:00PM - 04:00PM</option>
            </select>
          </label>

          <label>
            Name:
            <input type="text" value={user} onChange={(e) => setUser(e.target.value)} required />
          </label>

          <div className="modal-buttons">
            <button type="submit" className="book-btn">Book</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingModal;