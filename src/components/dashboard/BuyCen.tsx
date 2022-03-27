import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios'

// styling
import './dashboard.css';

// assets
import LiquidityIcon from '../../assets/Liquidity.png';

// context
import { UserContext } from '../../context/context';

export default function BuyCen() {
  const { User, setUser } = useContext<any>(UserContext);
  const [LiquidityAmount, setLiquidityAmount] = useState<any>(0);
  const [LiquidityUSD, setLiquidityUSD] = useState<number>(0);
  const [LiquidityTokens, setLiquidityTokens] = useState<any>(0);
  useEffect(() => {
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
      }
    }
    fetchLiquidityData();
  }, [])
  return (
    <div className="Buy-cen-box">
      <div className="buy-cen-header-container">
        <p className="buy-cen-header">Liquidity</p>
	<button className="buy-cen-button" type="button">Add/Remove</button>
      </div>
      <div className="buy-cen-pool-usd-container">
        <p className="buy-cen-pool-usd">${LiquidityUSD}</p>
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

