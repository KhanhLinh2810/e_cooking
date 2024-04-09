import axios from 'axios';
import React, { useEffect, useState } from 'react'

function DetailRecipe({recipe, showDetail}) {
    const [ingres, setIngres] = useState([]);

    useEffect( () => {
        fetchIngres(recipe._id);
    }, [])

    const fetchIngres = async (recipeId) => {
        await axios.get(`http://localhost:5000/api/ingredient/recipe/${recipeId}`)
        .then( res => {
            setIngres(res.data)
        }).catch( err => {
            console.log(err)
            alert("Failed to fetch recipe's ingres")
        })
    } 

    return (
        <div className='detailRecipe'>
            <div className="button_exit">
                <button onClick={() => showDetail()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                </button>
            </div>
            <div className="recipe_detail">
                <h3>Ingredient</h3>
                <ul>
                    {ingres.map(ingre => (
                        <li>{ingre.keyname}</li>
                    ))}
                </ul>
            </div>
            <div className="recipe_detail">
                <h3>Time to cook:</h3>
                <p>{recipe.timetocook}</p>
            </div>
            <div className="recipe_detail">
                <h3>Direction:</h3>
                <p>{recipe.content}</p>
            </div>
        </div>
    );
}

export default DetailRecipe;