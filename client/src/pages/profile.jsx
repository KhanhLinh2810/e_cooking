import React from 'react';
import "../styles/app.css";
import Sidenav from '../components/navigation/Sidenav';
import Profile from '../components/profile/Profile';

const ProfilePage = () => {    
    return (
        <div className="page">
            <div className="page_nav">
                <Sidenav />
            </div>
            <div className="page_main">
                <Profile/>
            </div>
        </div>
    );
}

export default ProfilePage;