import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// graph
import Graph from '../dashboard/graph';

// context
import { UserContext } from '../../context/context';

// api
import { api } from '../../utils/api';

// styling
import './dashboard.css';

export default function MiddleBox() {
  const { User, setUser } = useContext<any>(UserContext);
  const [TotalTransactions, setTotalTransactions] = useState<number>(0); 
  const [TotalAmount, setTotalAmount] = useState<number>(0);
  const [TotalAmountConverted, setTotalAmountConverted] = useState<number>(0);
  const [BalanceHistory, setBalanceHistory] = useState<any>([0]);
  useEffect(() => {
    const getAnalytics = async () => {
      if (User.status ==  true) {
        const address = await User.address?.toString();
        const getTotalTransactions = await axios.get(`${api.url}/transactions/totaltransactions`, { timeout: 5000 })
          .then((response) => {
            const TotalTransactionsData = response.data;
	    setTotalTransactions(TotalTransactionsData);
          })
	  .catch(() => {
            console.log('failed to grab total transactions');
	  })
        const getBalanceHistory = await axios.get(`https://api.tzkt.io/v1/accounts/${address}/balance_history`)
	  .then((response) => {
            const BalanceHistoryData = response.data.slice(-10);
	    const graphBalances: Array<number> = []
	    if (BalanceHistoryData.length > 0) {
	       BalanceHistoryData.map((timestampBalance:any) => {
               graphBalances.push(timestampBalance.balance, timestampBalance.timestamp);
	    })
              setBalanceHistory(graphBalances);
	    }
	  })
	  .catch(() => {
            console.log("failed to get balance history");
	  })
      }
    }
   getAnalytics();
  }, [])
  return (
    <div className="Middle-top">
      <div className="Middle-top-box">
        <div className="Middle-top-header-container">
	  <p className="Middle-top-header">Analytics</p>
	  <p className="Middle-top-personal-analytics">Recent</p>
	</div>
	<p className="Middle-top-converted-price">${TotalAmountConverted}</p>
	<div className="Middle-top-analytics-container-main">
	  <div className="Middle-top-analytics-container">
	    <p className="Middle-top-total-amount-header-top">Total XTZ</p>
	    <div className="Middle-top-total-header">
	      <p className="Middle-top-total-transactions">{TotalAmount} XTZ</p>
	    </div>
	  </div>
	</div>
      </div>
    </div>
  )
}

