// src/components/RoomList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookingModal from './BookingModal';
import BackButton from './BackButton';
import './RoomList.css';

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get('/api/rooms')
      .then(res => setRooms(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleBookClick = (room) => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedRoom(null);
    setShowModal(false);
  };

  const handleBooking = async (bookingData) => {
    try {
      await axios.post('/api/bookings', bookingData);
      alert('Room booked successfully!');
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Failed to book room.');
    }
  };

  return (
    <div className="roomlist-container">
      <BackButton />
      <h2 className="roomlist-title">Available Rooms</h2>
      <div className="roomlist-grid">
        {rooms.map(room => (
          <div className="room-card" key={room._id}>
            <h3>{room.name}</h3>
            <p>Capacity: {room.capacity}</p>
            <p>Location: {room.location}</p>
            <button className="book-btn" onClick={() => handleBookClick(room)}>Book</button>
          </div>
        ))}
      </div>

      {showModal && selectedRoom && (
        <BookingModal
          room={selectedRoom}
          onClose={handleCloseModal}
          onBook={handleBooking}
        />
      )}
    </div>
  );
}

export default RoomList;