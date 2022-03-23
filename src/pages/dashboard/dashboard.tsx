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

//styling 

import './dashboard.css';

export default function Dashboard() {
  const {User, setUser} = useContext<any>(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const checkForUser = async () => {
      const activeAccount = await getActiveAccount();
      if (!activeAccount) {
    	console.log('Wallet not connected');
        navigate('/app/connect');
      } else if (User.status === false) {
	navigate('/app/signup');
      } 
    }
    checkForUser();
  }, [User])
  return (
    <div className="dashboard-container">
      <div className="dashboard">
	<TopLeftBox />
	<MiddleBox />
	<Tokens />
	<MiddleBottomTopLeft />
	<BottomLeftBox />
	<div className="Middle-grid-container">
	  <XTZprice /> 
	  <div className="Middle-bottom-grid-container">
	    <MiddleBottomLeft />
	    <MiddleBottomRight />
	  </div>
	</div>
	<TopRightBox />
	<div className="Bottom-right-top-grid-container">
	  <MiddleBottomLeft />
	  <MiddleBottomRight />
	</div>
      </div>
    </div>
  ) 
}

