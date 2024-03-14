import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Creation = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [time, setTime] = useState('');
    const [image, setImage] = useState({});
    const [ingredients, setIngredients] = useState([]);
    const [allIngres, setAllIngres] = useState([{}]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchIngres();
    }, []);

    const fetchIngres = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/ingredient");
            const allIngres = response.data;
            setAllIngres(allIngres);
        } catch (error) {
            console.log("Failed to fetch ingredient data:", error);
        }
    };

    const createRecipe = async ( title, content, time, image, ingredients ) => {        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('timetocook', time);
        formData.append('image', image);
        formData.append('ingres', JSON.stringify(ingredients)); // Đóng gói ingredients thành chuỗi JSON
        
        try {
            await axios.post("http://localhost:5000/api/recipe", formData)
            .then( res => {
                navigate('/');
            }).catch( err => {
                alert("Failed to create new recipe");
                console.log(err)
            })
        } catch (err) {
            alert("Failed to create new recipe");
            console.log(err);
        }
    }

    //Save ingredients 
    const handleIngres = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setIngredients((prevIngres) => [...prevIngres, value]);
        } else {
            setIngredients((prevIngres) =>
                prevIngres.filter((ingredient) => ingredient !== value)
            );
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission logic here
        createRecipe(title, content, time, image, ingredients);
    };

    return (
        <div className="creation">
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
                    <label htmlFor='ingredients'>
                        <b>Ingredients: </b>
                    </label>
                    {allIngres.map((ingre) => {
                        return (
                            <div key={ingre._id}>
                                {ingre.keyname}
                                <input
                                    value={ingre._id}
                                    type="checkbox"
                                    checked={ingredients.includes(ingre._id)}
                                    onChange={handleIngres}
                                />
                            </div>
                        )
                    })}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Creation;
