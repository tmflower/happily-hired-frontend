import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";


// displays a form that allows user to enter information to create a new account
// when submitted, the signup function sets this user and their token as current in state
const SignupForm = ({ signup }) => {
    const navigate = useNavigate();

    const initial_state = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    }
    
    // controls masking and unmasking of password field
    const [passwordShowing, setPasswordShowing] = useState(false);
    const toggle = () => {setPasswordShowing(!passwordShowing)}

    const [formData, setFormData] = useState(initial_state);

    const { username, password, firstName, lastName, email } = formData;

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(formData => ({ ...formData, [name]: value}));
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const newUser = { username, password, firstName, lastName, email }    
        signup(newUser);
        window.localStorage.setItem('newUsername', username);
        setFormData(initial_state);
        navigate("/", { replace: true });
    }

    return (
        <div className="signup-page">
            <h2>Sign up for a free account</h2>
            <form className="signup-form">
                <label htmlFor="username">Username:
                <input 
                    type="text" 
                    name="username" 
                    value={username} 
                    id="username" 
                    onChange={handleChange}>
                </input></label>
                <label htmlFor="password">Password:
                <input 
                    type={passwordShowing ? "text" : "password"} 
                    name="password" 
                    value={password} 
                    id="password" 
                    onChange={handleChange}>
                    </input>
                    <div className="eye">
                        <i className={passwordShowing ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} onClick={toggle}></i>
                    </div>
                     </label>
                <label htmlFor="firstName">First name:
                <input 
                    type="text" 
                    name="firstName" 
                    value={firstName} 
                    id="firstName" 
                    onChange={handleChange}>
                    </input></label>
                <label htmlFor="lastName">Last name:
                <input 
                    type="text" 
                    name="lastName" 
                    value={lastName} 
                    id="lastName" 
                    onChange={handleChange}>
                    </input></label>
                <label htmlFor="email">Email:
                <input 
                    type="text" 
                    name="email" 
                    value={email} 
                    id="email" 
                    onChange={handleChange}>
                    </input></label> 
                <button className="signup-button" onClick={handleSubmit}>Submit</button>               
            </form>
            
        </div>        
    )
}

export default SignupForm;