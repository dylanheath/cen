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
  const [TotalUSD, setTotalUSD] = useState<number>(0);
  const [TotalAssetsXTZ, setTotalAssetsXTZ] = useState<number>(0);
  const [Price, setPrice] = useState<number>(0);
  const [Tokens, setTokens] = useState<Array<string | null>>([]);
  const [Assets, setAssets] = useState<Array<string>>([]);
  const [Farms, setFarms] = useState<Array<string | null>>([null]);
  const [TokensUSD, setTokensUSD] = useState<number>(0);

  useEffect(() => {
    const TokenBalance: Array<string | null> = [];
    const TokenData: Array<string> = [];
    let TokensTotal: any = 0;
    let TokenUSD: any = 0

    if (User.status == true) {
      const fetchAssets = async () => {
	let TokensLoaded = false;
	let AssetsLoaded = false;
        const address = await User.address?.toString();
	if (address) {
	  const getBalance = await axios.get<any>(`https://api.tzkt.io/v1/accounts/${address}/balance`)
	    .then((response) => {
              const BalanceData = response.data;
	      setTotalXTZ(BalanceData);
	      TokensTotal += BalanceData / 1000000; 
	    })
	    .catch(() => {
              console.log("failed to get balance");
	    })
	  const getFarmsBatch = await axios.get(`https://bafybeigogwwmiyuahrfw2qbclpoiausrgbb5ju2jsmx5p7i6wmynvmden4.ipfs.dweb.link/`)
	    .then((response) => {
              const FarmsData = response.data;
	      setFarms(FarmsData);
	    })
	    .catch(() => {
              console.log("failed to get farms");
	    })
	  const getPrice = await axios.get(`${api.url}/price/xtz`)
	    .then((response) => {
              const PriceData = response.data[0];
	      setPrice(PriceData.Price);
	    })
	    .catch(() => {
               console.log("failed to get price");
	    })
	  axios.all([axios.get(`https://api.better-call.dev/v1/account/mainnet/${address}/token_balances`, {timeout: 4000}),
                     axios.get(`https://api.teztools.io/token/prices`, {timeout: 4000}),
		     axios.get(`${api.url}/price/xtz`, {timeout: 4000})])
	  .then(axios.spread((TokenResponse, AssestResponse, PriceResponse) => {
           const AssetsData: Array<string> = AssestResponse.data.contracts;
	   const TokenData: Array<string> = TokenResponse.data.balances;
	   const XTZprice = PriceResponse.data[0].Price;
	   const FilteredTokens: Array<string> = [];

	   TokenData.map((token:any) => {
	        if (token.token_id == 0 && token.hasOwnProperty('symbol') && !token.hasOwnProperty('creators') && token.balance !== "0") {
                  FilteredTokens.push(token);
	        }
	      })

	   FilteredTokens.map((token:any) => {
	     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
	     // @ts-ignore
             const FindToken = AssetsData.find(tk => tk.symbol === token.symbol);
	     const TokenAmount = token.balance.slice(0, - token.decimals) + "." + token.balance.slice(- token.decimals);
	     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
             // @ts-ignore
	     TokensTotal += FindToken?.currentPrice * Number(TokenAmount);
	     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
	     // @ts-ignore
	     TokenUSD += FindToken?.currentPrice * Number(TokenAmount);
	   })
	   console.log(TokensTotal);
	   setTotalAssetsXTZ(TokensTotal);
	   setTotalUSD(XTZprice * TokensTotal);
	   setTokensUSD(XTZprice * TokenUSD);
	 }))
	 .catch(error => console.log(error));
	}
      }
      fetchAssets();
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
            <p className="assets-total">{(TotalAssetsXTZ).toFixed(2)}</p>
	    <p className="assets-total-xtz">XTZ</p>
	  </div>
	  <p className="assets-usd">${(TotalUSD).toFixed(2)}</p>
	</div>
      </div>
      <div className="assets-tokens-container">
        <div className="XTZ-assets">
	  <div className="XTZ-assets-header-container">
            <p className="XTZ-assets-header">XTZ</p>
	    <p className="assets-percent">0%</p>
	  </div>
	  <div className="XTZ-assets-amount-container">
            <p className="assets-amount">${(Price * TotalXTZ / 1000000).toFixed(2)}</p>
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
              <p className="assets-amount">${(TokensUSD).toFixed(2)}</p>
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
              <p className="assets-amount">$0.00</p>
	   </div>
	   <div className="price-change-container">
	     <p className="price-change">0%</p>
	   </div>
	</div>
      </div>
    </div>
  )
}

