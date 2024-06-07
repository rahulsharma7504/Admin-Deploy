import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/Auth';
import '../Styles/Dashboard.css';
import moment from 'moment';
import { BaseURL } from '../Screens/Secure';

const Dashboard = () => {
  const { auth, setAuth } = useAuth();
  const [userData, setUserData] = useState('')
  useEffect(() => {

    getuserDetails();
  }, []);

  const UserId = JSON.parse(localStorage.getItem(('auth')))
  const id = UserId.user._id

  const getuserDetails = async () => {
    const response = await axios.get(`${BaseURL}users/details?id=${id}`);
    setUserData(response.data.user);

  }
  return (
    <>
      <div className="card-container">
        <div className="row offset-md-1">

          <div className="userData">
            <div className="image-container">
              <div className="image-item">
                <img src={userData.userPhoto} alt="User" className="profile-photo" />
                <p className="image-caption">{'Rtn.' + userData.name}</p>
              </div>
              {
                userData.spousePhoto &&
                  <div className="image-item">
                    <img src={userData.spousePhoto} alt="Spouse" className="profile-photo" />
                    <p className="image-caption">{userData.spouseName}</p>
                  </div>
                 
              }
             <br />
            </div><br />
            <div className="additional-info-container">
                        <p className="additional-info"><b>Committee:</b> {userData.committee}</p>
                        <p className="additional-info"><b>Designation:</b> {userData.designation}</p>
                        <p className="additional-info"><b>RID3110</b> </p>
                    </div>
                    <hr />

                    <div className="details-container">
                        <div className="card-body personal-details">
                            <h4>Personal Details</h4> <hr />

                            <p>Club-Name: <b>{userData.clubName ? userData.clubName:'---'}</b></p>
                            <p>Mobile: <b>{userData.mobile}</b></p>
                            <p>Date Of Birth: <b>{moment(userData.DOB).format('DD/MM/YYYY')}</b></p>
                            <p>Date Of Marriage:<b> {moment(userData.DOM).format('DD/MM/YYYY')}</b></p>
                            <p>Email:<b> {userData.email}</b></p>
                            <p>Address:<b> {userData.address}</b></p>
                            <p>City:<b> {userData.city}</b></p>
                            <p>Classification: <b>{userData.classification ? userData.classification : '--'}</b></p>
                            <p>Occupation:<b> {userData.occupation ? userData.occupation : '--'}</b></p>
                            <hr />
                        </div>
                        <div className="card-body business-details">
                            <h4>Business Details</h4><hr />
                            <p>Business Name:<b> {userData.businessName ? userData.businessName : '---'}</b></p>
                            <p>Business Email: <b>{userData.email ? userData.email : '----'}</b></p>
                            <p>Business Address: <b>{userData.businessAddress ? userData.businessName : '----'}</b></p>
                        </div>
                    </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Dashboard
