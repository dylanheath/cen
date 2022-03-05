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
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-left">
          <div className="dashboard-top-left-container">
	    <TopLeftBox />
	  </div>
	  <div className="dashboard-bottom-left-container">
	    <BottomLeftBox />
	  </div>
	</div>
	<div className="dashboard-middle">
	  <div className="dashboard-middle-top-container">      
	    <MiddleBox /> 
	  </div>
	  <div className="dashboard-middle-bottom-container">
	  </div>
        </div>
	<div className="dashboard-right">
	  <div className="dashboard-top-right-container">
	  </div>
	  <div className="dashboard-bottom-right-container">
	  </div>
	</div>
      </div>
    </div>
  ) 
}

