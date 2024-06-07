import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/LandingPage.css';
import Pagination from '../Context/Pagination';

import '../Styles/search.css';
import { BaseURL } from './Secure';
const LandingPage = () => {
    const [DBit, setDBit] = useState(0);
    const [CBit, setCBit] = useState(0);
    const [NBit, setNBit] = useState(0);

    // for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Adjust the number of items per page

    // for users
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [usersforTable, setUsersforTable] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [birthdaysToday, setBirthdaysToday] = useState([]);
    const [anniversariesToday, setAnniversariesToday] = useState([]);
    const [basedOnDesgination, setBasedOnDesgination] = useState([]);



    useEffect(() => {
        getAllUsers();
    }, []);

    useEffect(() => {
        const today = new Date();
        const birthdays = [];
        const anniversaries = [];

        users.forEach((user) => {
            const birthDate = new Date(user.DOB);
            const anniversaryDate = new Date(user.DOM);

            if (today.getMonth() === birthDate.getMonth() && today.getDate() === birthDate.getDate()) {
                birthdays.push(user);
            }
            if (today.getMonth() === anniversaryDate.getMonth() && today.getDate() === anniversaryDate.getDate()) {
                anniversaries.push(user);
            }
        });

        setBirthdaysToday(birthdays);
        setAnniversariesToday(anniversaries);
    }, [users]);


    const getAllUsers = async () => {
        try {
            const res = await axios.get(`${BaseURL}/users/all`);
            setUsers(res.data.allUsers);
            setUsersforTable(res.data.allUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const filteredUsers = usersforTable.filter((user) =>
        user.committee.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.clubName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.mobile.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleID = (id) => {
        navigate(`/user-data/${id}`);
    };

    const handleSort = () => {
        if (DBit === 0) {
            setDBit(1);
            const sortedUsers = [...usersforTable].sort((a, b) => a.designation.localeCompare(b.designation));
            setUsersforTable(sortedUsers);
        } else if (DBit === 1) {
            setDBit(0);
            const reverseuser = [...usersforTable].reverse((a, b) => a.designation.localeCompare(b.designation));
            setUsersforTable(reverseuser);
        }


    };

    const handleSortByCommitee = () => {
        if (CBit === 0) {
            setCBit(1);
            const sortedUsers = [...usersforTable].sort((a, b) => a.committee.localeCompare(b.committee));
            setUsersforTable(sortedUsers);
        } else if (CBit === 1) {
            setCBit(0);
            const reverseuser = [...usersforTable].reverse((a, b) => a.committee.localeCompare(b.committee));
            setUsersforTable(reverseuser);
        }
    };

    const handleSortByName = () => {
        if (NBit === 0) {
            setNBit(1);
            const sortedUsers = [...usersforTable].sort((a, b) => a.name.localeCompare(b.name));
            setUsersforTable(sortedUsers);
        } else if (NBit === 1) {
            setNBit(0);
            const reverseuser = [...usersforTable].reverse((a, b) => a.name.localeCompare(b.name));
            setUsersforTable(reverseuser);
        }
    };

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Define the priority for each designation
    const designationPriority = {
        'President': 1,
        'Vice President': 2,
        'Secretary': 3,
        'Member': 4
        // Add more designations and their priorities here
    };



    return (
        <>
            <div className="container birthbox">
                <div className="row">
                    <div className="col-md-4 ">
                        {/* <p>Date: {moment(new Date()).format('DD-MM-YYYY')}</p> */}
                        <div className="birthdaycard border-warning mt-4">
                            <div className="card-body">
                                {birthdaysToday.length > 0 ? (
                                    birthdaysToday.map((user) => (
                                        <div key={user._id}>
                                            <p className='mt-5'>Happy Birthday <br /><u><b>{'Rtn.' + user.name}</b></u></p>
                                            <span>{user.clubName}</span><br />
                                            <b>Phone : </b><span style={{ cursor: 'pointer', color: 'black' }}>
                                                <a href={`https://wa.me/91${user.mobile}`} style={{ color: 'black', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">{user.mobile}</a>
                                            </span>
                                            <i className="fab fa-whatsapp" style={{ color: 'green', fontSize: '20px', marginLeft: '5px' }}></i>

                                            <div className="image-wrapper">
                                                <img src={user.userPhoto} alt="User 1" className="circular-image" />
                                            </div>


                                        </div>
                                    ))
                                ) : (
                                    <p>No Birthdays Today</p>
                                )}
                            </div>
                        </div>


                    </div>
                    <div className="col-md-4 offset-xs-3 offset-md-4 ">
                        <div className="birthdaycard border-warning mt-4">
                            <div className="card-body">
                                {anniversariesToday.length > 0 ? (
                                    anniversariesToday.map((user, index) => (
                                        <>
                                            <p key={user._id} className='mt-5'>  Happy Wedding Anniversary <br /><u><b>{'Rtn.' + user.name}</b></u> &<u><b> {user.spouseName}</b></u></p>
                                            <span>{user.clubName}</span><br />
                                            <b>Phone :  </b><span><a href={`https://wa.me/91${user.mobile}`} style={{ color: 'black', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">{user.mobile}</a>
                                            </span>
                                            <i className="fab fa-whatsapp" style={{ color: 'green', fontSize: '20px', marginLeft: '5px' }}></i>

                                            <div className="image-wrapper mb-5">
                                                <img src={user.userPhoto} alt="User 1" className="circular-image" />
                                                {
                                                    user.spousePhoto && (
                                                        
                                                        <img src={user.spousePhoto} alt="User 1" className="circular-image" />
                                                    )
                                                }
                                            </div>
                                        </>

                                    ))
                                ) : (
                                    <p>No Anniversaries Today</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <hr /><hr />
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
                        {/* Static Card 1 */}
                        <div className="col">
                            <div className="card StaticCard mx-auto">
                                <img src="https://rcmathuracentral.org/wp-content/uploads/2023/07/Neelesh-BG-copy.jpeg"
                                    className="card-img-top img-fluid rounded-circle static-img-large" alt="User" />
                                <div className="card-body text-center">
                                    <h5 className="card-title">Rtn. Neelesh Tentiwala</h5>
                                    <hr />
                                    <p className="card-text">District Governer</p>
                                    <p className="card-text">2024-25</p>
                                    <p className="card-text"> 9997813970</p>
                                </div>
                            </div>
                        </div>

                        {/* Static Card 2 */}
                        <div className="col">
                            <div className="card StaticCard mx-auto">
                                <img src="https://rcmathuracentral.org/wp-content/uploads/2023/09/Amit-Soneja.png"
                                    className="card-img-top img-fluid rounded-circle static-img" alt="User" />
                                <div className="card-body text-center">
                                    <h3 className="card-title">Rtn.Amit Soneja</h3>
                                    <hr />
                                    <p className="card-text">Chief of Defence Staff</p>
                                    <p className="card-text"> 9997813970</p>
                                </div>
                            </div>
                        </div>

                        {/* Static Card 3 */}
                        <div className="col">
                            <div className="card StaticCard mx-auto">
                                <img src="https://rcmathuracentral.org/wp-content/uploads/2023/09/Ashutosh-Garg.png"
                                    className="card-img-top img-fluid rounded-circle static-img" alt="User" />
                                <div className="card-body text-center">
                                    <h5 className="card-title">Rtn.Ashutosh Garg</h5>
                                    <hr />
                                    <p className="card-text">E.D.S</p>
                                    <p className="card-text"> 9997813970</p>
                                </div>
                            </div>
                        </div>

                        {/* Static Card 4 */}
                        <div className="col">
                            <div className="card StaticCard mx-auto">
                                <img src="https://rcmathuracentral.org/wp-content/uploads/2023/09/Neeraj-Sharma.png"
                                    className="card-img-top img-fluid rounded-circle static-img" alt="User" />
                                <div className="card-body text-center">
                                    <h5 className="card-title">Rtn.Neeraj Sharma</h5>
                                    <hr />
                                    <p className="card-text">Chief District Trainer</p>
                                    <p className="card-text"> 9997813970</p>
                                </div>
                            </div>
                        </div>

                        {/* Static Card 5 */}
                        <div className="col">
                            <div className="card StaticCard mx-auto">
                                <img src="https://rcmathuracentral.org/wp-content/uploads/2023/09/Piyush-Goyal.png"
                                    className="card-img-top img-fluid rounded-circle static-img" alt="User" />
                                <div className="card-body text-center">
                                    <h5 className="card-title">Rtn.Piyush Goyal</h5>
                                    <hr />
                                    <p className="card-text">District Rotary Foundation Committee</p>
                                    <p className="card-text"> 9997813970</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <hr />

            <div className="container">
                <div className="row">
                    <div className="col-12 mb-3">
                        <div className="input-wrapper">
                            <input
                                type="text"
                                placeholder="Search here..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                name="text"
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th className="thdata" onClick={handleSort}>Designation</th>
                                        <th className="thdata" onClick={handleSortByCommitee}>Committee</th>
                                        <th className="thdata" onClick={handleSortByName}>Name</th>
                                        <th className="thdata" onClick={handleSort}>Club-Name</th>
                                        <th className="thdata" onClick={handleSort}>Phone</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUsers.map((user, index) => (
                                        <tr key={user._id}>
                                            <td>{indexOfFirstItem + index + 1}</td>
                                            <td className="clickable" onClick={() => handleID(user._id)}>{user.designation}</td>
                                            <td className="clickable" onClick={() => handleID(user._id)}>{user.committee}</td>
                                            <td className="clickable" onClick={() => handleID(user._id)}>Rtn.{user.name}</td>
                                            <td>{user.clubName}</td>
                                            <td className="clickable"><a href={`tel:+91 ${user.mobile}`}>{user.mobile}</a></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};

export default LandingPage;
