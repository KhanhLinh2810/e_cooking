import React from 'react'
import '../styles/create.css'
import Sidenav from '../components/navigation/Sidenav';
import CreateIngre from '../components/creation/CreationIngre';

const CreateIngrePage = () => {
    return (
        <div className="createpage">
            <div className="createpage_nav">
                <Sidenav />
            </div>
            <div className="createpage_create">
                <CreateIngre />
            </div>
        </div>
    );
}

export default CreateIngrePage;