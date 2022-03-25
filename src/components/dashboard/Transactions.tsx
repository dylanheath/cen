import React, { useState } from 'react';
import './Transactions.css';

// default icon
import DefaultIcon from '../../assets/default.png';

export default function ComponentTransactions({TransanctionData, currentUser} : {TransanctionData:any, currentUser:any}) {
  return (
    <div className="Transaction">
      <div className="Transaction-box">
        {TransanctionData.map((transaction: any) => ( 
          <div className="transaction-template-container" key={transaction.id}>
	    <button className="transactions-template" type="button">
	      <div className="transaction-account-container">
	        <img className="transaction-account-picture" src={DefaultIcon} />
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


