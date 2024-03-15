import React, { useState, useEffect } from 'react'
import axios from 'axios';

function Suggesstions() {
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
            const response = await axios.get("http://localhost:5000/api/recipesBy/cuisine/ingre", {
                cuisines: selectCuisines,
                ingres: selectIngres,
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
        <div className="sugesstion">
            <h3>Search Filter</h3>
            <form onSubmit={handleSubmit}>
                <div className="sugess_field">
                
                </div>
                <div className="sugess_field">
    
                </div>
                <div className="sugess_field">
                    <label>
                        <b>Ingredients: </b>
                    </label>
                    {allIngres.map((ingre) => {
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
                <div className="sugess_field">
                    <label>
                        <b>Cuisines: </b>
                    </label>
                    {allCuisines.map((cuisine) => {
                        return (
                            <div key={cuisine._id}>
                                {cuisine.keyname}
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
                <button type='submit'>Search</button>
            </form>
        </div>
    );
}

export default Suggesstions;