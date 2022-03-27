import React, {useState, useEffect, useContext} from 'react';

// context
import { UserContext } from '../../context/context';

// styling
import './liquidity.css';

export default function Liquidity() {
  const { User, setUser } = useContext<any>(UserContext);
  return (
    <div className="Liquidity-container">
      <div className="liquidity">

      </div>
    </div>
  )
}

