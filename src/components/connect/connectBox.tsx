import React, {useEffect, useState, useContext} from 'react';

// context
import { UserContext } from '../../context/context';

// assets
import CenLogo from '../../assets/cen/CenWhite.png'

// styling
import './connect.css';

// utils
import { connectWallet, getActiveAccount } from '../../utils/wallet';

export default function ConnectBox() {
  const { User, setUser } = useContext<any>(UserContext);
  const [BetaAccept, setBetaAccept] = useState<boolean>(false);
  return (
    <div className="Connect-container">
      <div className="Connect-box">
        <div className="connect-accept-container">

	</div>
	<hr className="connect-divider"></hr>
        <div className="connect-content-container">
        </div>
	<div className="connect-button-container">
          <button className="connect-button">Connect Wallet</button>
	</div>
      </div>
    </div>
  )
}
