import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Creation = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [time, setTime] = useState('');
    const [image, setImage] = useState('');
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
        console.log(ingredients)
        try {
            await axios.post("http://localhost:5000/api/recipe", {
                title: title, 
                content: content, 
                timetocook: time, 
                image: image, 
                ingres: ingredients,
            }).then( res => {
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

    const handleUploadImage = async (e) => {
        const image = e.target.image;
        const base64 = await convertToBase64(image);
        setImage({ ...image, base64 });
    }

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
                    <input
                        id='content'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        type="text"
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
                        id='image'
                        type='file'
                        lable="Image"
                        name='myFile'
                        onChange={(e) => handleUploadImage(e)}
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

const convertToBase64 = (image) => {
    return new Promise((resolve, reject) => {
        const imageReader = new FileReader();
        imageReader.readAsDataURL(image);
        imageReader.onload = () => {
            resolve(imageReader.result)
        };
        imageReader.onerror = (err) => {
            reject(err)
        }
    })
}