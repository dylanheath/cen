import React, { useState, useEffect } from 'react';

export default function XTZprice() {
  const [Price, setPrice] = useState<number>(0); 
  const [MarketCap, setMarketCap] = useState<number>(0);
  const [Supply, setSupply] = useState<number>(0);
  const [Change, setChange] = useState<number>(0);

  useEffect(() => {
    const fetchToken = async () => {

    }
  }, [])
  return (
    <div className="XTZ-price">
      <div className="XTZ-price-container">
        <div className="XTZ-price-box">
	  <div className="XTZ-price-header-container">
	    <p className="XTZ-price-header">XTZ</p>
	  </div>
	  <div className="XTZ-price-analytics-container">
	    <div className="XTZ-price-total-container">
	      <p className="XTZ-price-total-header">Price</p>
	      <p className="XTZ-price-total">${Price}</p>
	    </div>
	    <div className="XTZ-market-cap-container">
	      <p className="XTZ-market-cap-header">Market Cap</p>
	      <p className="XTZ-market-cap">{MarketCap}</p>
	    </div>
            <div className="XTZ-supply-container">
	      <p className="XTZ-supply-header">Circulating Supply</p>
	      <p className="XTZ-supply">{Supply}</p>
	    </div>
	  </div>
	</div>
      </div>
    </div>
  )
}

