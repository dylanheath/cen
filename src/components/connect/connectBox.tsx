import React, {useEffect, useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import axios, {AxiosError} from 'axios';

// context
import { UserContext } from '../../context/context';

// ui loading
import { Jelly } from '@uiball/loaders'

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
  const [RequestError , setRequestError] = useState<boolean>(false);
  const [IsChecked, setIsChecked] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(false);

  const handleOnChange = () => {
    setIsChecked(!IsChecked);
  };

  const ConnectWallet = async () => {
    const activeAccount = await getActiveAccount();
    let myAddress: String | undefined;
    if (!activeAccount) {
      const getAddress = await connectWallet();
      // @ts-ignore
      myAddress = getAddress;
      console.log('New connection: ', myAddress);
      setLoading(true);
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
          console.log(UserData);
	  setLoading(false);
        })
        .catch((reason: AxiosError) => {
	  if (reason.response!.status === 404) {
	    console.log("failed to connect to server, try again later");
	    setRequestError(true);
	    setLoading(false);
	  }
	  if (reason.response!.status === 400) {
	    navigate("/app/signup");
	    setLoading(false)
	  }
        });
      navigate('/app/dashboard');
    }
  };

  return (
    <div className="Connect-container">
      <div className="Connect-box">
        <div className="connect-header-container">
          <div className="connect-header">Connect Wallet</div>
	</div>
	<hr className="connect-divider"></hr>
        <div className="connect-accept-container">
	  <label className="container">
             <input type="checkbox" checked={IsChecked} onChange={handleOnChange} />
             <span className="checkmark"></span>
          </label>
	  <div className="connect-accept-details-container">
	    <div className="connect-accept-details"><p className="connect-details">I understand that this product is still in beta. I am participating at my own risk.</p></div>
	  </div>
        </div>
	<div className="connect-button-container">
	  {IsChecked && (
			  <button className="connect-button" onClick={ConnectWallet}>{Loading == false && (<p>Connect Wallet</p>)} {Loading == true && (
                          <Jelly 
                          size={40}
                          speed={1.3} 
                          color="white" 
                          />
			  )}</button>
	  )}
	  {!IsChecked && (
	    <button className="connect-button-false">Connect Wallet</button>
	  )}
	</div>
      </div>
    </div>
  )
}
