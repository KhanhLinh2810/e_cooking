import React, { useEffect, useState } from 'react';
import "../styles/home.css";
import Sidenav from "../components/navigation/Sidenav";
import Timeline from "../components/timeline/Timeline";
import Creation from '../components/creation/Creation';



const Home = () => {
    const [timeline, setTimeline] = useState(true)

    const handleOpen = (openChose) => {
        setTimeline(openChose)
    }

    return (
        <div className='homepage'>
            <div className="homepage_nav">
                <Sidenav openChose = {handleOpen}/>
            </div>
            <div className="homepage_timeline">
                { timeline 
                    ? <Timeline />
                    : <Creation />
                }
            </div>
        </div>
    );
}

export default Home;