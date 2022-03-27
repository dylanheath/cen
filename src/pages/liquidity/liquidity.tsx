import React, {useState, useEffect, useContext} from 'react';

// context
import { UserContext } from '../../context/context';

// components
import LiquidityBox from '../../components/liquidity/liquidity';

// styling
import './liquidity.css';

export default function Liquidity() {
  const { User, setUser } = useContext<any>(UserContext);
  return (
    <div className="Liquidity-container">
      <div className="liquidity">
        <LiquidityBox />
      </div>
    </div>
  )
}

