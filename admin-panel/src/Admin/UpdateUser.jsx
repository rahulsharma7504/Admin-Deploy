import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../Styles/register.css';
import Swal from 'sweetalert2'
import { NavLink, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { BaseURL } from '../Screens/Secure';
const UpdateUser = () => {
    const navigate = useNavigate();
    const [userPhoto, setUserPhoto] = useState(null);
    const [spousePhoto, setSpousePhoto] = useState(null);
    const [message, setMessage] = useState('');
    
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        mobile: '',
        address: '',
        city: '',
        DOB: '',
        DOM: '',
        membershipID: '',
        businessPhone: '',
        businessEmail: '',
        businessAddress: '',
        occupation: '',
        classification: '',
        clubName: '',
    });

    

    const { id } = useParams()
    useEffect(()=>{
        getUserData()
    },[])

    const getUserData=async()=>{
        const res=await axios.get(`http://localhost:4000/users/update-user/${id}`)
        console.log( res.data)
        setUserData(res.data)
        
    }

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
        
    };
    // const validateForm = () => {
    //     // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     // const mobileRegex = /^\d{10}$/;

    //     // if (!emailRegex.test(userData.email) || !emailRegex.test(userData.businessEmail)) {
    //     //     Swal.fire({
    //     //         icon: 'error',
    //     //         title: 'Oops...',
    //     //         text: 'Something went wrong!',
    //     //         footer: 'Please enter a valid email address'
    //     //     })
    //     //     return false;
    //     // }

    //     if (!mobileRegex.test(userData.mobile) || !mobileRegex.test(userData.businessPhone)) {
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Oops...',
    //             text: 'Please enter a valid 10-digit mobile number',
    //         })
    //         return false;
    //     }

    //     return true;
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (!validateForm()) return;

        try {
            const formData = new FormData();
            for (const [key, value] of Object.entries(userData)) {
                formData.append(key, value);
            }
            if(userPhoto) {

                formData.append('userPhoto', userPhoto);
            } else if(spousePhoto){
                formData.append('spousePhoto', spousePhoto);

            }
           

            const res = await axios.put(`${BaseURL}/users/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res.data);
            setMessage(res.data.message);
            Swal.fire({
                icon:'success',
                title: message
                
            })
            Swal.fire('Success', 'User updated successfully', 'success');
            navigate('/admin')
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Failed to update user', 'error');
        }
    }
    
  return (
    <>
    <div className="container">
            <h1 className="text-center">Update User </h1>
            <form onSubmit={handleSubmit} className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            
                            value={userData.name}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="mobile">Mobile</label>
                        <input
                        required 
                        pattern="\d{1,10}"
                            type="number"
                            id="mobile"
                            name="mobile"
                           
                            value={userData.mobile}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            
                            value={userData.address}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            id="city"
                            
                            name="city"
                            value={userData.city}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="DOB">Date Of Birth</label>
                        <input
                            type="date"
                            id="DOB"
                            
                            name="DOB"
                            value={userData.DOB}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="DOM">Date Of Marriage</label>
                        <input
                            type="date"
                            id="DOM"
                            
                            name="DOM"
                            value={userData.DOM}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="classification">Classification</label>
                        <input
                            type="text"
                            id="classification"
                            
                            placeholder='Classification'
                            name="classification"
                            value={userData.classification}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="occupation">MembershipID</label>
                        <input
                            type="text"
                            id="occupation"
                            name="membershipID"
                            
                            value={userData.membershipID}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="occupation">Committee</label>
                        <input
                            type="text"
                            id="occupation"
                            name="committee"
                            
                            value={userData.committee}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="occupation">Desgination</label>
                        <input
                            type="text"
                            id="designation"
                            name="designation"
                            
                            value={userData.designation}
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
                            value={userData.businessName}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="businessPhone">Business Phone</label>
                        <input
                            type="number"
                            id="businessPhone"
                            
                            name="businessPhone"
                            value={userData.businessPhone}
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
                            value={userData.businessEmail}
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
                            value={userData.businessAddress}
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
                            
                            value={userData.occupation}
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
                            
                            value={userData.spouseName}
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
                            value={userData.clubName}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="userPhoto">User Photo</label>
                        <input
                            type="file"
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
                    <button type="submit">Edit</button>

                </div>
            </form>
            <div className="col-12 text-center">
                <p>Go to Dashboard <NavLink to="/admin">Dashboard</NavLink></p>
    
        </div>
        </div>
      
    </>
  )
}

export default UpdateUser
