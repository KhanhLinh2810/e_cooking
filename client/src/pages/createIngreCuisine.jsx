import React from 'react'
import Sidenav from '../components/navigation/Sidenav';
import CreateIngreCuisine from '../components/creation/creation_ingre_cuisine/Creation_Ingre_Cuisine';

const CreateIngreCuisinePage = () => {
    return (
        <div className="createpage">
            <div className="createpage_nav">
                <Sidenav />
            </div>
            <div className="createpage_create">
                <CreateIngreCuisine />
            </div>
        </div>
    );
}

export default CreateIngreCuisinePage;