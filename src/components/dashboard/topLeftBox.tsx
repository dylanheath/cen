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
    const fetchBalance = async () => {
      if (User.status == true) {
      const address = await User.address?.toString();
      const getBalance = await axios.get<any>(`https://api.tzkt.io/v1/accounts/${address}/balance`) 
        .then((response) => {
          const BalanceResponse = response.data; 
	  console.log(BalanceResponse);
	  setBalance(BalanceResponse / 1000000);
        })
	.catch(() => {
          console.log('failed to fetch balance, refreshing in 1 minute');
        })
    }
    // recall function
    const fetchCurrencyConversion = async () => {
      if (SelectedCurrency !== 'USD') {
        const getCurrencyConversion = await axios.get<any>(`https://v6.exchangerate-api.com/v6/${CurrencyExchangeKey}/latest/USD`)
          .then((response) => {
            const ConversionResponse = response.data;
	    const ConversionPrice: number = ConversionResponse.SelectedCurrency;
	    const Conversion: number = ConversionPrice * Price;
	    setPrice(Conversion);
          })
          .catch(() => {
            console.log('failed to fetch conversion rates'); 
          })
      }
    }
    }
    fetchBalance();
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
	</div>
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

