import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// styling
import './connect.css';

//context
import { UserContext } from '../../context/context';

//wallet
import { getActiveAccount, getAddress } from '../../utils/wallet';

// components
import ConnectBox from '../../components/connect/connectBox';

// loading animations
import { MrMiyagi, Pinwheel, Pulsar, RaceBy, Ring, SuperBalls } from '@uiball/loaders';

export default  function Connect() {
  const {User, setUser} = useContext<any>(UserContext);
  const [BetaAccept, setBetaAccept] = useState<boolean>(false);
  const [Loaded, setLoaded] = useState<boolean>(true);
  const navigate = useNavigate();
  useEffect(() => {
    const checkForUser = async () => {
      const activeAccount = await getActiveAccount();
      if (activeAccount) {
        console.log('wallet already connected');
	setLoaded(true);
	navigate('/app/dashboard');
      } else if (User.status === true) {
	console.log('wallet already connected');
	setLoaded(true);
        navigate('/app/dashboard'); 
      }
    }
  }, [])
  return (
    <div className="Connect">
      {Loaded == true && (
        <ConnectBox Uiload={Loaded} setUiload={setLoaded} />
      )}
      {Loaded == false && (
        <div className="Connect-loading-animation">
         <Pinwheel
           size={240}
 	   speed={1} 
 	  color="rgb(33, 114, 229)" 
	 /> 
	</div>
      )}
    </div>
  )
}

