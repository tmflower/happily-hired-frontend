import React from "react";
import { NavLink } from "react-router-dom";
import userContext from "./userContext";
import "./Navbar.css";

// renders navigation links to allow logged-in user to move easily from feature to feature
const Navbar = ({logout}) => {
    const username = React.useContext(userContext);
    return (
        <div className="navbar">
            {username !== null ? 
            <div className="navlinks">
                <NavLink exact="true" to="/" className="link home" id="home" end>Happily Hired</NavLink>
                <NavLink exact="true" to="/companies" className="link">Companies</NavLink>
                <NavLink exact="true" to="/jobs" className="link">Jobs</NavLink>
                <NavLink exact="true" to="/profile" className="link">Profile</NavLink>
                <NavLink exact="true" to="/logout" onClick={logout} className="link logout" end>Logout, {username}</NavLink>
            </div>
            :
            <div className="navlinks">
                <NavLink exact="true" to="/" className="link home" id="home" end>Happily Hired</NavLink>
                <div id="right-links">                    
                    <NavLink exact="true" to="/signup" className="link signup right">Sign up</NavLink>           
                    <NavLink exact="true" to="/login" className="link login right">Log in</NavLink>
                </div>
            </div>}
        </div>
    )
}

export default Navbar;