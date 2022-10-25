import React from "react";
import userContext from "./userContext";
import ProfileUpdateForm from "./ProfileUpdateForm";
import "./Profile.css";

const Profile = ({userDetails, setUserDetails}) => {

    // provides current username if one exists
    const username = React.useContext(userContext);

    // displays user's current details and a form to update details
    return (
        <div className="container">
            <div className="profile">
            <h3 className="details heading">Here's your current information:</h3>
                <div>
                    
                    <p className="details">Username: {username}</p>
                    <p className="details">First name: {userDetails.firstName}</p>
                    <p className="details">Last name: {userDetails.lastName}</p>
                    <p className="details">email: {userDetails.email}</p>
                </div>
                <div>
                    <h3 className=" details update">To update your information, submit changes below:</h3>
                    <ProfileUpdateForm userDetails={userDetails} setUserDetails={setUserDetails} />
                </div>

            </div>
        </div>
    )
}

export default Profile;