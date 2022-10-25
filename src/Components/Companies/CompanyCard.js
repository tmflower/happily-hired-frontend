import React from "react";
import "./CompanyCard.css";

// renders a card with name and description for a single company
const CompanyCard = ({name, description}) => {

    return (
        <div className="company-card">
            <h2 className="company-name">{ name }</h2>
            <p className="company-description">{ description }</p>
        </div>
    )
}

export default CompanyCard;