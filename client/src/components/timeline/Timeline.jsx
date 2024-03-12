import React, {useEffect, useState} from 'react'
import "./Timeline.css"
import Suggesstions from './Sugesstions';
import Recipe from '../recipes/recipe';
import axios from 'axios';

const Timeline = () => {
    const [recipes, setRecipes] = useState([
        {
            recipeID: "1",
            username: "Khanb Linh",
            recipeName: "Ga rang muoi",
            recipeImage: "https://www.huongnghiepaau.com/wp-content/uploads/2019/01/ga-rang-muoi-dam-da.jpg",
            likes: 12,
            timestamp: "12h"
        },
        {
            recipeID: "2",
            username: "Tuan Anh",
            recipeName: "Thit chien xu",
            recipeImage: "https://khamphamonngon.com/wp-content/uploads/2016/06/11-cach-lam-thit-heo-chien-xu.png",
            likes: 12,
            timestamp: "1d"
        },
        {
            recipeID: "3",
            username: "Thi",
            recipeName: "Lau thai",
            recipeImage: "https://wikihuongdan.com/wp-content/uploads/2021/12/cach-nau-lau-thai-ngon.jpg",
            likes: 1,
            timestamp: "1s"
        },
    ]);

    useEffect(() => {
        fetchRecipes();
    }, [])
    
    const fetchRecipes = () => {
        return axios.get('http://localhost:5000/api/recipes') 
            .then(response => {
                const recipes = response.data;
                setRecipes(recipes);
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
                            username={recipe.username} 
                            recipeName={recipe.recipeName} 
                            recipeImage={recipe.recipeImage} 
                            likes={recipe.likes} 
                            timestamp={recipe.timestamp} />
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