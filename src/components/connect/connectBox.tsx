import React, {useEffect, useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// context
import { UserContext } from '../../context/context';

// assets
import CenLogo from '../../assets/cen/CenWhite.png'

// styling
import './connect.css';

// utils
import { api } from '../../utils/api';

// utils
import { connectWallet, disconnectWallet, getActiveAccount, checkIfWalletConnected } from '../../utils/wallet';

export default function ConnectBox() {
  const { User, setUser } = useContext<any>(UserContext);
  const navigate = useNavigate();
  const [ConnectionState, setConnectionState] = useState<boolean>(false);
  const [BetaAccept, setBetaAccept] = useState<boolean>(false);

  const ConnectWallet = async () => {
    const activeAccount = await getActiveAccount();
    let myAddress: String | undefined;
    if (!activeAccount) {
      const getAddress = await connectWallet();
      // @ts-ignore
      myAddress = getAddress;
      console.log('New connection: ', myAddress);
      // eslint-disable-next-line no-unused-vars
      myAddress = getAddress.toString();
      setConnectionState(true);
      // eslint-disable-next-line no-unused-vars
      await axios.get(`${api.url}/user/${myAddress}`)
        .then((response) => {
          const UserData = response.data;
          const userdata = {
            name: UserData.User,
            address: myAddress,
            cid: UserData.CID,
            email: UserData.Email,
            contact: UserData.Contacts,
	    token: UserData.Token,
	    status: true,
          };
          setUser(userdata);
	  // setPfp(`${ipfs.url}${UserData.CID}`);
          console.log(UserData);
          console.log('data has been received');
        })
        .catch(() => {
          console.log('error grabbing user');
          navigate('/app/signup');
        });
      navigate('/app/dashboard');
    }
  };

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
