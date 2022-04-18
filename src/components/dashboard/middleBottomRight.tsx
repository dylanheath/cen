import React from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

// assets
import FinderIcon from '../../assets/finder.png';

export default function MiddleBottomRight() {
  const navigate = useNavigate();
  const FinderNav = () => {
    navigate("/app/finder");
  };
  return (
    <div className="Middle-bottom-grid-box">
      <div className="Middle-bottom-grid-header-container">
        <p className="Middle-bottom-grid-header">Finder</p>
	<img className="Middle-bottom-grid-header-icon" src={FinderIcon} />
      </div>
      <div className="Middle-bottom-grid-content-container">
        <p className="Middle-bottom-grid-content">View all User data from transactions to operations</p>
      </div>
      <div className="Middle-bottom-grid-button-container">
        <button className="Middle-bottom-grid-button" type="button" onClick={FinderNav}>Go to Finder</button>
      </div>
    </div>
  )
}

