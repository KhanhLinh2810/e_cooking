import React from 'react'
import '../styles/create.css'
import Sidenav from '../components/navigation/Sidenav';
import Creation from '../components/creation/Creation';

const Create = () => {
    return (
        <div className="createpage">
            <div className="createpage_nav">
                <Sidenav />
            </div>
            <div className="createpage_create">
                <Creation />
            </div>
        </div>
    );
}

export default Create;