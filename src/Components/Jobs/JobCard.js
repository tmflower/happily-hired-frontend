import React, { useEffect, useState } from "react";
import userContext from "../Layout/userContext";
import "./JobCard.css";

// displays info about an individual job
const JobCard = ({ id, title, salary, equity, company, addJob, applications }) => {
    
    // retrieves current username
    const username = React.useContext(userContext);

    // sets default values for a job to display on button
    // user will see a different color and button message depending on whether they have already applied for this job or not
    const [color, setColor] = useState('rgb(87, 54, 238, .15)');
    const [message, setMessage] = useState('Apply now!');
    const [applied, setApplied] = useState(false);

    // changes the values to display for a job if the user has already applied
    // runs on initial load and anytime a new application is submitted
    useEffect(() => {
        async function getJobStatus() {            
            if (applications.includes(id)) {
                setApplied(true);
                setColor('white');
                setMessage("You've applied!");
            }
        }       
        getJobStatus();
    }, [applications, id]);

    // adds the job and changes the values in the button display
    // user should easily see which jobs they have applied for and which they have not
    const markApplied = () => {
        addJob(username, id);
        setColor('white');
        setMessage("You've applied!");
        setApplied(true);
    }


    // displays details about a company and a button that indicates whether the user can apply for the job or already did so
    return (
        <div className="job-card">
            <div className="job-info">
                <h3 className="job-title">{title}</h3>            
                <h5>{company}</h5>
                <p className="job-salary">Salary for this position: $ {salary}</p>
                <p className="job-equity">Equity offered: {equity}</p>                                  
            </div>
            <button className="apply-button" onClick={markApplied} style={{backgroundColor: color}}>{message}{applied ? <p className="checkmark">✅</p> : null}</button>
            
        </div>

    )
}

export default JobCard;