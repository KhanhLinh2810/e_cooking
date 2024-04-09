import React, { useEffect, useState } from 'react';
import "../styles/app.css";
import Sidenav from "../components/navigation/Sidenav";
import Timeline from "../components/timeline/Timeline";

const Home = () => {
    return (
        <div className='page'>
            <div className="page_nav">
                <Sidenav />
            </div>
            <div className="page_main">
                <Timeline />
            </div>
        </div>
    );
}

export default Home;