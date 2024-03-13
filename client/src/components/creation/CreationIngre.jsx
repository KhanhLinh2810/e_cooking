import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CreateIngre = () => {
    const [keyname, setKeyname] = useState('');
    const [othername, setOthername] = useState('');
    const [image, setImage] = useState('');
    
    const navigate = useNavigate();

    const handleCreateIngre = (keyname, image) => {
        try {
            axios.post("http://localhost:5000/api/ingredient", {
                keyname,
                othername,
                image, 
            }).then(res => {
                navigate('/create');

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

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCreateIngre(keyname, image, othername);
    }

    const handleUploadImage = async (e) => {
        const image = e.target.image;
        const base64 = await convertToBase64(image);
        setImage({ ...image, base64 });
    }

    return (
        <div className="createIngre">
            <form className="form_createIngre" onSubmit={handleSubmit}>
                <div className="ingre_field">
                    <label><b>Ingredient's name</b></label>
                    <input value={keyname} onChange={(e) => setKeyname(e.target.value)} type='text' />
                </div>
                <div className="ingre_field">
                    <label><b>Ingredient's othername</b></label>
                    <input value={keyname} onChange={(e) => setOthername(e.target.value)} type='text' />
                </div>
                <div className="ingre_field">
                    <label htmlFor='image'>
                        <b>Ingre's image: </b>
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
                <button className="submit" type="submit">Add Ingredient</button>
            </form>

        </div>
    );
}

export default CreateIngre;

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