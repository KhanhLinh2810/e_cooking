import React, { useState } from "react";
import "../styles/register.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Register = (props) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const [errors, setErrors] = useState({})

    const navigate = useNavigate();

    const handleLogin = async (username, password) => {
        try {
            await axios.post('http://localhost:5000/api/login/', {
                username: username,
                password: password
            }).then(res => {
                // Handle the API response here (success or error)
                const token = res.data.token;
                Cookies.set('token', token, { expires: 7 }); // Expires in 7 days
                //Routing to the profile page
                navigate('/profile');
            }).catch(err => {
                navigate('/login');
            });
        } catch (error) {
            // Handle any error that occurred during the API request
            alert("Login Failed!");
            console.log(error);
        }
    }

    const handleRegister = async (firstname, lastname, username, email, password) => {
        try {
            await axios.post('http://localhost:5000/api/user', {
                username: username,
                firstName: firstname,
                lastName: lastname,
                email: email,
                password: password
            }).then(res => {
                // login
                handleLogin(username, password);                
            }).catch(err => {
                alert("Register Failed 456!");
                console.log(err);
            });
        } catch (error) {
            // Xử lý mọi lỗi xảy ra trong quá trình gọi API
            alert("Register Failed 123!");
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister(firstname, lastname, username, email, pass);
    }

    return (
        <div className="container_register">
            <h1 id="e_cooking">ECooking</h1>
            <div className="register">
                <form className="form_register" onSubmit={handleSubmit}>
                    <label for="firstname" className="label">First name</label>
                    <input value={firstname} onChange={(e) => setFirstname(e.target.value)} type="text" placeholder="Enter your first name" className="input" />
                    {errors.firstname && <span className="text-danger">{errors.firstname}</span>}
                    <label for="lastname" className="label">Last name</label>
                    <input value={lastname} onChange={(e) => setLastname(e.target.value)} type="text" placeholder="Enter your last name" className="input" />
                    {errors.lastname && <span className="text-danger">{errors.lastname}</span>}
                    <label for="username" className="label">User name</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="Enter your username" className="input" />
                    {errors.username && <span className="text-danger">{errors.username}</span>}
                    <label for="email" className="label">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" className="input" />
                    {errors.email && <span className="text-danger">{errors.email}</span>}
                    <label for="password" className="label">Password</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Enter your password" className="input" />
                    {errors.password && <span className="text-danger">{errors.password}</span>}
                    <button className="submit">Register</button>
                </form>
                <p>
                    <span className="account">Already have an account?</span>
                    <a href="/login" className="link">Login</a>
                </p>
            </div>
        </div>
    )
}

export default Register;