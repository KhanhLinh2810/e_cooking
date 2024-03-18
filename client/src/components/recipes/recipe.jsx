import React, { useEffect, useState } from 'react'
import "./Recipe.css"
import axios from 'axios';

const Recipe = ({userId, recipeName, recipeImage, likes, timestamp}) => {
    const [user, setUser] = useState([]);

    useEffect( () => {
        fetchUser(userId);
    }, []);

    const fetchUser = async (userId) => {
        await axios.get(`http://localhost:5000/api/user/${userId}`)
        .then( res => {
            setUser(res.data)
        }).catch( err => {
            console.log(err)
            alert("Failed to find User post recipe: " + recipeName);
        })
    }

    return (
        <div className="recipe">
            <div className="recipe_header">
                <div className="recipe_headerAuthor">
                    <div className="avatar">{user.avatar}</div>
                    <span className='username'>{user.username}</span><span>.</span><time>{timestamp}</time>
                </div>
                <div className="recipe_name">
                    <h3>{recipeName}</h3>
                </div>
            </div>
            <div className="recipe_img">
                <img src={recipeImage} alt="" />
            </div>
            <div className="recipe_footer">
                <div className="recipe_footerIcons">
                    <div className="recipe_iconsMain">
                        <div className="recipeIcon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                            </svg>
                        </div>
                        <div className="recipeIcon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                            </svg>
                        </div>
                    </div>
                    <div className="recipe_iconSave recipeIcon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
                        </svg>
                    </div>
                </div>
                Liked by {likes} peoples
            </div>
        </div>
    );
}

export default Recipe;