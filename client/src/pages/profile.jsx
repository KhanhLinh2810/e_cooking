import React from 'react';
import "../styles/app.css";
import { useParams } from 'react-router-dom';
import Sidenav from '../components/navigation/Sidenav';
import Profile from '../components/profile/Profile';

const ProfilePage = () => {
    const {username} = useParams();    

    return (
        <div className="page">
            <div className="page_nav">
                <Sidenav />
            </div>
            <div className="page_main">
                <Profile username = {username} />
            </div>
        </div>
    );
}

export default ProfilePage;