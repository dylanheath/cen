import React, { useState } from 'react';
import './Transactions.css';

// asssets
import DefaultIcon from '../../assets/default.png';
import AmountIn from '../../assets/In.png';
import AmountOut from '../../assets/Out.png';

export default function ComponentTransactions({TransanctionData, currentUser} : {TransanctionData:any, currentUser:any}) {
  return (
    <div className="Transaction">
      <div className="Transaction-box">
        {TransanctionData.map((transaction: any) => ( 
          <div className="transaction-template-container" key={transaction.id}>
	    <button className="transactions-template" type="button">
	      <div className="transaction-account-container">
	        {transaction.sender === currentUser ? <div className="transaction-icon-circle" style={{border: '1px solid #f1243d'}}><img className="transaction-account-picture" src={AmountOut} /></div> 
		: <div className="transaction-icon-circle" style={{border: '1px solid green'}}><img className="transaction-account-picture" src={AmountIn} /></div> }
	        <p className="transaction-account-name">{transaction?.receiverdata?.name}</p>
	      </div>
	      {transaction.sender === currentUser ? <p className="transaction-amount">- {transaction.amount / 1000000} XTZ</p> 
	        : <p className="transaction-amount-in">+ {transaction.amount / 1000000}</p>}
	    </button>
	  </div>
	))}
      </div>
    </div>
  )
}


