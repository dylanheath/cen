import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

// styling
import './dashboard.css';

// api
import { api } from '../../utils/api';

// assets
import LiquidityIcon from '../../assets/Liquidity.png';

// context
import { UserContext } from '../../context/context';

export default function BuyCen() {
  const { User, setUser } = useContext<any>(UserContext);
  const [LiquidityAmount, setLiquidityAmount] = useState<number>(0);
  const [LiquidityUSD, setLiquidityUSD] = useState<number>(0);
  const [LiquidityTokens, setLiquidityTokens] = useState<any>(0);
  const [XTZprice, setXTZprice] = useState<number>(0);
  const navigate = useNavigate();
  const LiquidityNav = () => {
    navigate('/app/liquidity');
  }
  useEffect(() => {
    const LocalPrice = localStorage.getItem('price');
    if (LocalPrice) {
      setXTZprice(Number(LocalPrice));
    }
    const fetchLiquidityData = async () => {
      const isMounted = true
      if (User.status == true && isMounted == true) {
      const getAvailableTokens = await axios.get<any>(`https://api.better-call.dev/v1/account/mainnet/KT1NNMGcCs9Afm87esXbKUmU3mv2KLngrqGK/token_balances`)
        .then((response) => {
          const AvailableTokensResponse = response.data.balances;
          setLiquidityTokens(AvailableTokensResponse);
	})
	.catch(() => {
          console.log('failed to fetch available tokens');
	})
      const getAvailableXTZ = await axios.get<any>(`https://api.tzkt.io/v1/accounts/KT1NNMGcCs9Afm87esXbKUmU3mv2KLngrqGK/balance`)
        .then((response) => {
          const AvailableXTZResponse = response.data;
	  setLiquidityAmount(AvailableXTZResponse / 1000000);
        })
	.catch(() => {
          console.log('failed to fetch available xtz');
	})
      const getXTZprice = await axios.get<any>(`${api.url}/price/xtz`)
        .then((response) => {
          const PriceData = response.data[0].Price;
	  setXTZprice(PriceData);
	})
        .catch(() => {
          console.log('failed to get price');
        })
      }
    }
    fetchLiquidityData();
  }, [])
  return (
    <div className="Buy-cen-box">
      <div className="buy-cen-header-container">
        <p className="buy-cen-header">Liquidity</p>
	<button className="buy-cen-button" type="button" onClick={LiquidityNav}>Add/Remove</button>
      </div>
      <div className="buy-cen-pool-usd-container">
        <p className="buy-cen-pool-usd">${(XTZprice * LiquidityAmount).toFixed(2)}</p>
      </div>
      <div className="buy-cen-pool-header-container">
        <p className="buy-cen-pool-header">Total Locked in Pools</p>
	<div className="buy-cen-pool-amount-container">
	  <p className="buy-cen-pool-amount">{LiquidityAmount} XTZ</p>
	  <div className="pool-amount-divider-container"><div className="pool-amount-divider"></div></div>
	  <p className="buy-cen-pool-tokens-amount">{LiquidityTokens[0]?.balance.slice(0, LiquidityTokens[0].decimals)} CEN</p>
	</div>
      </div>
    </div>
  )
}

