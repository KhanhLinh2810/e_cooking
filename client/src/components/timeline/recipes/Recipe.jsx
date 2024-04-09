import React, { useEffect, useState } from 'react'
import "./Recipe.css";
import axios from 'axios';
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';

const Recipe = ({recipe, showDetail}) => {
    const [user, setUser] = useState([]);
    const [timestamp, setTimestamp] = useState('');
    const [openMore, setOpenMore] = useState(false);
    const [hiddenRecipe, setHiddenRecipe] = useState(false);
 
    const navigate = useNavigate();

    useEffect( () => {
        fetchUser(recipe.createdBy);
        const createdAt = new Date(recipe.createdAt);
        const now = new Date();
    
        // Tính thời gian chênh lệch giữa createdAt và now (mili giây)
        const timeDiff = Math.abs(now.getTime() - createdAt.getTime());
        // Chuyển thời gian chênh lệch thành giây
        const seconds = Math.floor(timeDiff / 1000);
        let timeString = '';
        if (seconds < 60) {
          timeString = `${seconds} seconds ago`;
        } else if (seconds < 3600) {
          const minutes = Math.floor(seconds / 60);
          timeString = `${minutes} minutes ago`;
        } else if (seconds < 86400) {
          const hours = Math.floor(seconds / 3600);
          timeString = `${hours} hours ago`;
        } else {
          const days = Math.floor(seconds / 86400);
          timeString = `${days} days ago`;
        }
        setTimestamp(timeString);
    }, []);

    const fetchUser = async (userId) => {
        await axios.get(`http://localhost:5000/api/user/${userId}`)
        .then( res => {
            setUser(res.data)
        }).catch( err => {
            console.log(err)
            alert("Failed to find User post recipe: " + recipe.title);
        })
    }

    const handleDeleteRecipe = async() => {
        const token = Cookies.get("token");
        if( !token ) {
            navigate('/login')
        } else {
            await axios.delete(`http://localhost:5000/api/recipe/${recipe._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                const mess = res.data.message;
                if(mess === "Recipe deleted successfully") setHiddenRecipe(true);
                else alert(mess);
            }).catch(err => {
                console.log(err);
                alert("failed to delete recipe")
            })
        }
    }

    return (
        <div>
            { hiddenRecipe ? (
                <div className='recipe_hidden'>
                    <h4>Recipe has been deleted.</h4>
                </div>
            ) : (
                <div className="recipe">
                    <div className="recipe_header">
                        <div className="recipe_headerAuthor">
                            <div className="avatar">{user.avatar}</div>
                            <span className='username'>{user.username}</span><span>.</span><time>{timestamp}</time>
                        </div>
                        <div className="recipe_more">
                            <button onClick={() => setOpenMore(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                                </svg>
                            </button>
                            { openMore 
                                ? (
                                    <div>
                                        <button onClick={handleDeleteRecipe}> Delete </button>
                                        
                                        <button onClick={() => navigate(`/recipe/update/${recipe._id}`)}> Update </button>
                                    </div>
                                )
                                : null
                            }
                        </div>
                    </div>
                    <div className="recipe_name" onClick={() => {showDetail(recipe)}}>
                        <h3>{recipe.title}</h3>
                    </div>
                    <div className="recipe_img" onClick={() => {showDetail(recipe)}}>
                        <img src={`http://localhost:5000/images/${recipe.image}`} alt="" />
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
                        {/* Liked by {likes} peoples */}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Recipe;

