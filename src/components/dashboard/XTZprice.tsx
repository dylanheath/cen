import React, { useState, useEffect } from 'react';

// assets
import TezosIcon from '../../assets/TezosCoin.png';

export default function XTZprice() {
  const [Price, setPrice] = useState<number>(0); 
  const [MarketCap, setMarketCap] = useState<number>(0);
  const [Supply, setSupply] = useState<number>(0);
  const [TotalSupply, setTotalSupply] = useState<number>(0);
  const [Change, setChange] = useState<number>(0);

  useEffect(() => {
    const fetchToken = async () => {

    }
  }, [])
  return (
      <div className="XTZ-price-box">
	<div className="XTZ-price-header-container">
	  <p className="XTZ-price-header">Price</p>
	</div>
	<div className="XTZ-price-analytics-container">
	  <div className="XTZ-price-total-container">
	    <div className="XTZ-information-container">
	      <img className="XTZ-token-icon"  src={TezosIcon} />
	      <p className="XTZ-price-total-header">XTZ</p>
	    </div>
	    <p className="XTZ-price-total">${Price}</p>
	  </div>
	  <div className="XTZ-bottom-analytics-container">
	  <div className="XTZ-market-cap-container">
	    <p className="XTZ-market-cap-header">Market Cap</p>
	    <p className="XTZ-market-cap">{MarketCap}</p>
	  </div>
	  <div className="XTZ-divider"></div>
	    <div className="XTZ-bottom-supply-container">
              <div className="XTZ-supply-container">
	        <p className="XTZ-supply-header">Circulating Supply</p>
	        <p className="XTZ-supply">{Supply}</p>
	      </div>
              <div className="XTZ-bottom-divider-container">
                <div className="XTZ-bottom-divider"></div>
	      </div>
	      <div className="XTZ-total-supply-container">
                <p className="XTZ-total-supply-header">Total Supply</p>
		<p className="XTZ-total-supply">{TotalSupply}</p>
	      </div>
	    </div>
	  </div>
	</div>
      </div>
  )
}

