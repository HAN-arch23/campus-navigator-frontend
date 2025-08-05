import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './Layout';
import './AdminPanel.css';

function AdminPanel() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/bookings');
      setBookings(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      setBookings(prev => prev.filter(b => b._id !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <Layout>
      <div className="admin-panel">
        <h2>Admin Panel - All Bookings</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="admin-table">
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
                  <td>{booking.room?.name}</td>
                  <td>{booking.date}</td>
                  <td>{booking.timeSlot}</td>
                  <td>
                    <button onClick={() => handleDelete(booking._id)} className="delete-btn">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}

export default AdminPanel;