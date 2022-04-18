import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//context
import { UserContext } from '../../context/context';

//wallet
import { getActiveAccount, getAddress } from '../../utils/wallet';

export default  function Connect() {
  const {User, setUser} = useContext<any>(UserContext);
  const [BetaAccept, setBetaAccept] = useState<boolean>(false);

  const navigate = useNavigate();
  useEffect(() => {
    const checkForUser = async () => {
      const activeAccount = await getActiveAccount();
      if (activeAccount) {
        console.log('wallet already connected');
	navigate('/app/dashboard');
      } else if (User.status === true) {
	console.log('wallet already connected');
        navigate('/app/dashboard'); 
      }
    }
    checkForUser();
  }, [])
  return (
    <div className="Connect">
      <div className="connect-container">

      </div>
    </div>
  )
}

