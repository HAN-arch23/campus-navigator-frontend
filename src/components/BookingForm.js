import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './Layout'; // Assuming you have a Layout component for consistent styling
import './BookingForm.css';
import BackButton from './BackButton';
import { FaCheck } from 'react-icons/fa';

function BookingForm() {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    roomId: '',
    user: '',
    date: '',
    timeSlot: '',
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/rooms')
      .then(res => setRooms(res.data))
      .catch(err => console.error('Error fetching rooms:', err));
  }, []);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/bookings', formData);
      setStatus(`✅ Booking confirmed: ${res.data.room.name} on ${res.data.date}`);
      setFormData({ roomId: '', user: '', date: '', timeSlot: '' });
    } catch (error) {
      console.error('Booking error:', error);
      setStatus('❌ Booking failed. Please try again.');
    }
  };

  return (
    <Layout>
    <div className="booking-form-container">
      <BackButton />
      <h2 className="form-title">Room Booking Form</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <label>User Name</label>
        <input
          type="text"
          name="user"
          value={formData.user}
          onChange={handleChange}
          required
        />

        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label>Time Slot</label>
        <select
          name="timeSlot"
          value={formData.timeSlot}
          onChange={handleChange}
          required
        >
          <option value="">Select a time slot</option>
          <option>8:00AM - 10:00AM</option>
          <option>10:00AM - 12:00PM</option>
          <option>1:00PM - 3:00PM</option>
          <option>3:00PM - 5:00PM</option>
        </select>

        <label>Select Room</label>
        <select
          name="roomId"
          value={formData.roomId}
          onChange={handleChange}
          required
        >
          <option value="">Select a room</option>
          {rooms.map(room => (
            <option key={room._id} value={room._id}>
              {room.name}
            </option>
          ))}
        </select>
<button type="submit" className="booking-submit">
  <FaCheck style={{ marginRight: '6px' }} />
  Book Room
</button>
        {status && <p className="status-message">{status}</p>}
      </form>
    </div>
    </Layout>
  );
}

export default BookingForm;