import React from 'react'
import "./header.css"

function HeaderProfile({user, numberRecipes}) {
    return (
        <div className="header">
            <div className="profile_img">
                <div className="avatar">{user.avatar}</div>
            </div>
            <div className="profile_info">
                <h2>{user.username}</h2>
                <h5>{numberRecipes} recipes</h5>
                <h5>{user.firstName} {user.lastName}</h5>
            </div>
        </div>
    );
}

export default HeaderProfile;