import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import JoblyApi from "../../api.js";
import JobCard from "../Jobs/JobCard";
import userContext from "../Layout/userContext";
import "./CompanyDetail.css";

const CompanyDetail = ({ applications, addJob }) => {

    // provides current username
    const username = React.useContext(userContext);

    // gets the company handle from URL params;
    const params = useParams();
    const handle = params.company;

    // sets initial value of company in state as null;
    const [company, setCompany] = useState(null);

    // requests data from the api for the company with the handle from the params and saves in state;
    useEffect(function getCompInfo() {
      async function getCompany() {
        let selected_company = await JoblyApi.getCompany(handle);
        setCompany(selected_company);        
      }  
      getCompany();     
    }, [handle]);

    // provides onClick function for button that redirects user to log in, if not logged in already
    const navigate = useNavigate();
    const forceLogin = () => {
        navigate("/login", { replace: true });
    }

    // displays message to user if it takes time to retrieve data
    // this also prevents an error from displaying if render fails
    if (!company) return <h2>Please wait while we get your company information...</h2>
    
    // if no logged in user, hides company info and prompts user to log in
    // if user is logged in:
    // displays details about selected company, including a list of that company's jobs
    return (
        <div>
            { username === null ? <div><h3>You must log in to see our company information.</h3><button onClick={forceLogin}>Log In</button></div> : 
            <div>
              <div className="company-info">
                <h2>{ company.name }</h2>
                <p>{ company.description }</p>  
              </div>
              <h3>{ company.name } is currently accepting applications for:</h3> 
              {company.jobs.map(job => (<JobCard 
                                          id={job.id}
                                          title={job.title} 
                                          company={job.companyName} 
                                          salary={job.salary} 
                                          equity={job.equity} 
                                          key={job.id}
                                          applications={applications}
                                          addJob={addJob}/>))} 
                                          
                                          
              </div>    
            }                    
        </div>
    )
}

export default CompanyDetail;