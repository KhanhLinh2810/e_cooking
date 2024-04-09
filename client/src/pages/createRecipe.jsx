import React from 'react'
import Sidenav from '../components/navigation/Sidenav';
import CreateRecipe from '../components/creation/creation_recipe/Creation_Recipe';

const CreateRecipePage = () => {
    return (
        <div className="createpage">
            <div className="createpage_nav">
                <Sidenav />
            </div>
            <div className="createpage_create">
                <CreateRecipe />
            </div>
        </div>
    );
}

export default CreateRecipePage;