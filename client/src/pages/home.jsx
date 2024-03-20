import React, { useEffect, useState } from 'react';
import "../styles/app.css";
import Sidenav from "../components/navigation/Sidenav";
import Timeline from "../components/timeline/Timeline";
import Creation from '../components/creation/Creation';



const Home = () => {
    const [showCreateForm, setShowCreateForm] = useState(false);
    
    const handleOpen = (openChose) => {
        if(openChose === "create") setShowCreateForm(true);
        else setShowCreateForm(false);
    }

    return (
        <div className='page'>
            <div className="page_nav">
                <Sidenav openChose = {handleOpen}/>
            </div>
            <div className="page_main">
                <Timeline />
            </div>
            <div className="page_creation">
                {showCreateForm 
                    ? <Creation openChose = {handleOpen}/>
                    : null
                }
            </div>
        </div>
    );
}

export default Home;