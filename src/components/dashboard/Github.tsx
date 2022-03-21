import React from "react";

// styling
import './dashboard.css';

// assets
import GithubIcon from '../../assets/Github.svg';

export default function Github() {

  return (
    <div className="Github">
      <div className="Github-header-container">
        <p className="Github-header">Github</p> 
      <img className="Github-header-icon" src={GithubIcon} />
      </div>
      <div className="Github-content-container">
        <p className="Github-content">View Source code and Contribute</p>
      </div>
      <div className="Github-button-container">
        <button className="Github-button" type="button">View Repo</button>
      </div>
    </div>
  )
}

