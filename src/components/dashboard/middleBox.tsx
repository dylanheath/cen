import React, { useState, useEffect } from 'react';
import axios from 'axios';

// api
import { api } from '../../utils/api';

// styling
import './dashboard.css';

export default function MiddleBox() {
  const [TotalTransactions, setTotalTransactions] = useState<number>(0); 
  const [TotalAmount, setTotalAmount] = useState<number>(0);
  useEffect(() => {
    const getAnalytics = async () => {
      const getTotalTransactions = await axios.get(`${api.url}/transactions/totaltransactions`, { timeout: 2000 })
        .then((response) => {
          const TotalTransactionsData = response.data;
	  setTotalTransactions(TotalTransactions);
        })
	.catch((response) => {
          console.log('failed to grab total transactions');
	})
      const getTotalAmount = await axios.get(`${api.url}/transactions/totalamount`, { timeout: 2000 })
        .then((response) => {
          const TotalAmountData = response.data;
	  setTotalAmount(TotalAmountData);
        })
	.catch(() => {
          console.log('failed to grab total amount');
	})
    }
  })
  return (
    <div className="Middle-top">
      <div className="Middle-top-box">
        <div className="Middle-top-header-container">
	  <p className="Middle-top-header">Analytics</p>
	</div>
	<div className="Middle-top-analytics-container">
	  <div className="Middle-top-total-header">
	    <p className="Middle-top-total-transactions">{TotalTransactions}</p>
	  </div>
	  <div className="Middle-top-transferred-container">
	    <p className="Middle-top-transferred">{TotalTransferred} XTZ</p>
	  </div>
	</div>
      </div>
    </div>
  )
}

