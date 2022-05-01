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
	  <div className="token-container" key={tok.id}>
            <div className="token-template">
              <div className="token-information-container">
	        <div className="token-icon-name-container">
		<img className="token-icon" src={(`/${tok.token.metadata.symbol}.png`)} onError={(e) => { (e.target as HTMLImageElement).src = DefaultIcon}} />
	          <p className="token-name">{tok.token.metadata.symbol}</p>
		</div>
	        <p className="token-balance">{tok?.balance > 0 ? tok.balance.slice(0, Number(tok.token.metadata.decimals)) + "." + tok.balance.slice(Number(- tok.token.metadata.decimals)) : tok.balance}</p>
              </div>
            </div>
	  </div>
	</div>
      ))} 
    </div>
    )}
    </div>
  )
}

