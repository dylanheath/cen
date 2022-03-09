import React from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

// assets
import TwitterIcon from '../../assets/twitter.png';

export default function MiddleBottomTopRight() {
  const TwitterNav = () => {
    window.open("https://twitter.com/Cen_tezos");
  };
  return (
    <div className="Middle-bottom-grid-box">
      <div className="Middle-bottom-grid-header-container">
        <p className="Middle-bottom-grid-header">Twitter</p>
	<img className="Middle-bottom-grid-header-icon" src={TwitterIcon} />
      </div>
      <div className="Middle-bottom-grid-content-container">
        <p className="Middle-bottom-grid-content">Follow us on Twitter for updates & more.</p>
      </div>
      <div className="Middle-bottom-grid-button-container">
        <button className="Middle-bottom-grid-button" type="button" onClick={TwitterNav}>Go to Twitter</button>
      </div>
    </div>
  )
 }
