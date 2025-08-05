import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from './BackButton';
import './BookingList.css';

function BookingList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    axios.get('http://localhost:5000/api/bookings')
      .then(res => {
        const sorted = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setBookings(sorted);
      })
      .catch(err => console.error('Error fetching bookings:', err));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await axios.delete(`http://localhost:5000/api/bookings/${id}`);
        fetchBookings(); // Refresh list after deletion
      } catch (err) {
        console.error('Failed to delete booking:', err);
      }
    }
  };

  return (
    <div className="booking-list-container">
      <BackButton />
      <h2 className="booking-list-title">All Room Bookings</h2>
      <table className="booking-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Room</th>
            <th>Date</th>
            <th>Time Slot</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.user}</td>
              <td>{booking.room?.name || 'N/A'}</td>
              <td>{new Date(booking.date).toLocaleDateString()}</td>
              <td>{booking.timeSlot}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(booking._id)}
                >
                  ❌ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookingList;