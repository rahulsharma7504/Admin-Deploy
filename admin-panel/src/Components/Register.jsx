import React, { useState } from 'react';
import '../Styles/register.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { NavLink, useNavigate } from 'react-router-dom';
import { BaseURL } from '../Screens/Secure';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [userPhoto, setUserPhoto] = useState(null);
    const [spousePhoto, setSpousePhoto] = useState(null);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobile: '',
        address: '',
        city: '',
        DOB: '',
        DOM: '',
        businessPhone: '',
        businessEmail: '',
        businessAddress: '',
        occupation: '',
        classification: '',
        designation: '',
        committee: '',
        clubName: '',
        spouseName: '',
        businessName: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;
    
        // Required fields
        const requiredFields = ['name', 'email', 'password', 'mobile', 'address', 'city', 'DOB', 'designation'];
        requiredFields.forEach(field => {
            if (!formData[field]) {
                formErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
                isValid = false;
            }
        });
    
        // Email format
        if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/)) {
            formErrors.email = 'Invalid email format';
            isValid = false;
        }
    
        // Mobile number format
        if (!formData.mobile.match(/^\d{10}$/)) {
            formErrors.mobile = 'Mobile number must be 10 digits';
            isValid = false;
        }
    
       
    
        // Date validations
        if (!formData.DOB) {
            formErrors.DOB = 'Date of Birth is required';
            isValid = false;
        }
    
        if (formData.DOB && formData.DOM && new Date(formData.DOM) < new Date(formData.DOB)) {
            formErrors.DOM = 'Date of Marriage cannot be before Date of Birth';
            isValid = false;
        }
    
        // Business phone number format (if provided)
        if (formData.businessPhone && !formData.businessPhone.match(/^\d{10}$/)) {
            formErrors.businessPhone = 'Business phone number must be 10 digits';
            isValid = false;
        }
    
        setErrors(formErrors);
    
        // Display specific error messages
        if (Object.keys(formErrors).length > 0) {
            let errorMessage = 'Please fix the following errors:\n';
            for (let key in formErrors) {
                errorMessage += `- ${formErrors[key]}\n`;
            }
            Swal.fire({
                icon: 'error',
                title: 'Form Validation Failed',
                text: errorMessage,
            });
        }
    
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) {
            return;
        }
    
        const formDataToSubmit = new FormData();
        for (const [key, value] of Object.entries(formData)) {
            formDataToSubmit.append(key, value);
        }
    
        if (userPhoto) {
            formDataToSubmit.append('userPhoto', userPhoto);
        }
        if (spousePhoto) {
            formDataToSubmit.append('spousePhoto', spousePhoto);
        }
    
        try {
            const res = await axios.post(`${BaseURL}/users/register`, formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Response:', res);
    
            setMessage(res.data.message);
            if (res.data.userData) {
                Swal.fire({
                    title: 'User Registered Successfully',
                    icon: 'success',
                    timer: 1500
                });
    
                navigate('/login');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            const errorMessage = error.response && error.response.data
                ? error.response.data.message
                : 'An unexpected error occurred';
    
            setMessage(errorMessage);
            Swal.fire({
                title: 'Error',
                text: errorMessage,
                icon: 'error',
                timer: 1500
            });
        }
    };
    

    return (
        <>
            <div className="container">
                <h1 className="text-center">User Register Form</h1>
                <form onSubmit={handleSubmit} className="row form-container">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"name="name" required value={formData.name} 
                                onChange={handleChange} className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                required
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control"
                            />
                            {errors.email && <p className="text-danger">{errors.email}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                required
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobile">Mobile</label>
                            <input
                                type="text"
                                id="mobile"
                                required
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                className="form-control"
                            />
                            {errors.mobile && <p className="text-danger">{errors.mobile}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                required
                                value={formData.address}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City Name</label>
                            <input
                                type="text"
                                id="city"
                                required
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="DOB">Date Of Birth</label>
                            <input
                                type="date"
                                id="DOB"
                                required
                                name="DOB"
                                value={formData.DOB}
                                onChange={handleChange}
                                className="form-control"
                            />
                            {errors.DOB && <p className="text-danger">{errors.DOB}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="DOM">Date Of Marriage</label>
                            <input
                                type="date"
                                id="DOM"
                                name="DOM"
                                value={formData.DOM}
                                onChange={handleChange}
                                className="form-control"
                            />
                            {errors.DOM && <p className="text-danger">{errors.DOM}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="classification">Classification</label>
                            <input
                                type="text"
                                id="classification"
                                placeholder='classification'
                                name="classification"
                                value={formData.classification}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="classification">Designation</label>
                            <input
                                type="text"
                                id="designation"
                                required
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                className="form-control"
                                placeholder='Designation'
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="committee">committee</label>
                            <input
                                type="text"
                                id="committee"
                                name="committee"
                                placeholder='Committee'
                                value={formData.committee}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="businessName">Business Name</label>
                            <input
                                type="text"
                                id="businessName"
                                name="businessName"
                                value={formData.businessName}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="businessPhone">Business Phone</label>
                            <input
                                type="number"
                                maxLength={10}
                                id="businessPhone"
                                name="businessPhone"
                                value={formData.businessPhone}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="businessEmail">Business Email</label>
                            <input
                                type="email"
                                id="businessEmail"
                                name="businessEmail"
                                value={formData.businessEmail}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="businessAddress">Business Address</label>
                            <input
                                type="text"
                                id="businessAddress"
                                name="businessAddress"
                                value={formData.businessAddress}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="occupation">Occupation</label>
                            <input
                                type="text"
                                id="occupation"
                                name="occupation"
                                value={formData.occupation}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="spouseName">Spouse Name</label>
                            <input
                                type="text"
                                id="spouseName"
                                name="spouseName"
                                value={formData.spouseName}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="clubName">Club Name</label>
                            <input
                                type="text"
                                id="clubName"
                                name="clubName"
                                value={formData.clubName}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="userPhoto">User Photo</label>
                            <input
                                type="file"
                                required
                                id="userPhoto"
                                name="userPhoto"
                                onChange={(e) => {
                                    setUserPhoto(e.target.files[0]);
                                    console.log(e.target.files[0]);
                                }}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="spousePhoto">Spouse Photo</label>
                            <input
                                type="file"
                                id="spousePhoto"
                                name="spousePhoto"
                                onChange={(e) => setSpousePhoto(e.target.files[0])}
                                className="form-control"
                            />
                        </div>
                    </div>

                    <div className="col-12 text-center">
                        <button type="submit">Register</button>
                    </div>
                </form>
                <div className="col-12 text-center">
                    <p>Already have an account? <NavLink to="/login">Login</NavLink></p>
                </div>
            </div>
        </>
    );
};

export default RegisterForm;
