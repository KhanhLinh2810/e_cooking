import React from 'react';
import "../styles/home.css";
import Sidenav from "../components/navigation/Sidenav";
import Timeline from "../components/timeline/Timeline";


const Home = () => {
    return (
        <div className='homepage'>
            <div className="homepage_nav">
                <Sidenav />
            </div>
            <div className="homepage_timeline">
                <Timeline />
            </div>
        </div>
    );
}

export default Home;