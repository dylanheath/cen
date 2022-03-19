import React from 'react';

// styling
import './Token.css';

export default function Token({TokensList} : {TokensList:Array<string>}) {
  console.log(TokensList);
  return (
    <div className="Token-template-container">
      {TokensList.map((tok:any) => (
        <div className="token-template">
          <div className="token-information-container">
	    <p className="token-name">{tok.symbol}</p>
	    <p className="token-balance">{tok.balance}</p>
          </div>
        </div>
      ))} 
    </div>
  )
}

