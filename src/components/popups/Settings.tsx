import React, {useState, useEffect} from 'react';

// styling
import './Settings.css';

export default function Settings() {
  const [Slippage, setSlippage] = useState<number>(0);
  const [Popup, setPopup] = useState<boolean>(false);
  return (
    <div className="Settings-popup-container">
      <div className="Settings-popup">

      </div>
    </div>
  )
}
