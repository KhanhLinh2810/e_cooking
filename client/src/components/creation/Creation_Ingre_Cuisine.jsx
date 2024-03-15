import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CreateIngreCuisine = () => {
    const [ingreKeyname, setIngreKeyname] = useState('');
    const [ingreOthername, setIngreOthername] = useState('');
    const [ingreImage, setIngreImage] = useState('');
    
    const [cuisinename, setCuisinename] = useState('');

    const navigate = useNavigate();
    
    const handleCreateIngre = (ingreKeyname, ingreImage, ingreOthername) => {
        const formData = new FormData();
        formData.append('keyname', ingreKeyname);
        formData.append('orthername', ingreOthername);
        formData.append('image', ingreImage);

        try {
            axios.post("http://localhost:5000/api/ingredient", formData)
            .then(res => {
                navigate('/addIngreCuisine');
            }).catch(err => {
                alert("Failed to create ingredient");
                console.log(err);
            });
        } catch (error) {
            // Xử lý mọi lỗi xảy ra trong quá trình gọi API
            alert("Failed to create ingredient");
            console.log(error);
        }
    }

    const handleSubmit_ingre = (e) => {
        e.preventDefault();
        handleCreateIngre(ingreKeyname, ingreImage, ingreOthername);
    }

    const handleCreateCuisine = (cuisinename) => {
        try {
            axios.post("http://localhost:5000/api/cuisine", { cuisinename })
            .then(res => {
                navigate('/addIngreCuisine');

            }).catch(err => {
                alert("Failed to create Cuisine");
                console.log(err);
            });
        } catch (error) {
            // Xử lý mọi lỗi xảy ra trong quá trình gọi API
            alert("Failed to create Cuisine");
            console.log(error);
        }
    }

    const handleSubmit_cuisine = (e) => {
        e.preventDefault();
        handleCreateCuisine(cuisinename)
    }

    return (
        <div className="create">
            <div className="createIngre">
                <form className="form_createIngre" onSubmit={handleSubmit_ingre}>
                    <div className="ingre_field">
                        <label><b>Ingredient's name</b></label>
                        <input value={ingreKeyname} onChange={(e) => setIngreKeyname(e.target.value)} type='text' />
                    </div>
                    <div className="ingre_field">
                        <label><b>Ingredient's othername</b></label>
                        <input value={ingreOthername} onChange={(e) => setIngreOthername(e.target.value)} type='text' />
                    </div>
                    <div className="ingre_field">
                        <label htmlFor='image'>
                            <b>Ingre's image: </b>
                        </label>
                        <input
                            id='image'
                            type='file'
                            lable="Image"
                            onChange={(e) => setIngreImage(e.target.files[0])}
                            accept='.png, .jpg, .jpge'
                        />
                    </div>
                    <button className="submit" type="submit">Add Ingredient</button>
                </form>
            </div>
            <div className="createCuisine">
                <form className='form_createCuisine' onSubmit={handleSubmit_cuisine}>
                    <label><b>Cuisine's name</b></label>
                    <input value={cuisinename} onChange={(e) => setCuisinename(e.target.value)} type='text' />
                    <button className="submit" type="submit">Add Cuisine</button>
                </form>
            </div>
        </div>
        
    );
}

export default CreateIngreCuisine;