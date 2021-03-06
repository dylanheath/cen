import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios, {AxiosError} from 'axios';

//context
import { UserContext } from '../../context/context';
import { pageContext  } from '../../context/pageContext';

//interfaces
import { apiLink } from '../../modules/api/apiInterface'; 
import { addressInfo } from '../../modules/account/addressInterface';
import { userInfo } from '../../modules/context/userInterface';

//api
import { api } from '../../utils/api';
import { ipfs } from '../../utils/ipfs';

// components
import Dropdown from './dropdown';

//assets
import logo from '../../assets/cen/CenWhite.png';
import defaultpic from '../../assets/default.png';

//styling
import './navbar.css';

//wallet
import { connectWallet, disconnectWallet, getActiveAccount, checkIfWalletConnected } from '../../utils/wallet';

const Navbar = ({Loaded, setLoaded}: {Loaded:any, setLoaded:any}) => {
  const { User, setUser } = useContext<any>(UserContext);
  const navigate = useNavigate();
  const [address, setAddress] = useState<Partial<addressInfo>>({});
  const [ConnectionState, setConnectionState] = useState<boolean | null>(false);
  const [pfp, setPfp] = useState<any>(null);
  const [loadedPfp, setLoadedPfp] = useState<any>({loaded: false});
  const [currentPage, setCurrentPage] = useState<any>({currentPage: null});
  const [DropdownState, setDropdownState] = useState<boolean | null>(null);
  const [LoadingState, setLoadingState] = useState<string | boolean | null>(null);
  const [RequestError, setRequestError] = useState<boolean>(false);

  const Logout = async () => {
    const disconnectFromCen = await disconnectWallet();
    setUser({name: null, email: null, address:  null, cid: null, contacts: null, token: null, status: false});
    setConnectionState(null);
    navigate('/');
  };

  useEffect(() => {
    async function checkForAccount() {
      const activeAccount = await getActiveAccount();
      let myAddress: String | undefined;
      setLoaded(false);
      if (activeAccount) {
        myAddress = activeAccount.address;
        await axios.get(`${api.url}/user/${myAddress}`)
          .then((response) => {
            const UserData = response.data;
            console.log(UserData);
            const userdata = {
              name: UserData.User,
              address: activeAccount.address,
              cid: UserData.CID,
              email: UserData.Email,
              contacts: UserData.Contacts,
	      token: UserData.Token,
	      status: true,
            };
            console.log(UserData);
            setUser(userdata);
	    setLoaded(true);
            console.log('data has been received');
          })
          .catch(() => {
	    setLoaded(true);
            console.log('error grabbing user');
          });
        setAddress({address:`${myAddress?.slice(0, 5)}....${myAddress?.slice(myAddress.length - 5)}`});
        setConnectionState(true);
	setLoaded(true);
        navigate('/app/dashboard');
	setCurrentPage({currentPage: "dashboard"});
      } else {
       setLoaded(true);
      }
    }
    checkForAccount();
    setCurrentPage("dashboard");
  }, []);
  // eslint-disable-next-line no-unused-vars
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
      setLoadingState(true);
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
	  setLoadingState(false);
        })
        .catch((reason: AxiosError) => {
	  if (reason.response!.status === 404) {
	    console.log("failed to connect to server, try again later");
	    setRequestError(true);
	  }
	  if (reason.response!.status === 400 || 204) {
	    navigate("/app/signup");
	  }
        });
      setAddress({address:`${myAddress?.slice(0, 5)}...${myAddress?.slice(myAddress.length - 5)}`});
      navigate('/app/dashboard');
    }
  };
  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <Link to="/app/dashboard">
            <img src={logo} />
          </Link>
        </div>
        <div className="Navigation-container">
          {User?.status === true && (
            <div className="gpt3__navbar-links_container">
              <div className="Dashboard-link-container">
                <Link to="/app/dashboard">
		  <button className="Nav-button-dashboard" style={currentPage.currentPage == 'dashboard' ? {background: '#171f30', color: '#fff'} : {}} onClick={() => setCurrentPage({currentPage: 'dashboard'})}>
                    <p style={currentPage.currentPage == 'dashboard' ? {color: '#fff'} : {}} className="Dashboard-nav">Dashboard</p>
		  </button>
                </Link>
              </div>
              <div className="Send-link-container">
                <Link to="/app/send">
		  <button className="Nav-button" style={currentPage.currentPage == 'send' ? {background: '#171f30'} : {}} onClick={() => setCurrentPage({currentPage: 'send'})}>
                    <p style={currentPage.currentPage == 'send' ? {color: '#fff'} : {}} className="Send-nav">Send</p>
		  </button>
                </Link>
              </div>
              <div className="Explore-link-container">
                <Link to="/app/explore">
		  <button className="Nav-button" style={currentPage.currentPage == 'explore' ? {background: '#171f30'} : {}} onClick={() => setCurrentPage({currentPage: 'explore'})}>
                    <p style={currentPage.currentPage == 'explore' ? {color: '#fff'} : {}} className="Explore-nav">Explore</p>
		  </button>
                </Link>
              </div>
              <div className="Receive-link-container">
	        <button className="Nav-button" onClick={DropdownState ? () => setDropdownState(null) : () => setDropdownState(true)}>
                  <p style={currentPage.currentPage == 'receive' ? {color: '#fff'} : {}} className="Receive-nav">More</p>
	        </button>
              </div>
	      {DropdownState && (
                <div className="Dropdown-container">
                  <Dropdown state={setDropdownState} />
		</div>
	      )}
            </div>
          )}
        </div>
      </div>
      {!User.status == false && (
      <div className="gpt3__navbar-sign">
        <button type="button" onClick={Logout}>Disconnect</button>
      </div>
     )}
    </div>
  );
};

export default Navbar;
