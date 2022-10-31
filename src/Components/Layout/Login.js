import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

// displays a form that allows user to login to an existing account
// when submitted, the login function sets this user and their token as current in state
const LoginForm = ({ login }) => {
    const navigate = useNavigate();

    const initial_state = {
        username: '',
        password: ''
    }

    // controls masking and unmasking of password field
    const [passwordShowing, setPasswordShowing] = useState(false);
    const toggle = () => {setPasswordShowing(!passwordShowing)}

    const [formData, setFormData] = useState(initial_state);

    const { username, password } = formData;

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value}));
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const user = { username, password };
        login(user);
        setFormData(initial_state);
        navigate("/", { replace: true });
    }
    return (
        <div className="login-page">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input className="user-input" type="text" name="username" value={username} id="username" onChange={handleChange}></input>
                <label htmlFor="password">Password:</label> 
                <div>                   
                    <input className="user-input" type={passwordShowing ? "text" : "password"} name="password" value={password} id="password" onChange={handleChange}></input>
                    <i className={passwordShowing ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} onClick={toggle}></i>                                       
                </div>                
                <button className="login-button">Submit</button>
            </form>
        </div>
    )
}

export default LoginForm;