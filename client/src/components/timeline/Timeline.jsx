import React, {useEffect, useState} from 'react'
import "./Timeline.css"
import Filter from './Filter';
import Recipe from "./recipes/Recipe"
import axios from 'axios';
import DetailRecipe from './DetailRecipe';

const Timeline = () => {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState([]);
    const [detailRecipe, setDetailRecipe] = useState({});
    const [open, setOpen] = useState(true);

    useEffect(() => {
        fetchRecipes();
    }, [])

    const fetchRecipes = async() => {
        return axios.get('http://localhost:5000/api/recipes') 
            .then(response => {
                const recipes = response.data;
                setRecipes(recipes);
                setSearch(recipes);
            })
            .catch(error => {
                console.error('Failed to fetch recipe data: ', error)
            })
    }

    const handleSearch = (e) => {
        setSearch(recipes.filter(recipe => recipe.title.toLowerCase().includes(e.target.value)))
    }

    const handleRecipesFound = (recipesByFilter) => {
        setSearch(recipesByFilter);
    }

    const handleShowRecipe = (showDetail) => { 
        setDetailRecipe(showDetail);
        setOpen(!open);
    }

    return (
        <div className='timeline'>
            <div className="timeline_left">
                <div className="timeline_search">
                    <input 
                        type='text'
                        onChange={ handleSearch } 
                        className='from-control'
                        placeholder='Search recipes' 
                    />
                </div>
                <div className="timeline_recipes">
                    {search.map((recipe) => (
                        <Recipe 
                            recipe = {recipe} 
                            showDetail = {handleShowRecipe}
                        />
                    ))}
                </div>
            </div>
            <div className="timeline_right">
                { open 
                    ? <Filter recipesByFilter= {handleRecipesFound}/>
                    : <DetailRecipe recipe = {detailRecipe} showDetail = {handleShowRecipe}/>
                }
            </div>
        </div>
    );
}

export default Timeline;