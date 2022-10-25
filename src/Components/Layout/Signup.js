import React, { useState } from "react";
import "./Signup.css";

// displays a form that allows user to enter information to create a new account
// when submitted, the signup function sets this user and their token as current in state
const SignupForm = ({ signup }) => {
        
    const initial_state = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    }
    
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
    }

    return (
        <div className="signup">
            <h2>Sign up for a free account</h2>
            <form className="signup-form">
                <label htmlFor="username">Username:
                <input type="text" name="username" value={username} id="username" onChange={handleChange}></input></label>
                <label htmlFor="password">Password:
                <input type="password" name="password" value={password} id="password" onChange={handleChange}></input></label>
                <label htmlFor="firstName">First name:
                <input type="text" name="firstName" value={firstName} id="firstName" onChange={handleChange}></input></label>
                <label htmlFor="lastName">Last name:
                <input type="text" name="lastName" value={lastName} id="lastName" onChange={handleChange}></input></label>
                <label htmlFor="email">Email:
                <input type="text" name="email" value={email} id="email" onChange={handleChange}></input></label>                
            </form>
            <button className="signup-button" onClick={handleSubmit}>Submit</button>
        </div>        
    )
}

export default SignupForm;