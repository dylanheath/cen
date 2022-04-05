import React, { useState, useEffect } from 'react';
import axios from 'axios';

// styling
import './assets.css';

export default function Assets() {
  const [TotalXTZ, setTotalXTZ] = useState<number | string>("0.00");
  const [TotalUSD, setTotalUSD] = useState<number | string>("0.00");
  return (
    <div className="Assets">
      <div className="assets-header-container">
        <p className="assets-header">Assets</p>
      </div>
      <div className="assets-total-container">
        <div className="assets-total-box-container">
          <p className="assets-total-header">Total Value of Assets</p>
	  <div className="assets-total-price-container">
            <p className="assets-total">{TotalXTZ}</p>
	    <p className="assets-total-xtz">XTZ</p>
	  </div>
	  <p className="assets-usd">${TotalUSD}</p>
	</div>
      </div>
      <div className="assets-tokens-container">
        <div className="XTZ-assets">
	  <div className="XTZ-assets-header-container">
            <p className="XTZ-assets-header">XTZ</p>
	  </div>
	  <div className="XTZ-assets-amount-container">
            <p className="XTZ-assets-amount">0.00</p>
	  </div>
	</div>
	<div className="farm-assets">
	  <div className="farm-assets-header-container">
            <p className="farm-assets-header">Farms</p>
	  </div>
	  <div className="farm-assets-amount-container">
             <p className="assets-amount">0.00</p> 
	  </div>
	</div>
	<div className="tokens-assets">
	   <div className="tokens-assets-header-container">
             <p className="assets-header">Tokens</p>
	   </div>
	   <div className="tokens-assets-amount-container">
              <p className="assets-amount">0.00</p>
	   </div>
	</div>
      </div>
    </div>
  )
}

