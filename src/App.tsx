import React, { useState, useContext, useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// context
import { UserContext } from './context/context';

// components
import Navbar from './components/navbar/navbar';

// pages
import Home from './pages/home/home';
import Dashboard from './pages/dashboard/dashboard';
import Connect from './pages/connect/connect';
import NotFound from './pages/notFound/notFound';
import Swap from './pages/swap/swap';
import Send from './pages/send/send';
import Liquidity from './pages/liquidity/liquidity';
import Collectibles from './pages/collectibles/collectibles';
import AssetBoard from './pages/assetBoard/assetBoard';

// styling
import './App.css';
import './styling/colours.css';

//interfaces
import { userInfo } from './modules/context/userInterface'; 
import { page } from './context/pageInterface';

function App() {
  const [User, setUser] = useState<userInfo>({name: null, email: null, address: null, cid: null, contacts: null, status: false });
  const context = useContext(UserContext);
  const providerValue = useMemo(() => ({ User, setUser }), [User, setUser]);
  return (
    <div className="App">
      <BrowserRouter>
          <div className="Main">
	    <UserContext.Provider value={providerValue}>
	      <Navbar />
	      <div className="content">
	        <Routes>
	          <Route path="/" element={<Home />} />
	          <Route path="/app/dashboard" element={<Dashboard />} />
		  <Route path="/app/connect" element={<Connect />} />
		  <Route path="/app/swap" element={<Swap />} />
		  <Route path="/app/send" element={<Send />} />
		  <Route path="/app/liquidity" element={<Liquidity />} />
		  <Route path="/app/collectibles" element={<Collectibles />} />
		  <Route path="/app/assets" element={<AssetBoard />} />
		  <Route path="*" element={<NotFound />} />
	        </Routes>
	      </div>
	    </UserContext.Provider>
	  </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

