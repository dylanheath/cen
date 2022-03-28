import React, { useState, useEffect, useContext } from 'react';

// context
import { UserContext } from '../../context/context';

// utils
import { tokens } from '../../utils/tokens';

// styling
import './liquidity.css'; 

// assets
import DownArrow from '../../assets/arrowdown.png';
import ArrowOut from '../../assets/In.png';
import CENicon from '../../assets/CEN.png';

export default function LiquidityBox() {
  const { User, setUser } = useContext<any>(UserContext);
  const [CenOutput, setCenOutput] = useState<number>(0);
  const [PoolShare, setPoolShare] = useState<number>(0);
  const [CenPerXTZ, setCenPerXTZ] = useState<number>(0);
  const [XtzPerCEN, setXtzPerCEN] = useState<number>(0);
  return (
    <div>
    <div className="Liquidity-box">
      <div className="liquidity-header-container">
        <p className="liquidity-header">Liquidity</p> 
	<button className="liquidity-header-button" type="button">More</button>
      </div>
      <div className="liquidity-input-container">
        <div className="liquidity-amount-input-box">
          <input className="liquidity-amount-input" placeholder="0.0" type="text" pattern="^[0-9]*[.,]?[0-9]*$" inputMode="decimal" defaultValue="0.00" />
	  <div className="liquidity-token-select-container">
            <button className="liquidity-token-select" type="button">
              <div className="liquidity-token-select-content">
                <img className="liquidity-token-select-icon" src={tokens.XTZ.image} />
	        <p className="liquidity-token-select-name">XTZ</p>
                <img className="liquidity-token-down-arrow" src={DownArrow} />
	      </div>
	    </button>
	  </div>
	</div>
      </div>
      <div className="liquidity-arrow-down-container">
        <img className="liquidity-arrow-down" src={ArrowOut} />
      </div>
      <div className="liquidity-output-container">
        <div className="liquidity-output-box">
          <div className="liquidity-amount-container">
            <p className="liquidity-amount">{CenOutput}</p>
	    <div className="liquidity-token-select-container">
	      <button className="liquidity-token-select-button" type="button">
                <div className="liquidity-token-select-content-container">
                  <img className="liquidity-token-select-icon" src={CENicon} />
		  <p className="liquidity-token-name">CEN</p>
		</div>
	      </button> 
	    </div>
	  </div>
	</div>
      </div>
      <div className="liquidity-add-container">
        <button className="liquidity-add" type="button">Add</button>
      </div>
    </div>
    <div className="liquidity-data-container">
      <div className="liquidity-data-box">
        <div className="Cen-data">
          <p className="liquidity-data-header">CEN per XTZ</p>
	  <p className="liquidity-data">{CenPerXTZ}</p>
        </div>
        <div className="XTZ-data">
          <p className="liquidity-data-header">XTZ per CEN</p>
	  <p className="liquidity-data">{XtzPerCEN}</p>
        </div>
        <div className="Pool-share">
          <p className="liquidity-data-header">Pool Share</p>
	  <p className="liquidity-data">{PoolShare}</p>
        </div>
      </div>
    </div>
    </div>
  )
}
