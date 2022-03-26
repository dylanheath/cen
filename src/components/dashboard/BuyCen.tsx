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
  const [LiquidityAmount, setLiquidityAmount] = useState<number>(0);
  const [LiquidityUSD, setLiquidityUSD] = useState<number>(0);
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
	<p className="buy-cen-pool-amount">{LiquidityAmount} XTZ</p>
      </div>
    </div>
  )
}

