import React from 'react';

// styling
import './dashboard.css';

// assets
import LiquidityIcon from '../../assets/Liquidity.png';

export default function BuyCen() {

  return (
    <div className="Buy-cen-box">
      <div className="buy-cen-header-container">
        <p className="buy-cen-header">Liquidity</p>
	<img className="buy-cen-header-icon" src={LiquidityIcon} />
      </div>
      <div className="buy-cen-content-container">
        <p className="buy-cen-content">Provide XTZ to the Cen Liquidity Pool</p>
      </div>
      <div className="buy-cen-button-container">
        <button className="buy-cen-button" type="button">Interact</button>
      </div>
    </div>
  )
}

