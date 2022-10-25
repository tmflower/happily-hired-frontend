import React from "react";
import userContext from "./userContext";
import "./Homepage.css";
import { NavLink } from "react-router-dom";

const Homepage = () => {

    // retrieves username for new user who has just signed up
    const newUsername = window.localStorage.getItem("newUsername") || null;

    // retrieves current username if one exists
    const username = React.useContext(userContext) || null;

    // provides custom greetings for users based on status
    const notLoggedIn = "Log in or sign up today!"
    const firstTimeUser = `Welcome, ${newUsername}!`
    const returningUser = `Welcome back, ${username}!`

    let greeting;
    if (newUsername) {
        greeting = firstTimeUser;
    }
    else if (username && !newUsername) {
        greeting = returningUser;
    }
    else {
        greeting = notLoggedIn;
    }

    return (
        <div className="homepage">
            <div className="background-balloon">
            <h1 className="title">Happily Hired</h1>
            <h3 className="subtitle">We'll help you find the job of your dreams.</h3>
            <p className="greeting">{greeting}</p>
            {!username && !newUsername ? 
            <div><NavLink to="/login"><button className="home-button">Log in</button></NavLink><NavLink to="/signup"><button className="home-button">Sign up</button></NavLink>
            <p className="demo">Try a demo: username "demo", password "demo123"</p></div>
            : 
            <div className="home-buttons"><NavLink to="/companies"><button className="home-button">Our companies</button></NavLink><NavLink to="/jobs"><button className="home-button">Our jobs</button></NavLink>
            </div>}
            </div>
        </div>
    )
}

export default Homepage;