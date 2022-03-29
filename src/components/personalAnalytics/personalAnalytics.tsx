import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// context
import { UserContext } from '../../context/context';

// styling 
import './personalAnalytics.css';

export default function PersonalAnalytics() {
  const [TotalXTZ, setTotalXTZ] = useState<number>(0);
  const [TotalUSD, setTotalUSD] = useState<number>(0);
  const [TotalTransactions, setTotalTransactions] = useState<number>(0);
  return (
    <div className="Personal-analytics">
      <div className="personal-analytics">
      </div>
    </div>
  )
}
