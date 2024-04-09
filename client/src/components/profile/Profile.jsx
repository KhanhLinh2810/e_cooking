import React, {useState, useEffect} from 'react'
import "./Profile.css"
import axios from 'axios';
import Recipe from './recipes/Recipe';
import { useParams } from 'react-router-dom';
import HeaderProfile from './header/header';

function Profile() {
    const {username} = useParams();
    const [user, setUser] = useState({});
    const [recipes, setRecipes] = useState([]);
    
    useEffect( () => {
        fetchUser(username)
    }, []);

    const fetchUser = async (username) => {
        await axios.get(`http://localhost:5000/api/profile/${username}`)
        .then(res => {
            const user = res.data;
            setUser(user);            
            fetchRecipes(user._id);
        }).catch( err => {
            console.log(err)
            alert("Failed to fetch this profile")
        })
    } 

    const fetchRecipes = async(userId) => {
        await axios.get(`http://localhost:5000/api/recipe/user/${userId}`)
        .then(res => {
            setRecipes(res.data);
            console.log(recipes)
        }).catch( err => {
            console.log(err)
            alert("Failed to fetch recipe data")
        })
    }

    return (
        <div className="profile">
            <div className="profile_header">
                <HeaderProfile user={user} numberRecipes={recipes.length}/>
            </div>
            <div className="profile_recipe">
                {recipes.map((recipe) => (
                    <Recipe key={recipe._id} recipe={recipe} />
                ))}
            </div>
        </div>
    );
}

export default Profile;