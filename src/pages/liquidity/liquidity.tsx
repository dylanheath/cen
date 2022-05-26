import React, {useState, useEffect, useContext} from 'react';

// context
import { UserContext } from '../../context/context';

// components
import LiquidityBox from '../../components/liquidity/liquidity';
import Settings from '../../components/popups/Settings';

// styling
import './liquidity.css';

export default function Liquidity() {
  const { User, setUser } = useContext<any>(UserContext);
  const [SettingsPopup, setSettingsPopup] = useState<boolean>(false);
  const [SlippageSettings, setSlippageSettings] = useState<number>(0);
  return (
    <div className="Liquidity-container">
        {SettingsPopup === true && (
          <div className="Settings-popup-container">
	    <Settings popupController={SettingsPopup} setPopupController={setSettingsPopup}
	     setSlippageController={setSlippageSettings} SlippageController={SlippageSettings} />
	  </div>
        )}
	<div className="Liquidity">
        <LiquidityBox Popup={SettingsPopup} setPopup={setSettingsPopup} Slippage={SlippageSettings} setSlippage={setSlippageSettings} />
      </div>
    </div>
  )
}

