import React from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

//assets
import SwapIcon from '../../assets/swap.png';

export default function MiddleBottomTopLeft() {
  const navigate = useNavigate();
  const SwapNav = () => {
    navigate("/app/swap"); 
  };
  return (
    <div className="Middle-bottom-grid-box">
      <div className="Middle-bottom-grid-header-container">
        <p className="Middle-bottom-grid-header">Swap</p>
	<img className="Middle-bottom-grid-header-icon" src={SwapIcon} />
      </div>
      <div className="Middle-bottom-grid-content-container">
        <p className="Middle-bottom-grid-content">Swap your Tezos Tokens for a wide range of others</p>
      </div>
      <div className="Middle-bottom-grid-button-container">
         <button className="Middle-bottom-grid-button" type="button" onClick={SwapNav}>Go to Swap</button>
      </div>
    </div>
  )
}

