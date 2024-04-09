import React, { useEffect, useState } from 'react'
import Sidenav from '../components/navigation/Sidenav';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import "../styles/app.css";


const UpdateRecipePage = () => {
    const { recipeId } = useParams()
    const [recipe, setRecipe] = useState([])
    
    const [selectIngres, setSelectIngres] = useState([]);
    const [allIngres, setAllIngres] = useState([]);
    const [searchIngres, setSearchIngres] = useState([]);

    const [selectCuisines, setSelectCuisines] = useState([]);
    const [allCuisine, setAllCuisine] = useState([]);
    const [searchCuisines, setSearchCuisines] = useState([]);

    useEffect( () => {
        fetchRecipe()
        fetchIngres()
        fetchCuisines()
    }, [])

    const fetchRecipe = async () => {
        await axios.get(`http://localhost:5000/api/recipe/${recipeId}`)
        .then( res => {
            setRecipe(res.data)
            fetchIngresOfRecipe()
            fetchCuisinesOfRecipe()
        }).catch( err => {
            console.log(err)
            alert("Failed to find recipe: " + recipe.title);
        })
    }

//INGREDIENT
    const fetchIngres = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/ingredient");
            const allIngres = response.data;
            setAllIngres(allIngres);
        } catch (error) {
            console.log("Failed to fetch ingredient data:", error);
        }
    };

    const fetchIngresOfRecipe = async () => {
        await axios.get(`http://localhost:5000/api/ingredient/recipe/${recipeId}`)
        .then( res => {
            setSelectIngres(res.data)
        }).catch( err => {
            console.log(err)
            alert("Failed to fetch recipe's ingres")
        })
    } 

    const handleSearchIngres = (e) => {
        setSearchIngres(allIngres.filter(ingre => ingre.keyname.toLowerCase().includes(e.target.value)));
    }

    //Save selectIngrs 
    const handleIngres = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectIngres((prevIngres) => [...prevIngres, value]);
        } else {
            setSelectIngres((prevIngres) =>
                prevIngres.filter((ingredient) => ingredient !== value)
            );
        }
    };

//CUISINE

    const fetchCuisines = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/cuisine");
            const allCuisine = response.data;
            setAllCuisine(allCuisine);
        } catch (error) {
            console.log("Failed to fetch cuisine data:", error);
        }
    };

    const fetchCuisinesOfRecipe = async () => {
        await axios.get(`http://localhost:5000/api/ingredient/recipe/${recipeId}`)
        .then( res => {
            setSelectCuisines(res.data)
        }).catch( err => {
            console.log(err)
            alert("Failed to fetch recipe's cuisine")
        })
    } 

    const handleSearchCuisines = (e) => {
        setSearchCuisines(allCuisine.filter(cuisine => cuisine.cuisinename.toLowerCase().includes(e.target.value)));
    }

    //Save selectIngrs 
    const handleCuisines = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectCuisines((prevCuisine) => [...prevCuisine, value]);
        } else {
            setSelectCuisines((prevCuisine) =>
                prevCuisine.filter((cuisine) => cuisine !== value)
            );
        }
    };

    
    const updateRecipe = async () => {
        const token = Cookies.get("token");
        try {
            await axios.put(`http://localhost:5000/api/recipe/${recipeId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                recipe: {
                    ...recipe,
                    ingres: selectIngres,
                    cuisines: selectCuisines
                }
            })
            .then( res => {
                alert("Update recipe success");
            })
        } catch (error) {
            console.log(error);
            alert("Failed to update recipe");
        }
      };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        updateRecipe();
    };

    return (
        <div className="page">
            <div className="page_nav">
                <Sidenav />
            </div>
            <div className="page_main">
                <div className="button_exit">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                    </button>
                </div>
                <h2>You are updating your recipe</h2>
                <form className="update_form" onSubmit={handleSubmit}>
                    <div className="recipe_field">
                        <label htmlFor='title'>
                            <b>Recipe's name: </b>
                        </label>
                        <input
                            id='title'
                            value={recipe.title}
                            onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
                            type="text"
                            placeholder={recipe.title}
                            className="recipe_title"
                        />
                    </div>
                    <div className="recipe_field">
                        <label htmlFor='content'>
                            <b>Recipe's direction: </b>
                        </label>
                        <textarea
                            id='content'
                            value={recipe.content}
                            onChange={(e) => setRecipe({ ...recipe, content: e.target.value })}
                            placeholder={recipe.content}
                            className="recipe_content"
                        />
                    </div>
                    <div className="recipe_field">
                        <label htmlFor='time'>
                            <b>Time to cook: </b>
                        </label>
                        <input
                            id='time'
                            value={recipe.timetocook}
                            onChange={(e) => setRecipe({ ...recipe, timetocook: e.target.value })}
                            type="text"
                            placeholder={recipe.timetocook}
                            className="recipe_time"
                        />
                    </div>
                    <div className="recipe_field">
                        <label>
                            <b>Ingredients: </b>
                        </label>
                        <input 
                            type='text'
                            onChange={ handleSearchIngres } 
                            className='from-control'
                            placeholder='Search ingredients' 
                        />
                        {searchIngres.map((ingre) => {
                            return (
                                <div key={ingre._id}>
                                    {ingre.keyname}
                                    <input
                                        value={ingre._id}
                                        type="checkbox"
                                        checked={selectIngres.includes(ingre._id)}
                                        onChange={handleIngres}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <div className="recipe_field">
                        <label>
                            <b>Cuisines: </b>
                        </label>
                        <input 
                            type='text'
                            onChange={ handleSearchCuisines } 
                            className='from-control'
                            placeholder='Search cuisines' 
                        />
                        {searchCuisines.map((cuisine) => {
                            return (
                                <div key={cuisine._id}>
                                    {cuisine.cuisinename}
                                    <input
                                        value={cuisine._id}
                                        type="checkbox"
                                        checked={selectCuisines.includes(cuisine._id)}
                                        onChange={handleCuisines}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateRecipePage;