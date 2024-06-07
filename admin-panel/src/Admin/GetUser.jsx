import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment'
import { BaseURL } from '../Screens/Secure';
const GetUser = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const { id } = useParams()
    useEffect(() => {
        getOneUser();

    }, [])
    const getOneUser = async () => {
        const res = await axios.get(`${BaseURL}/users/getuser/${id}`);
        setUser(res.data)
        console.log(res.data)

    }
    const handleUpdate = (id) => {
        navigate(`/admin/update/${id}`)

    }
    return (
        <>
            <hr />

            <div className="card-container ">
                <div className="row offset-1">

                    <div className="userData">
                        <div className="image-container">
                            <div className="image-item">
                                <img src={user.userPhoto} alt="User" className="profile-photo" />
                                <p className="image-caption">{'Rtn.' + user.name}</p>
                            </div>
                            {
                                user.spousePhoto && <div className="image-item">
                                    <img src={user.spousePhoto} alt="Spouse" className="profile-photo" />
                                    <p className="image-caption">{user.spouseName}</p>
                                </div>
                            }

                        </div>
                        <div className="additional-info-container">
                            <p className="additional-info"><b>Committee:</b> {user.committee}</p>
                            <p className="additional-info"><b>Designation:</b> {user.designation}</p>
                            <p className="additional-info"><b>RID3110</b> </p>
                        </div>
                        <hr />
                        <div className="details-container">
                            <div className="card-body personal-details">
                                <h4>Personal Details</h4><hr />
                                <p><b>Club-Name</b>: {user.clubName}</p>
                                <p><b>Mobile</b>: {user.mobile}</p>
                                <p><b>Date Of Birth</b>: {moment(user.DOB).format('DD/MM/YYYY')}</p>
                                <p><b>Date Of Marriage</b>: {moment(user.DOM).format('DD/MM/YYYY')}</p>
                                <p><b>Email</b>: {user.email}</p>
                                <p><b>Address</b>: {user.address}</p>
                                <p><b>City</b>: {user.city}</p>
                                <p><b>Classification</b>: {user.classification}</p>
                                <p><b>Occupation</b>: {user.occupation}</p>
                                <hr />
                                <button className='btn btn-success' style={{ width: '10rem' }} onClick={() => handleUpdate(user._id)}>Edit</button>

                            </div>
                            <div className="card-body business-details">
                                <h4>Business Details</h4><hr />
                                <p><b>Business Name</b>: {user.businessName ? user.businessName : '---'}</p>
                                <p><b>Business Address</b>: {user.businessAddress}</p>
                                <p><b>City</b>: {user.city}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default GetUser
