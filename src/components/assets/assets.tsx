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
  const [Farms, setFarms] = useState<Array<null | number>>([null]);
  const [TokensUSD, setTokensUSD] = useState<number>(0);
  const [FarmsUSD, setFarmsUSD] = useState<number | string>("0.00");

  useEffect(() => {
    const TokenBalance: Array<string | null> = [];
    const TokenData: Array<string> = [];
    let TokensTotal: any = 0;
    let TokenUSD: any = 0
    let PlentyFarmTotal: number = 0;

    if (User.status == true) {
      const fetchAssets = async () => {
	let TokensLoaded = false;
	let AssetsLoaded = false;
        const address = await User.address?.toString();
	if (address) {
	  // gets User balance from api
	  // note: timeout of 400 for cold server response time
	  const getBalance = await axios.get<any>(`https://api.tzkt.io/v1/accounts/${address}/balance`, {timeout: 4000})
	    .then((response) => {
              const BalanceData = response.data;
	      setTotalXTZ(BalanceData);
	      TokensTotal += BalanceData / 1000000; 
	    })
	    .catch(() => {
	      // server response error
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

	    axios.all([
	             // Plenty LP farms
	             axios.get(`https://api.tzkt.io/v1/contracts/KT1MfMMsYX34Q9cEaPtk4qkQ6pojA7D2nsgr/bigmaps/balances/keys/${address}`),
		     axios.get(`https://api.tzkt.io/v1/contracts/KT1EVfYFoSpte3PnE4tPoWuj1DhNPVQwrW5Y/bigmaps/balances/keys/${address}`),
		     axios.get(`https://api.tzkt.io/v1/contracts/KT1JQAZqShNMakSNXc2cgTzdAWZFemGcU6n1/bigmaps/balances/keys/${address}`),
		     axios.get(`https://api.tzkt.io/v1/contracts/KT1MfMMsYX34Q9cEaPtk4qkQ6pojA7D2nsgr/bigmaps/balances/keys/${address}`),
		     axios.get(`https://api.tzkt.io/v1/contracts/KT1UTvMuyRggQe9q1hrh7YLh7vxffX2egtS6/bigmaps/balances/keys/${address}`),
		     axios.get(`https://api.tzkt.io/v1/contracts/KT1FsMiweyRTog9GGNC22hiMTFVRPrGs3eto/bigmaps/balances/keys/${address}`),
		     axios.get(`https://api.tzkt.io/v1/contracts/KT1VwZPZ4bcPQYS1C4yRvmU4giQDXhEV81WD/bigmaps/balances/keys/${address}`),
		     axios.get(`https://api.tzkt.io/v1/contracts/KT1CWNVmHs6RRbLzwA3P19h7Wa9smnDrAgpS/bigmaps/balances/keys/${address}`),
		     axios.get(`https://api.tzkt.io/v1/contracts/KT1VCrmywPNf8ZHH95HKHvYA4bBQJPa8g2sr/bigmaps/balances/keys/${address}`),
		     axios.get(`https://api.tzkt.io/v1/contracts/KT1K9kLuhq9AJjDAgbJdKGBiP9927WsRnjP6/bigmaps/balances/keys/${address}`),
		     axios.get(`https://api.tzkt.io/v1/contracts/KT1MkXtVBuCKtxqSh7APrg2d7ThGBmEf4hnw/bigmaps/balances/keys/${address}`),
		     axios.get(`https://api.tzkt.io/v1/contracts/KT1W3DtcPXbD7MMmtUdk3F352G6CYFSpwUUS/bigmaps/balances/keys/${address}`),
		     axios.get(`https://api.tzkt.io/v1/contracts/KT1MmAy4mSbZZVzPoYbK3M4z3GWUo54UTiQR/bigmaps/balances/keys/${address}`),
		     axios.get(`https://api.tzkt.io/v1/contracts/KT1RwFV1xQU2E9TsXe1qzkdwAgFWaKk8bfAa/bigmaps/balances/keys/${address}`),
		     axios.get(`https://api.tzkt.io/v1/contracts/KT1HSYQ9NLTQufuvNUwMhLY7B9TX8LDUfgsr/bigmaps/balances/keys/${address}`),
		     axios.get(`https://api.tzkt.io/v1/contracts/KT1KJhxkCpZNwAFQURDoJ79hGqQgSC9UaWpG/bigmaps/balances/keys/${address}`),
		     axios.get(`https://api.tzkt.io/v1/contracts/KT1FJzDx9AwbuNHjhzQuUxxKUMA9BQ7DVfGn/bigmaps/balances/keys/${address}`),
		     axios.get(`https://api.tzkt.io/v1/contracts/KT1UqnQ6b1EwQgYiKss4mDL7aktAHnkdctTQ/bigmaps/balances/keys/${address}`),
		     axios.get(`https://api.tzkt.io/v1/contracts/KT1UP9XHQigWMqNXYp9YXaCS1hV9jJkCF4h4/bigmaps/balances/keys/${address}`),
		     axios.get(`https://api.tzkt.io/v1/contracts/KT1Kp3KVT4nHFmSuL8bvETkgQzseUYP3LDBy/bigmaps/balances/keys/${address}`),
		     axios.get(`https://api.tzkt.io/v1/contracts/KT1S4XjwGtk55TmsMqSdazEMrH4pGA3NMXhz/bigmaps/balances/keys/${address}`),
		     axios.get(`https://api.tzkt.io/v1/contracts/KT1M82a7arHVwcwaswnNUUuCnQ45xjjGKNd1/bigmaps/balances/keys/${address}`),
		     axios.get(`https://api.tzkt.io/v1/contracts/KT1CBh8BKFV6xAH42hEdyhkijbwzYSKW2ZZC/bigmaps/balances/keys/${address}`),
		     axios.get(`https://api.teztools.io/token/prices`)
	             ])
		     .then(axios.spread((... PlentyResponse) => {
		       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                       // @ts-ignore
		       const PlentyToken: any = PlentyResponse[PlentyResponse.length -1].data.contracts.find(tk => tk.symbol === "PLENTY");
		       PlentyResponse.map((farm:any) => {
		         if (Number(farm.data) > 0) {
		           const PlentyDecimals = farm.data.toString().slice(0, - PlentyToken.decimals);
                           PlentyFarmTotal += Number(farm.currentPrice * PlentyDecimals);
			 }
		       }) 
		       setFarmsUSD(PlentyFarmTotal);
		     }))

	  axios.all([axios.get(`https://api.better-call.dev/v1/account/mainnet/${address}/token_balances`, {timeout: 4000}),
                     axios.get(`https://api.teztools.io/token/prices`, {timeout: 4000}),
		     axios.get(`${api.url}/price/xtz`, {timeout: 4000}),
		     ])
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
             <p className="assets-amount">${FarmsUSD == 0 ? "0.00" : FarmsUSD}</p> 
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

