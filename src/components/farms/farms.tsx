import React, { useState, useEffect } from 'react';
import axios from 'axios';

// styling
import './farms.css';

export default function Farms() {
  const [AvailableFarms, setAvailableFarms] = useState<Array<string>>(['']);
  const [Tokens, setTokens] = useState<Array<string>>(['']);
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
    if (isMounted == true) {
      const fetchFarms = async () => {
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
      }
      fetchFarms();
    }
  }, [])
  return (
    <div className="Farms">
      <div className="farms-header-container">
        <p className="farms-header">Farms</p>
	<button className="farms-header-button">View All</button>
      </div>
      <div className="farms-container">
        <div className="farms-detail-header-container">
	</div>
      </div>
    </div>
  )
}

