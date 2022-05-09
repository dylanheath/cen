import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// utils
import { tokens } from '../../utils/tokens';

// assets
import ArrowDown from '../../assets/arrowdown.png';
import ArrowIn from '../../assets/In.png';
import CenIcon from '../../assets/CEN.png';

// styling
import './swap.css';

export default function Swap() {
  const [CoinAmountInputOne, setCoinAmountInputOne] = useState<number>(0);
  const [CoinAmountOutput, setCoinAmountOutput] = useState<number>(0);
  return (
    <div className="Swap">
      <div className="swap-container">
        <div className="swap-box">
	  <div className="swap-header-container">
	    <p className="swap-header">Swap</p>
	    <button className="swap-header-button">Settings</button>
	  </div>
	  <div className="swap-input-container">
	    <div className="swap-amount-input-box">
              <input className="swap-amount-input" placeholder="0.0" type="text" pattern="^[0-9]*[.,]?[0-9]*$" inputMode="decimal" defaultValue="0.00"/>
	      <div className="swap-token-select-container">
                <button className="swap-token-select-button">
		  <div className="swap-token-select-content-container">
		    <img className="swap-token-select-icon" src={tokens.XTZ.image} />
		    <p className="swap-token-select-name">XTZ</p>
		    <img className="swap-token-arrow-down" src={ArrowDown} />
		  </div>
		</button>
	      </div>
	    </div>
	  </div>
	  <div className="swap-arrow-down-container">
	    <img className="swap-arrow-down" src={ArrowIn} />
	  </div>
	  <div className="swap-output-container">
	    <div className="swap-output-button">
              <div className="swap-amount-container">
                <p className="swap-amount">{CoinAmountOutput == 0 ?  "0.00" : CoinAmountOutput}</p>
		<div className="swap-token-select-container">
                  <button className="swap-token-select-button">
                    <div className="swap-token-select-content-container">
                      <img className="swap-token-select-icon" src={CenIcon} /> 
		      <p className="swap-token-select-name">CEN</p>
		      <img className="swap-token-arrow-down" src={ArrowDown} />
		    </div>
		  </button>
		</div>
	      </div>
	    </div>
	  </div>
	  <div className="swap-button-container">
	    <button className="swap-button">Swap</button>
	  </div>
	</div>
      </div>
    </div>
  )
}

