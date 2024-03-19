import React, { useEffect, useState } from "react";
import "../styles/login.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect( () => {
        if(Cookies.get('token')) {
            navigate('/')
        }
    }, []);

    const handleLogin = async (username, password) => {
        try {
            await axios.post('http://localhost:5000/api/login/', {
                username: username,
                password: password
            }).then(res => {
                // Handle the API response here (success or error)
                const token = res.data.token;
                Cookies.set('token', token, { expires: 7 }); // Expires in 7 days
                // Routing to the profile page
                navigate('/');
            }).catch(err => {
                alert("Login Failed!");
                console.log(err);
            });
        } catch (error) {
            // Handle any error that occurred during the API request
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(username, pass);
    }

    return (
        <div className="container_login">
            <h1 id="e_cooking">ECooking</h1>
            <div className="login">
                <form className="form_login" onSubmit={handleSubmit}>
                    <label for="username" className="label">
                        <b>
                            Username
                        </b>
                    </label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="Enter your username" className="input" />
                    {errors.username && <span className="text-danger">{errors.username}</span>}
                    <label for="password" className="label">
                        <b>
                            Password    
                        </b>
                    </label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Enter your password" className="input" />
                    {errors.password && <span className="text-danger">{errors.password}</span>}
                    <button className="submit">Login</button>
                </form>
                <div className="link">
                    <span>Don't have an account?</span>
                    <a href="/register">Register</a>
                </div>
            </div>
        </div>
    )
}


export default Login;