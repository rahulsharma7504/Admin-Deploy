import React, { useState } from 'react';
import '../Styles/register.css';
import axios from 'axios';
import Swal from 'sweetalert2'
import { NavLink, useNavigate } from 'react-router-dom';
import { BaseURL } from '../Screens/Secure';

const CreateUser = () => {
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
        classification:'',
        designation:'',
        committee:'',
        clubName: '',
    });

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        if (!formData.email.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)) {
            formErrors.email = 'Invalid email format';
            isValid = false;
        }

        if (!formData.mobile.match(/^\d{10}$/)) {
            formErrors.mobile = 'Mobile number must be 10 digits';
            isValid = false;
        }

        if (!formData.DOB) {
            formErrors.DOB = 'Date of Birth is required';
            isValid = false;
        }

       

        if (formData.DOB && formData.DOM && new Date(formData.DOM) < new Date(formData.DOB)) {
            formErrors.DOM = 'Date of Marriage cannot be before Date of Birth';
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('name', formData.name);
        formDataToSubmit.append('email', formData.email);
        formDataToSubmit.append('password', formData.password);
        formDataToSubmit.append('mobile', formData.mobile);
        formDataToSubmit.append('address', formData.address);
        formDataToSubmit.append('city', formData.city);
        formDataToSubmit.append('DOB', formData.DOB);
        formDataToSubmit.append('DOM', new Date(formData.DOM).getMonth()+1);
        formDataToSubmit.append('businessName', formData.businessName);
        formDataToSubmit.append('businessPhone', formData.businessPhone);
        formDataToSubmit.append('businessEmail', formData.businessEmail);
        formDataToSubmit.append('businessAddress', formData.businessAddress);
        formDataToSubmit.append('occupation', formData.occupation);
        formDataToSubmit.append('classification', formData.classification);
        formDataToSubmit.append('designation', formData.designation);
        formDataToSubmit.append('committee', formData.committee);
        formDataToSubmit.append('spouseName', formData.spouseName);
        formDataToSubmit.append('clubName', formData.clubName);

        if (userPhoto) {
            formDataToSubmit.append('userPhoto', userPhoto);
        }
        if (spousePhoto) {
            formDataToSubmit.append('spousePhoto', spousePhoto);
        }

        // Log the formDataToSubmit object to the console
        for (const [key, value] of formDataToSubmit.entries()) {
            console.log(`${key}: ${value}`);
        }
        try {

            const res = await axios.post(`${BaseURL}/admin/create-user`, formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage(res.data.message);
            if (res.data.userData) {
                Swal.fire({
                    title: 'User Created Successfully',
                    icon: 'success',
                    timer: 1500
                })

                navigate('/admin')
              }

            
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.message); // Handle error message
                Swal.fire({
                    error: error,
                    title:error.response.data
                })
              } else {
                setMessage('An unexpected error occurred');
              }
            console.log(error);
            Swal.fire({
                title:error.response.data.message,
                icon: 'error',
                timer: 1500
            })

        }
    };

    return (
        <>
            <div className="container">
            <h1 className="text-center">Create User Panel</h1>
            <form onSubmit={handleSubmit} className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                        required
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-control"
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
                            placeholder='Classification'
                            name="classification"
                            value={formData.classification? formData.classification : ''}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                            <label htmlFor="classification">Designation</label>
                            <input
                                type="text"
                                id="designation"
                                name="designation"
                                value={formData.designation ? formData.designation : ''}
                                onChange={handleChange}
                                className="form-control"
                                placeholder='Designation'
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="committee">Committee</label>
                            <input
                                type="text"
                                id="committee"
                                name="committee"
                                placeholder='Committee'
                                value={formData.committee ? formData.committee: ''}
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
                            value={formData.businessName ? formData.businessName: ''}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="businessPhone">Business Phone</label>
                        <input
                            type="text"
                            id="businessPhone"
                            name="businessPhone"
                            value={formData.businessPhone?formData.businessPhone:''}
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
                            value={formData.businessAddress? formData.businessAddress:''}
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
                            value={formData.occupation? formData.occupation:''}
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
                    <button type="submit">Create-User</button>

                </div>
            </form>
            <div className="col-12 text-center">
              <NavLink to="/admin"><p>Go to admin panel</p></NavLink>
    
        </div>
        </div>
        </>

    );
};

export default CreateUser;