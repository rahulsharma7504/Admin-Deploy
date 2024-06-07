import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/Auth';
import Swal from 'sweetalert2';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../Styles/Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  const logout = async () => {
    setAuth({
      token: '',
      user: ''
    });
    localStorage.removeItem('auth');
    navigate('/login');

    Toast.fire({
      icon: 'success',
      title: 'Log-Out Successfully'
    });
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">RID 3110</NavLink>
        <button 
          className={`navbar-toggler ${isOpen ? 'open' : ''}`} 
          type="button" 
          aria-controls="navbarNav" 
          aria-expanded={isOpen} 
          aria-label="Toggle navigation" 
          onClick={toggleNavbar}
        >
          <span className={`navbar-toggler-icon ${isOpen ? 'd-none' : ''}`}></span>
          <i className={`fa fa-close close-icon ${isOpen ? '' : 'd-none'}`}></i>
        </button>
        <div className={`collapse  navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav m-auto">
           
            {auth.token ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" onClick={logout} to="/login">Log Out</NavLink>
                </li>
                {auth.user && auth.user.isAdmin && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/create-user">Create New</NavLink>
                  </li>
                )}
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">Register</NavLink>
                </li>
              </>
            )}
          </ul>
          {/* <form className="form-inline my-2 my-lg-0 ml-auto">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form> */}
        </div>
      </div>
    </nav>
  );
};

export default Header;
