import React, { useEffect, useState } from 'react';
import "./Sidenav.css"
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

function Sidenav({openChose}) {
    const [open, setOpen] = useState();
    const [user, setUser] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false)
    const navigate = useNavigate();

    useEffect( () => {
        const token = Cookies.get('token')
        if(token) {
            setLoggedIn(true);
            fetchUser(token);
        }
    }, [])

    const fetchUser = async (token) => {
        await axios.get('http://localhost:5000/api/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            setUser(res.data);
        }).catch(err => {
            console.log(err);
        })
        
    }

    const handleLogout = async () => {
        const token = Cookies.get('token');
        await axios.post('http://localhost:5000/api/logout', {
            token: token
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            Cookies.remove('token');
            navigate('/login');
        }).catch(err => {
            console.log(err);
        })
        
    }

    return (
        <div className="sidenav" >
            <h2 className='sidenav_logo'>ECooking</h2>
            <div className="sidenav_buttons">
                <button className="sidenav_button" onClick={() => openChose(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                        <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
                    </svg>
                    <span>Home</span>
                </button>
                <button className="sidenav_button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search-heart" viewBox="0 0 16 16">
                        <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018"/>
                        <path d="M13 6.5a6.47 6.47 0 0 1-1.258 3.844q.06.044.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11"/>
                    </svg>
                    <span>Search</span>
                </button>
                <button className="sidenav_button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
                    </svg>
                    <span>Announcement</span>
                </button>
                <button className="sidenav_button" onClick={() => openChose(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                    <span>Create</span>
                </button>
                { loggedIn && (
                    <button className="sidenav_button">
                        <div className="sidenav_avatar">{user.avatar}</div>
                        <span>Profile</span>
                    </button>
                )}
            </div>
            <div className="sidenav_more">
                { open && (
                    <div className="dropupMore">
                        <ul>
                            <li>Setting</li>
                            { loggedIn &&
                                <li onClick={ handleLogout }>Logout</li>
                            }
                        </ul>
                    </div>
                )}
                <button className="sidenav_button" onClick={() => setOpen(!open)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                    </svg>
                    <span>More</span>
                </button>
            </div>
        </div>
    );
}


export default Sidenav;