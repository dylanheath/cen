import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//interface
import { userInfo } from '../../modules/context/userInterface';

//context
import { UserContext } from '../../context/context';

// wallet
import { getActiveAccount, getAddress } from '../../utils/wallet';

//components
import TopLeftBox from '../../components/dashboard/topLeftBox';
import BottomLeftBox from '../../components/dashboard/bottomLeftBox';
import MiddleBox from '../../components/dashboard/middleBox';
import MiddleBottomTopLeft from '../../components/dashboard/middleBottomTopLeft';
import MiddleBottomTopRight from '../../components/dashboard/middleBottomTopRight';
import MiddleBottomLeft from '../../components/dashboard/middleBottomLeft';
import MiddleBottomRight from '../../components/dashboard/middleBottomRight';
import TopRightBox from '../../components/dashboard/topRightBox';
import BottomRightBox from '../../components/dashboard/bottomRightBox';
import XTZprice from '../../components/dashboard/XTZprice';
import Github from '../../components/dashboard/Github';
import ControlPanel from '../../components/dashboard/controlPanel';
import Tokens from '../../components/dashboard/Tokens';
import Lottery from '../../components/dashboard/Lottery';
import BuyCen from '../../components/dashboard/BuyCen';
import Farms from '../../components/farms/farms';
import Assets from '../../components/assets/assets';

//styling 
import './dashboard.css';

//loading animation
import { Ring } from '@uiball/loaders'

export default function Dashboard() {
  const {User, setUser} = useContext<any>(UserContext);
  const navigate = useNavigate();
  const [UserLoaded, setUserLoaded] = useState<boolean>(false);
  useEffect(() => {
    const checkForUser = async () => {
      const activeAccount = await getActiveAccount()
      const accountResponse = new Promise(function(resolve, reject){
		      if (User.status === false) {
			console.log("Wallet not Connected or User not found");
			reject(true);
			} else {
		         console.log("Wallet Connected & User found");
			 resolve(true);
			}
      })
      accountResponse.then(bool => setUserLoaded(true));
      if (!activeAccount) {
        navigate('/');
      }

  }
    checkForUser();
  }, [User])
  return (
    <div className="components-container">
    <div className="dashboard-container">
      {UserLoaded === true && (
      <div className="dashboard">
	<TopLeftBox />
	<MiddleBox />
	<Tokens />
	<MiddleBottomTopLeft />
	<Assets />
	<div className="Middle-grid-container">
	  <XTZprice /> 
	  <BuyCen />
	</div>
	<Farms />
	<div className="Bottom-right-top-grid-container">
	  <MiddleBottomLeft />
	  <MiddleBottomRight />
	</div>
      </div>
      )}
    </div>
      {UserLoaded === false && (
      <div className="Dashboard-loading-animation-container">
        <div className="Dashboard-loading-animation-center-container">
          <Ring
	    size={100}
	    speed={1.75}
	    color="rgb(33, 114, 229)"
	  />
	</div>
      </div>
      )}
    </div>
  ) 
}

