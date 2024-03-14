import React, {useEffect, useState} from 'react'
import "./Timeline.css"
import Suggesstions from './Sugesstions';
import Recipe from "../recipes/Recipe"
import axios from 'axios';

const Timeline = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetchRecipes();
    }, [])
    
    const fetchRecipes = async() => {
        return axios.get('http://localhost:5000/api/recipes') 
            .then(response => {
                const recipes = response.data;
                setRecipes(recipes);
                console.log(recipes)
            })
            .catch(error => {
                console.error('Failed to fetch recipe data: ', error)
            })
    }

    return (
        <div className='timeline'>
            <div className="timeline_left">
                <div className="timeline_recipes">
                    {recipes.map((recipe) => (
                        <Recipe 
                            // username={recipe.createdBy.username} 
                            recipeName={recipe.title} 
                            recipeImage= {`http://localhost:5000/images/${recipe.image}`}
                            likes={recipe.likes} 
                            timestamp={recipe.createdAt} 
                        />
                    ))}
                </div>
            </div>
            <div className="timeline_right">
                <Suggesstions />
            </div>
        </div>
    );
}

export default Timeline;