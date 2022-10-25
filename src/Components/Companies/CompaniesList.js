import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CompanyCard from "./CompanyCard";
import JoblyApi from "../../api.js";
import userContext from "../Layout/userContext";
import "./CompaniesList.css";
import balloon3 from "../Images/balloon3.jpg";
import balloon5 from "../Images/balloon5.jpg";

const CompaniesList = ({ applications }) => {

    // provides current username
    const username = React.useContext(userContext);

    // sets initial state for companies and search term to empty/blank
    const [companies, setCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // requests data from api on all the companies and saves in state
    useEffect(function getAllCompanies() {
        async function getCompanies() {
        let allCompanies = await JoblyApi.getCompanies();
        setCompanies(allCompanies);
        }
        getCompanies();
    }, []);

    // when search terms are entered, requests data from api on companies that contain the terms and saves in state
    async function searchCompanies(searchTerm) {
            let selectedCompanies = await JoblyApi.getCompanies(searchTerm);
            setCompanies(selectedCompanies);
            setSearchTerm('');
    }

    // gets the user's search terms from the form and saves in state
    const handleChange = (evt) => {
        setSearchTerm(evt.target.value);
    }

    // when search terms are entered and button is clicked, this calls the function to get the filtered results
    const handleSubmit = (evt) => {
        evt.preventDefault();
        searchCompanies(searchTerm);        
    }

    // provides onClick function for button that redirects user to log in, if not logged in already
    const navigate = useNavigate();
    const forceLogin = () => {
        navigate("/login", { replace: true });
    }

    // if no logged in user, hides companies list and prompts user to log in
    // if user is logged in:
    // displays a list containing names and descriptions of all companies on initial load; updates to show filtered results when search terms are entered
    // displays a search bar allowing user to filter companies by name
    return (
        <div className="companies-list">
            <img src={balloon3} className="balloon3" alt="yellow hot air balloon with girl"/>
            <h2>Meet Our Companies</h2>
            <img src={balloon5} className="balloon5" alt="yellow hot air balloon with girl"/>
            { username === null ? <div><h3>You must log in to see our companies.</h3><button onClick={forceLogin}>Log In</button></div> : 
            <div>
                <form className="search-form" onSubmit={handleSubmit}>
                    <label htmlFor="searchTerm">Search for a company
                    <input 
                    id="searchTerm" 
                    type="text" 
                    placeholder="Company name" 
                    name="searchTerm" 
                    value={searchTerm} 
                    onChange={handleChange}/>
                    </label>
                    <button>Submit</button> 
                </form> 
                {!companies.length ? <p>Sorry, we don't have information about that company.</p> :  
                <div>         
                    {companies.map(c => (<NavLink 
                    to={`/companies/${c.handle}`} 
                    key={c.handle}><CompanyCard 
                    name={c.name} 
                    description={c.description} 
                    key={c.handle}
                    applications={applications} /></NavLink>))} 
                </div>}
            </div>
            }                                        
        </div>
    )
}

export default CompaniesList;