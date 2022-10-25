import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './Components/Layout/Navbar';
import Homepage from './Components/Layout/Homepage';
import CompaniesList from './Components/Companies/CompaniesList';
import CompanyDetail from './Components/Companies/CompanyDetail';
import JobsList from './Components/Jobs/JobsList';
import LoginForm from './Components/Layout/Login';
import SignupForm from './Components/Layout/Signup';
import Profile from './Components/Layout/Profile';
import JoblyApi from './api';
import jwt from 'jsonwebtoken';
import userContext from './Components/Layout/userContext';

function App() {

  const navigate = useNavigate();

  // sets an initial value of null to the current logged in user
  // checks for existing token in localStorage; if one exists, sets it at initial value; otherwise, sets initial value of null
  const [currentUsername, setCurrentUsername] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [applications, setApplications] = useState(userDetails.applications || []);
  // const [applied, setApplied] = useState(false);
  const [token, setToken] = useState(() => {
    let value;
    value = JSON.parse(
      window.localStorage.getItem('token') || null);
    return value;
  });

  // based on the token provided once logged in, saves the current user in state
  // if no token exists, user receives a message and is redirected to login
  useEffect(() => {
    async function updateCurrentUsername() {
      if (token) {
        window.localStorage.setItem('token', `"${token}"`);
        const user = jwt.decode(token);
        JoblyApi.token = token;
        setCurrentUsername(user.username); 
        const details = await JoblyApi.getUser(user.username);
        setUserDetails({...details});             
      }   
    }
    updateCurrentUsername();
  }, [token]);

  // checks username and password and if valid, sets this user to currentUser and saves their token in state
  // this function is called when the user submits the login form
  async function login(user) {
    await JoblyApi.authenticateUser(user);
    setCurrentUsername(user.username);
    setToken(JoblyApi.token);
    navigate("/", { replace: true });
  }
  
  // adds a new user account when valid required credentials are provided
  // sets this user to currentUser and saves their token in state
  // this function is called when the user submits the signup form
  async function signup (newUser) {
    await JoblyApi.registerUser(newUser);
    setCurrentUsername(newUser.username);
    setToken(JoblyApi.token);
  }

  // removes the currentUser and their token from state & local storage
  // if first time user, removes username from local storage so they will receive returning user greeting on next login
  // this function is called when the user clicks the logout button
  const logout = () => {
    setCurrentUsername(null);
    setToken(null);
    window.localStorage.removeItem('token', `"${token}"`);
    window.localStorage.removeItem('newUsername');
    navigate("/login", { replace: true });
  }

  async function addJob(username, id) {
    try {
        const newJob = await JoblyApi.addToAppliedJobs(username, id);
        console.log("newJob:", newJob);
        setApplications({...applications, newJob});   
        // setApplied(true); 
    }
    catch (e) {
        return (e);
    }    
}

  return (    
    <div className="App">
      <userContext.Provider value={ currentUsername }>          
      <Navbar logout={logout}/>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/companies" element={<CompaniesList login={login} applications={userDetails.applications}/>}></Route>
        <Route path="/companies/:company" element={<CompanyDetail applications={userDetails.applications} addJob={addJob}/>}></Route>
        <Route path="/jobs" element={<JobsList applications={userDetails.applications} addJob={addJob}/>}></Route>
        <Route path="/login" element={<LoginForm login={login} />}></Route>
        <Route path="/signup" element={<SignupForm signup={signup} />}></Route>
        <Route path="/profile" element={<Profile userDetails={userDetails} setUserDetails={setUserDetails} />}></Route>
        <Route path="/logout" element={<Navigate to="/"></Navigate>}></Route>
      </Routes>
      </userContext.Provider>

    </div>
  );
}

export default App;
