import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// styling
import './farms.css';

//context
import { UserContext } from '../../context/context';

// assets
import PlentyXTZ from '../../assets/farms/plenty-xtz.png'
import PlentyCtez from '../../assets/farms/plenty-ctez.png';

export default function Farms() {
  const { User, setUser } = useContext<any>(UserContext);
  const [AvailableFarms, setAvailableFarms] = useState<Array<string>>(['']);
  const [Tokens, setTokens] = useState<Array<string>>(['']);
  const [AvailableRewards, setAvailableRewards] = useState<string | number>("0.00");
  useEffect(() => {
    const LocalFarms = localStorage.getItem('farms');
    const LocalAssets = localStorage.getItem('assets');
    if (LocalFarms) {
      setAvailableFarms(JSON.parse(LocalFarms));
    }
    if (LocalAssets) {
      setTokens(JSON.parse(LocalAssets)); 
    }
    const isMounted = true;
    if (isMounted == true && User.status == true) {
      const fetchFarms = async () => {
	const address = await User.address?.toString();
        const getFarmsBatch = await axios.get(`https://bafybeigogwwmiyuahrfw2qbclpoiausrgbb5ju2jsmx5p7i6wmynvmden4.ipfs.dweb.link/`)
          .then((response) => {
          const FarmBatch = response.data;
	  setAvailableFarms(FarmBatch);
	  localStorage.setItem('farms', JSON.stringify(FarmBatch));
	  })
	  .catch(() => {
            console.log('failed to get farms');
          })

	const getTokens = await axios.get(`https://api.teztools.io/token/prices`)
	  .then((response) => {
            const TokensData = response.data;
            setTokens(TokensData);
	    localStorage.setItem('assets', JSON.stringify(TokensData));
	  })
	  .catch(() => {
            console.log('failed to fetch tokens');
	  })

	const PlentyXTZ = await axios.get(`https://api.tzkt.io/v1/contracts/KT1JQAZqShNMakSNXc2cgTzdAWZFemGcU6n1/bigmaps/balances/keys/${address}`)
          .then((response) => {
          const PlentyXTZdata = response.data;
	  })
	  .catch(() => {
            console.log("failed to get xtz lp");
	  })
  
	const PlentyCtez = await axios.get(`https://api.tzkt.io/v1/contracts/KT1MfMMsYX34Q9cEaPtk4qkQ6pojA7D2nsgr/bigmaps/balances/keys/${address}`)
          .then((response) => {
            const PlentyCtezdata = response.data;
	  })
	  .catch(() => {
            console.log("failed to get ctez lp");
	  })
      }
      fetchFarms();
    }
  }, [])
  return (
    <div className="Farms">
      <div className="farms-header-container">
        <p className="farms-header">Farms</p>
	<button className="farms-header-button">View More</button>
      </div>
      <div className="farms-analytics-container">
        <div className="farms-analytics-header-container">
          <p className="farms-analytics-header">Available Rewards</p>
	</div>
	<div className="farms-analytics-amount-container">
	  <p className="farms-available-rewards">0.00</p> 
	  <p className="farms-available-rewards-xtz">XTZ</p>
	</div>
	<p className="farms-available-rewards-usd">$0.00</p>
      </div>
      <div className="farm-boxes-container">
      <div className="farms-box-container">
      <div className="farms-container">
        <div className="farms-detail-header-container">
          <img className="farm-icon" src={PlentyXTZ} />
	  <div className="farm-details-container">
	    <p className="farms-detail-header">PLENTY / XTZ LP</p>
	    <div className="farms-pool-detail-icon-container">
	      <p className="farms-plenty-lp">Plenty LP</p>
	    </div>
	  </div>
	</div>
	<div className="farms-rewards-price-container">
          <p className="farms-rewards-price-header">Available Rewards:</p>
	  <p className="farms-rewards-price">0</p>
	</div>
	<div className="farms-rewards-harvest-button-container">
          <button className="farms-rewards-harvest-button">
	  Harvest
	  </button>
	</div>
      </div>
      </div>
      <div className="farms-box-container">
      <div className="farms-container">
        <div className="farms-detail-header-container">
          <img className="farm-icon" src={PlentyCtez} />
	  <div className="farm-details-container">
	    <p className="farms-detail-header">PLENTY / Ctez LP</p>
	    <div className="farms-pool-detail-icon-container">
	      <p className="farms-plenty-lp">Plenty LP</p>
	    </div>
	  </div>
	</div>
	<div className="farms-rewards-price-container">
          <p className="farms-rewards-price-header">Available Rewards:</p>
	  <p className="farms-rewards-price">0</p>
	</div>
	<div className="farms-rewards-harvest-button-container">
          <button className="farms-rewards-harvest-button">
	  Harvest
	  </button>
	</div>
      </div>
      </div>
      </div>
    </div>
  )
}

