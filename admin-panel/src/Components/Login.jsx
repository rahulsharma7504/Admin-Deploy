import React, { useState } from 'react'
import { useAuth } from '../Context/Auth'
import axios from 'axios'
import Swal from 'sweetalert2'
import { NavLink, useNavigate } from 'react-router-dom'
import bannerImage from '../Styles/registerImage.jpg';
import '../Styles/Login.css';
import { BaseURL } from '../Screens/Secure'
const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

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
  const [data, setData] = useState({
    email: "",
    password: ""
  })


  const { auth, setAuth } = useAuth();

  const handelSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`${BaseURL}/users/login`, data);
      setMessage(res.data.message);
      if(res.status==200){
        Swal.fire({
          icon:'success',
          title: message
        })
      }
     
      const { token, user } = res.data
      setAuth({ ...auth, token, user });
      localStorage.setItem('auth', JSON.stringify(res.data));
      Toast.fire({
        icon: 'success',
        title: 'Login Sussessfully'
      })



    } catch (error) {

      console.log(error)
      setMessage(error.response.data.message);
      Swal.fire({
        icon: 'error',
        title: error.response.data.message
      })
      console.log(error.response.data.message)


    }

    //

  }
  return (
    <>
      <div className="login-container">
      <div className="login-row row">
        <div className="login-form col-md-6">
          <form onSubmit={handelSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                onChange={(e) => setData({ ...data, password: e.target.value })}
                name="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <button type="submit" className="btn btn-primary submit-button">
              Submit
            </button>
          </form>
        </div>
        <div className="login-image col-md-6">
          <img src={bannerImage} alt="Login Image" className="img-fluid" />
        </div>
      </div>
      <div>
        <p className="text-center mb-3 login-links">
          Don't have an account? <NavLink to="/register">Register</NavLink>
        </p>
      </div>
    </div>

    </>
  )
}

export default Login
