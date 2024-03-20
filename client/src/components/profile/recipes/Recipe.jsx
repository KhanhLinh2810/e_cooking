import React, {useEffect, useState} from 'react'
import "./Recipe.css"
import axios from 'axios';

function Recipe({recipe}) {
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
        <div className="recipe_profile">
            <div className="img_recipe">
                <img src={`http://localhost:5000/images/${recipe.image}`} />
            </div>
            <div className="recipe_info">
                <div className="detail_recipe">
                    <h4>{recipe.title}</h4>
                </div>
                <div className="detail_recipe">
                    <p><strong>Ingredient: </strong>
                        {ingres.map(ingre => (
                            <span>{ingre.keyname}  </span>
                        ))}</p>
                </div>
                <div className="detail_recipe">
                    <p><strong>Time to cook: </strong>{recipe.timetocook}</p>
                </div>
            </div>
        </div>
    );
}

export default Recipe;