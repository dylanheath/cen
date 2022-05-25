import React, {useState, useEffect} from 'react';

// styling
import './Settings.css';

export default function Settings({popupController, setPopupController,
	SlippageController, setSlippageController}: {popupController:any, setPopupController:any,
	SlippageController:any, setSlippageController:any}) {

  return (
    <div className="Settings-popups-container">
      <div className="Settings-popup">
        <div className="Settings-header-container">
          <p className="Settings-header">Transaction Settings</p>
	  <div className="Settings-close-button-container">
	    <button className="Settings-close-button" onClick={() => setPopupController(false)}>back</button>
	  </div>
	</div>
	<div className="Settings-options-container">
	  <p className="Slippage-tag">Quick Select</p>
	  <div className="Settings-option-button-container">
	    <button className="Slippage-option" onClick={() => setSlippageController(0.5)}>Auto</button>
            <button className="Slippage-option" onClick={() => setSlippageController(0)}>0%</button>
	    <button className="Slippage-option" onClick={() => setSlippageController(0.5)}>0.5%</button>
	    <button className="Slippage-option" onClick={() => setSlippageController(1)}>1%</button>
	  </div>
	  <p className="Slippage-custom-tag">Custom</p>
	  <div className="Slippage-custom-container">
            <input className="Slippage-custom-input" placeholder="0.00%" /> 
	  </div>
	</div>
      </div>
    </div>
  )
}
