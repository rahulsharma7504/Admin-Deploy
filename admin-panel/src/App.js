import React, { useState, useEffect } from 'react';
import Register from "./Components/Register"
import { BrowserRouter as Router, Switch, Route, Routes, Navigate, NavLink } from 'react-router-dom';
import NotFound from './Screens/NotFound';
import Login from './Components/Login';
import { useAuth } from './Context/Auth';
import Header from './Screens/Header';
import Dashboard from './Components/Dashboard';
import AdminDashboard from './Admin/AdminDashboard';
import CreateUser from './Admin/CreateUser';
import UpdateUser from './Admin/UpdateUser';
import GetUser from './Admin/GetUser';
import LandingPage from './Screens/LandingPage';
import UserData from './Screens/UserData';
import Footer from './Components/Footer';
import PaginationOutlined from './Components/CheckMUI';
function App() {
  const {auth,setAuth}=useAuth()
  return (
   <>
    <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} /> 
          <Route path="/check" element={<PaginationOutlined />} />

          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={
              auth.token ? (
                <Navigate to={auth.user.isAdmin ? "/admin" : "/dashboard"} replace />
              ) : (
                <Login />
              )
            }
          />

          {auth.user.isAdmin ? (
            <>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/create-user" element={<CreateUser />} />
              <Route path="/admin/getuser/:id" element={<GetUser />} />
              <Route path="/admin/update/:id" element={<UpdateUser />} />
            </>
          ) : (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/user-data/:id" element={<UserData />} />
            </>
          )}

          {/* Fallback Route */}
          {!auth.token && <Route path="*" element={<Navigate to="/login" replace />} />}
        </Routes>
        <Footer/>
      </Router>
   </>

  );
}

export default App;
