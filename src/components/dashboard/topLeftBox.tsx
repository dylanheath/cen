import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//context
import { UserContext } from '../../context/context';

//keys
import { PriceKey } from '../../keys/price';
import { CurrencyExchangeKey } from '../../keys/currencyExchange';

// utils
import { currencyList } from '../../utils/currencyList';
import { api } from '../../utils/api';

//styling
import './dashboard.css';

export default function TopLeftBox() {
  const { User, setUser } = useContext<any>(UserContext);
  const [Balance, setBalance] = useState<number>(0);
  const [Price, setPrice] = useState<number>(0);
  const [PriceChange, setPriceChange] = useState<number | null>(0);
  const [SelectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [CurrencyBalance, setCurrencyBalance] = useState<number>(0);
  const navigate = useNavigate();

  const sendNav = () => {
    navigate('/app/send'); 
  }
  const buyNav = () => {
    window.open('https://www.moonpay.com/buy');
  }
  useEffect(() => {
    const LocalPrice = localStorage.getItem('price');
    const LocalBalance = localStorage.getItem('balance');
    if (LocalPrice || LocalBalance) {
      setPrice(Number(LocalPrice));
      setBalance(Number(LocalBalance));
    }
    const fetchBalance = async () => {
      if (User.status == true) {
      const address = await User.address?.toString();
      const getBalance = await axios.get<any>(`https://api.tzkt.io/v1/accounts/${address}/balance`) 
        .then((response) => {
          const BalanceResponse = response.data; 
	  console.log(BalanceResponse);
	  setBalance(BalanceResponse / 1000000);
	  localStorage.setItem("balance", (BalanceResponse / 1000000).toString()) ;
        })
	.catch(() => {
          console.log('failed to fetch balance, refreshing in 1 minute');
        })
      const getXTZprice = await axios.get<any>(`${api.url}/price/xtz`)
        .then((response) => {
          const PriceData = response.data[0];
	  setPrice(PriceData.Price);
	  localStorage.setItem("price", PriceData.Price);
        })
	.catch(() => {
          console.log('failed to get price');
        })
    }
    // recall function
   }
    fetchBalance();
    setInterval(function(){
        fetchBalance();
      },60 * 1000);
  }, [User])
  return (
    <div className="top-left">
      <div className="top-left-box">
        <div className="top-left-header-container">
          <p className="top-left-header">Balance</p>
	  <p className="top-left-currency">{SelectedCurrency}</p>  
        </div>
	<div className="top-left-balance-container">
	  <div className="top-left-tezos-icon-container">
	  </div>
	  <p className="top-left-balance">{Balance}</p>
	  <p className="top-left-balance-xtz">XTZ</p>
	</div>
	<p className="top-left-balance-converted">${(Price * Balance).toFixed(2)}</p>
	<div className="top-left-button-container">
          <div className="top-left-send-button-container">	  
	    <button className="top-left-buy-button" onClick={() => sendNav()}>Send</button>
	  </div>
          <div className="top-left-buy-button-container">
	    <button className="top-left-buy-button" onClick={() => buyNav()}>Buy</button>
	  </div>
	</div>
      </div>
    </div>
  )
}

