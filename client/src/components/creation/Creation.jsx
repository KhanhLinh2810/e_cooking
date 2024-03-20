import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import "./Creation.css"

const Creation = ({ openChose }) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [time, setTime] = useState('');
    const [image, setImage] = useState({});

    const [selectIngres, setSelectIngres] = useState([]);
    const [allIngres, setAllIngres] = useState([]);
    const [searchIngres, setSearchIngres] = useState([]);

    const [selectCuisines, setSelectCuisines] = useState([]);
    const [allCuisine, setAllCuisine] = useState([]);
    const [searchCuisines, setSearchCuisines] = useState([]);

    useEffect(() => {
        if( !Cookies.get('token') ) {
            navigate('/login')
        }
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

    
    const createRecipe = async ( title, content, time, image, selectIngres, selectCuisines ) => {        
        const token = Cookies.get('token');
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('timetocook', time);
        formData.append('image', image);
        formData.append('ingres', JSON.stringify(selectIngres)); // Đóng gói selectIngres thành chuỗi JSON
        formData.append('cuisines', JSON.stringify(selectCuisines)); // Đóng gói selectCuisines thành chuỗi JSON

        try {
            await axios.post("http://localhost:5000/api/recipe", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then( res => {
                navigate('/');
            }).catch( err => {
                alert("Failed to create new recipe");
                console.log(err)
            })
        } catch (err) {
            alert("Failed to create new recipe");
            console.log(err);
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission logic here
        createRecipe(title, content, time, image, selectIngres, selectCuisines);
    };

    return (
        <div className="creation">
            <div className="creation_container">
                <div className="button_exit">
                    <button onClick={() => openChose("home")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                    </button>
                </div>
                <h2>Cooking will become easy thanks to you</h2>
                <form className="create_form" onSubmit={handleSubmit}>
                    <div className="recipe_field">
                        <label htmlFor='title'>
                            <b>Recipe's name: </b>
                        </label>
                        <input
                            id='title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            placeholder="Enter recipe's name"
                            className="recipe_title"
                        />
                    </div>
                    <div className="recipe_field">
                        <label htmlFor='content'>
                            <b>Recipe's direction: </b>
                        </label>
                        <textarea
                            id='content'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter direction for recipe"
                            className="recipe_content"
                        />
                    </div>
                    <div className="recipe_field">
                        <label htmlFor='time'>
                            <b>Time to cook: </b>
                        </label>
                        <input
                            id='time'
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            type="text"
                            placeholder="Enter time to cook this recipe"
                            className="recipe_time"
                        />
                    </div>
                    <div className="recipe_field">
                        <label htmlFor='image'>
                            <b>Recipe's image: </b>
                        </label>
                        <input
                            type='file'
                            lable="Image"
                            id='image'
                            onChange={(e) => setImage(e.target.files[0])}
                            accept='.png, .jpg, .jpge'
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

export default Creation;
