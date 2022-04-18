import React from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

// assets
import TransactionIcon from '../../assets/transaction.png';

export default function MiddleBottomLeft() {
  const navigate = useNavigate();
  const TransactionNav = () => {
    navigate("/app/transactions/view");
  };
  return (
    <div className="Middle-bottom-grid-box">
      <div className="Middle-bottom-grid-header-container">
        <p className="Middle-bottom-grid-header">Transactions</p>
	<img className="Middle-bottom-grid-header-icon" src={TransactionIcon} />
      </div>
      <div className="Middle-bottom-grid-content-container">
        <p className="Middle-bottom-grid-content">View all Transaction & Swap data on Cen</p>
      </div>
      <div className="Middle-bottom-grid-button-container">
        <button className="Middle-bottom-grid-button" type="button" onClick={TransactionNav}>View</button>
      </div>
    </div>
  )
}

