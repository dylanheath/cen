import React, {useState, useEffect} from 'react';

// styling
import './Settings.css';

export default function Settings() {
  const [Slippage, setSlippage] = useState<number>(0);
  const [Popup, setPopup] = useState<boolean>(false);
  return (
    <div className="Settings-popups-container">
      <div className="Settings-popup">
        <div className="Settings-header-container">
          <p className="Settings-header">Transaction Settings</p>
	</div>
	<div className="Settings-options-container">
	  <div className="Settings-option-button-container">
            <button className="Slippage-option" onClick={() => setSlippage(0)}>0%</button>
	    <button className="Slippage-option" onClick={() => setSlippage(0.5)}>0.5%</button>
	    <button className="Slippage-option" onClick={() => setSlippage(1)}>1%</button>
	  </div>
	</div>
      </div>
    </div>
  )
}
