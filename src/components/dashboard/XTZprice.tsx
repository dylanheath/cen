import React, { useState, useEffect } from 'react';
import axios from 'axios';

// utils
import { api } from '../../utils/api';

// assets
import TezosIcon from '../../assets/TezosCoin.png';
import ArrowDown from '../../assets/arrowdown.png';

export default function XTZprice() {
  const [Price, setPrice] = useState<number>(0); 
  const [MarketCap, setMarketCap] = useState<number>(0);
  const [Supply, setSupply] = useState<number>(0);
  const [TotalSupply, setTotalSupply] = useState<number>(0);
  const [Change, setChange] = useState<number>(0);
  const [Volume, setVolume] = useState<number>(0);

  useEffect(() => {
    const LocalPrice = localStorage.getItem('price');
    if (LocalPrice) {
      setPrice(Number(LocalPrice));
    }
    const fetchToken = async () => {
      const isMounted = true;
      if (isMounted == true) {
        const getPrice = await axios.get(`${api.url}/price/xtz`)
          .then((response) => {
            const PriceData = response.data[0];
	    setPrice(PriceData.Price); 
	    setMarketCap(PriceData.MarketCap);
            setChange(PriceData.Price_change_24.toFixed(2));
	    setSupply(PriceData.CircSupply);
	    setVolume(PriceData.Volume);
          })
	  .catch(() => {
            console.log("failed to get price");
	  })
        }
      }
    fetchToken();
    setInterval(function(){
        fetchToken();
      },60 * 1000);
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
	    <div className="XTZ-price-info-container">
	      <p className="XTZ-price-total">${Price}</p>
	      <p className="XTZ-price-change" style={Change < 0 ? {background: "rgb(33, 114, 229)"} : {background: "rgb(33, 114, 229)"}}>{Change}%</p>
	    </div>
	  </div>
	  <div className="XTZ-bottom-analytics-container">
	  <div className="XTZ-market-cap-container">
	    <p className="XTZ-market-cap-header">Market Cap</p>
	    <p className="XTZ-market-cap">{MarketCap.toLocaleString()}</p>
	  </div>
	  <div className="XTZ-divider"></div>
	    <div className="XTZ-bottom-supply-container">
              <div className="XTZ-supply-container">
	        <p className="XTZ-supply-header">Circulating Supply</p>
	        <p className="XTZ-supply">{Supply.toLocaleString()}</p>
	      </div>
              <div className="XTZ-bottom-divider-container">
                <div className="XTZ-bottom-divider"></div>
	      </div>
	      <div className="XTZ-total-supply-container">
	        <div className="XTZ-volume-details-container">
                  <p className="XTZ-total-supply-header">Volume</p>
		  <p className="XTZ-volume-hour">24h</p>
		</div>
		<p className="XTZ-total-supply">{Volume.toLocaleString()}</p>
	      </div>
	    </div>
	  </div>
	</div>
      </div>
  )
}

