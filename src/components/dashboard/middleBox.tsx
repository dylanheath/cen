import React, { useState, useEffect } from 'react';
import axios from 'axios';

// api
import { api } from '../../utils/api';

// styling
import './dashboard.css';

export default function MiddleBox() {
  const [TotalTransactions, setTotalTransactions] = useState<number>(0); 
  const [TotalAmount, setTotalAmount] = useState<number>(0);
  const [TotalAmountConverted, setTotalAmountConverted] = useState<number>(0);
  useEffect(() => {
    const getAnalytics = async () => {
      const getTotalTransactions = await axios.get(`${api.url}/transactions/totaltransactions`, { timeout: 5000 })
        .then((response) => {
          const TotalTransactionsData = response.data;
	  setTotalTransactions(TotalTransactionsData);
        })
	.catch((response) => {
          console.log('failed to grab total transactions');
	})
    }
   getAnalytics();
  }, [])
  return (
    <div className="Middle-top">
      <div className="Middle-top-box">
        <div className="Middle-top-header-container">
	  <p className="Middle-top-header">Analytics</p>
	  <button className="Middle-top-personal-analytics" type="button">Personal Analytics</button>
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

