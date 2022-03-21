import React from 'react';

// styling
import './Token.css';

// utils
import { tokens } from '../../utils/tokens';

// assets
import DefaultIcon from '../../assets/default.png';

export default function Token({TokensList} : {TokensList:Array<string>}) {
  return (
    <div>
    {TokensList  && (
    <div className="Token-template-container">
      {TokensList.map((tok:any) => (
        <div>
	  <div className="token-container">
            <div className="token-template">
              <div className="token-information-container">
	        <div className="token-icon-name-container">
		<img className="token-icon" src={require(`../../assets/${tok.symbol}.png`).default} onError={(e) => { (e.target as HTMLImageElement).src = DefaultIcon}} />
	          <p className="token-name">{tok.symbol}</p>
		</div>
	        <p className="token-balance">{tok.balance}</p>
              </div>
            </div>
	  </div>
	  <hr className="token-divider"></hr>
	</div>
      ))} 
    </div>
    )}
    </div>
  )
}

