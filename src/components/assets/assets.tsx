import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// context
import { UserContext } from '../../context/context';

// styling
import './assets.css';

// assets
import PercentDown from '../../assets/PercentDown.png';
import PercentUp from '../../assets/PercentUp.png';

export default function Assets() {
  const { User, setUser } = useContext<any>(UserContext);
  const [TotalXTZ, setTotalXTZ] = useState<number | string>("0.00");
  const [TotalUSD, setTotalUSD] = useState<number | string>("0.00");
  const [Price, setPrice] = useState<number | string>("0.00");
  const [Tokens, setTokens] = useState<Array<string | null>>([null]);
  const [Assets, setAssets] = useState<Array<string>>(['']);

  useEffect(() => {
    const LocalBalance = localStorage.getItem("balance");
    const LocalPrice = localStorage.getItem("price");
    const LocalTokens = localStorage.getItem("tokens");
    const LocalAssets = localStorage.getItem("assets");
    if (LocalBalance || LocalPrice) {
      setTotalXTZ(Number(LocalBalance));
      setPrice(Number(LocalPrice));
    }
    if (LocalTokens) {
      setTokens(JSON.parse(LocalTokens));
    }

    if (LocalAssets) {
      setAssets(JSON.parse(LocalAssets));
    }
  }, [])
  return (
    <div className="Assets">
      <div className="assets-header-container">
        <p className="assets-header">Assets</p>
      </div>
      <div className="assets-total-container">
        <div className="assets-total-box-container">
          <p className="assets-total-header">Total Value of Assets</p>
	  <div className="assets-total-price-container">
            <p className="assets-total">0.00</p>
	    <p className="assets-total-xtz">XTZ</p>
	  </div>
	  <p className="assets-usd">${TotalUSD}</p>
	</div>
      </div>
      <div className="assets-tokens-container">
        <div className="XTZ-assets">
	  <div className="XTZ-assets-header-container">
            <p className="XTZ-assets-header">XTZ</p>
	    <p className="assets-percent">0%</p>
	  </div>
	  <div className="XTZ-assets-amount-container">
            <p className="assets-amount">${(Price * TotalXTZ).toFixed(2)}</p>
	  </div>
	  <div className="price-change-container">
            <p className="price-change">0%</p>
	  </div>
	</div>
	<div className="farm-assets">
	  <div className="farm-assets-header-container">
            <p className="farm-assets-header">Farms</p>
	    <p className="assets-percent">0%</p>
	  </div>
	  <div className="farm-assets-amount-container">
             <p className="assets-amount">$0.00</p> 
	  </div>
	  <div className="price-change-container">
            <p className="price-change">0%</p>
	  </div>
	</div>
	<div className="tokens-assets">
	   <div className="tokens-assets-header-container">
             <p className="farm-assets-header">Tokens</p>
	     <p className="assets-percent">0%</p>
	   </div>
	   <div className="tokens-assets-amount-container">
              <p className="assets-amount">$0.00</p>
	   </div>
	   <div className="price-change-container">
             <p className="price-change">0%</p>
	   </div>
	</div>
	<div className="tokens-assets">
	   <div className="tokens-assets-header-container">
             <p className="farm-assets-header">Other</p>
	     <p className="assets-percent">0%</p>
	   </div>
	   <div className="tokens-assets-amount-container">
              <p className="assets-amount">0.00</p>
	   </div>
	   <div className="price-change-container">
	     <p className="price-change">0%</p>
	   </div>
	</div>
      </div>
    </div>
  )
}

