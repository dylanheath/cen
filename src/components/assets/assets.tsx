import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// context
import { UserContext } from '../../context/context';

// styling
import './assets.css';

// utils
import { api } from '../../utils/api';

// assets
import PercentDown from '../../assets/PercentDown.png';
import PercentUp from '../../assets/PercentUp.png';

export default function Assets() {
  const { User, setUser } = useContext<any>(UserContext);
  const [TotalXTZ, setTotalXTZ] = useState<number>(0);
  const [TotalUSD, setTotalUSD] = useState<number | string>("0.00");
  const [Price, setPrice] = useState<number>(0);
  const [Tokens, setTokens] = useState<Array<string | null>>([null]);
  const [Assets, setAssets] = useState<Array<string>>(['']);
  const [Farms, setFarms] = useState<Array<string>>([""]);

  useEffect(() => {
    const TokenBalance: Array<string> = [];
    const TokenData: Array<string> = [];
	  
    const LocalBalance = localStorage.getItem("balance");
    const LocalPrice = localStorage.getItem("price");
    const LocalTokens = localStorage.getItem("tokens");
    const LocalAssets = localStorage.getItem("assets");
    const LocalFarms = localStorage.getItem("farms");

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
    
    if (LocalFarms) {
      setFarms(JSON.parse(LocalFarms));
    }

    if (User.status == true) {
      const fetchAssets = async () => {
        const address = await User.address?.toString();
	if (address) {
	  const getBalance = await axios.get<any>(`https://api.tzkt.io/v1/accounts/${address}/balance`)
	    .then((response) => {
              const BalanceData = response.data;
	      setTotalXTZ(BalanceData);
	    })
	    .catch(() => {
              console.log("failed to get balance");
	    })
          const getTokens = await axios.get<any>(`https://api.better-call.dev/v1/account/mainnet/${address}/token_balances`, { timeout: 4000 })
	    .then((response) => {
              const TokensList = response.data;
	      TokensList.balances.map((token:any) => {
	        if (token.token_id == 0 && token.hasOwnProperty('symbol') && !token.hasOwnProperty('creators') && token.balance !== "0") {
                  TokenBalance.push(token);
	        }
	      })
	      setTokens(TokenBalance);
	    })
	    .catch(() => {
	      console.log("failed to get tokens"); 
	    })
	  const getFarmsBatch = await axios.get(`https://bafybeigogwwmiyuahrfw2qbclpoiausrgbb5ju2jsmx5p7i6wmynvmden4.ipfs.dweb.link/`)
	    .then((response) => {
              const FarmsData = response.data;
	      setFarms(FarmsData);
	    })
	    .catch(() => {
              console.log("failed to get farms");
	    })
	  const getAssets = await axios.get(`https://api.teztools.io/token/prices`)
	    .then((response) => {
              const AssetsData = response.data;
	      setAssets(AssetsData); 
	    })
	    .catch(() => {
               console.log("failed to get assets");
	    })
	  const getPrice = await axios.get(`${api.url}/price/xtz`)
	    .then((response) => {
              const PriceData = response.data;
	      setPrice(PriceData);
	    })
	    .catch(() => {
               console.log("failed to get price");
	    })
	}
      }
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
            <p className="assets-amount">${Number(Price * TotalXTZ).toFixed(2)}</p>
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

