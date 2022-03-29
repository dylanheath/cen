import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// context
import { UserContext } from '../../context/context';

// utils
import { api } from '../../utils/api';

// styling
import './collectibles.css'

export default function Collectible() {
  const { User, setUser } = useContext<any>(UserContext);
  const [NFTS, setNFTS] = useState<string>('');
  useEffect(() => {
    const fetchNFTS = async () => {
      let isMounted = true;
      if (User.status == true && isMounted == true) {
        const getNFTs = await axios.get(`https://api.better-call.dev/v1/account/mainnet/${User.address}/token_balance`)
	  .then((response) => {
            const NFTdata = response.data;
	    setNFTS(NFTdata);
	  })
	  .catch(() => {
            console.log('failed to get owned NFTS');
	  })
      } 
    }
  }, [])
  return (
    <div className="Collectibles">
      <div className="collectibles-container">
      </div>
    </div>
  )
}

