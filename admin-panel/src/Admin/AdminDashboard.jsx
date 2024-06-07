// const dotenv=require('dotenv').config()
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import '../Styles/AdminDashboard.css'; 
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BaseURL } from '../Screens/Secure';

const API_BASE_URL = BaseURL;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${API_BASE_URL}/users/all`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setUsers(res.data.allUsers);
      setError(null);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users. Please try again.');
      toast.error('Failed to fetch users.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleUserView = useCallback((id) => {
    navigate(`/admin/getuser/${id}`);
  }, [navigate]);

  const toggleUserStatus = useCallback(async (user) => {
    const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
    try {
      await axios.put(`${API_BASE_URL}/users/status/${user._id}`, 
        { status: newStatus }
      );
      setUsers(prevUsers => prevUsers.map(u => 
        u._id === user._id ? { ...u, status: newStatus } : u
      ));
      toast.success(`User status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error('Failed to update user status.');
    }
  }, []);

  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <table className="table table-responsive table-striped table-hover">
        <thead className="thead-light">
          <tr>
            <th>#</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>DOB</th>
            <th>Address</th>
            <th>City</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td data-label="#">{index + 1}</td>
              <td data-label="Photo">
                <img src={user.userPhoto} alt={`${user.name}'s photo`} className="Dprofile-photo" />
              </td>
              <td data-label="Name">{user.name}</td>
              <td data-label="Mobile">{user.mobile}</td>
              <td data-label="DOB">{user.DOB}</td>
              <td data-label="Address" title={user.address}>
                {user.address.substring(0, 20)}...
              </td>
              <td data-label="City">{user.city}</td>
              <td data-label="Status">
                <button 
                  className={`btn btn-sm ${user.status === 'Active' ? 'btn-success' : 'btn-warning'}`}
                  onClick={() => toggleUserStatus(user)}>
                  {user.status}
                </button>
              </td>
              <td data-label="Action">
                <button 
                  className="btn btn-primary" 
                  onClick={() => handleUserView(user._id)}
                >
                  View More
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminDashboard;