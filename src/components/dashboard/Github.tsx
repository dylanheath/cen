import React from "react";

// styling
import './dashboard.css';

// assets
import GithubIcon from '../../assets/Github.svg';

export default function Github() {

  return (
    <div className="Github">
      <div className="Github-container">
        <div className="Github-box">
          <div className="Github-header-container">
            <p className="Github-header">Github</p> 
	    <img className="Github-header-icon" src={GithubIcon} />
	  </div>
	  <div className="Github-content-container">
	    <div className="Github-content">
	    </div>
	    <div className="Github-repo-container">
              <div className="Github-cen">
	      </div>
	      <div className="Github-cen-api">
	      </div>
	    </div>
	  </div>
	</div>
      </div>
    </div>
  )
}

