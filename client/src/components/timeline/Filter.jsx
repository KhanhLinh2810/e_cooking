import React, { useState, useEffect } from 'react'
import axios from 'axios';
import "./Filter.css"

function Filter({recipesByFilter}) {
    const [selectIngres, setSelectIngres] = useState([]);
    const [allIngres, setAllIngres] = useState([]);

    const [selectCuisines, setSelectCuisines] = useState([]);
    const [allCuisines, setAllCuisines] = useState([]);
    
    useEffect(() => {
        fetchIngres();
        fetchCuisines();
    }, []);

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
            setAllCuisines(allCuisine);
        } catch (error) {
            console.log("Failed to fetch cuisine data:", error);
        }
    };

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

//Other
    const findRecipes = async (selectCuisines, selectIngres) => {
        try {
            await axios.get("http://localhost:5000/api/recipes/cuisine/ingre", {
                params: {
                    cuisines: selectCuisines,
                    ingres: selectIngres,
                },
            }). then( res => {
                recipesByFilter(res.data)
            })
        } catch (error) {
            alert("Failed to find recipe")
            console.log(error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission logic here
        findRecipes(selectCuisines, selectIngres);
    };

    return (
        <div className="filter">
            <h3>Search Filter</h3>
            <form onSubmit={handleSubmit} className='filter_form'>
                <fieldset className='filter_field'>
                    <legend>Ingredients:</legend>
                    <div className="filter_checkboxs">
                        {allIngres.map((ingre) => {
                            return (
                                <div key={ingre._id} className='filter_checkbox'>
                                    <input
                                        value={ingre._id}
                                        type="checkbox"
                                        checked={selectIngres.includes(ingre._id)}
                                        onChange={handleIngres}
                                    />
                                    <span>{ingre.keyname}</span>
                                </div>
                            )
                        })}
                    </div>
                </fieldset>
                <fieldset className='filter_field'>
                    <legend>Cuisines:</legend>
                    <div className="filter_checkboxs">
                        {allCuisines.map((cuisine) => {
                            return (
                                <div key={cuisine._id} className='filter_checkbox'>
                                    <input
                                        value={cuisine._id}
                                        type="checkbox"
                                        checked={selectCuisines.includes(cuisine._id)}
                                        onChange={handleCuisines}
                                    />
                                    <span>{cuisine.cuisinename}</span>
                                </div>
                            )
                        })}
                    </div>
                </fieldset>
                <button type='submit'>Search</button>
            </form>
        </div>
    );
}

export default Filter;