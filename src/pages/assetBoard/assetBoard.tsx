import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AssetBoard() {
  const [TokenData, setTokenData] = useState<Array<string>>([""]);
  useEffect(() => {
    const LocalAssets = localStorage.getItem('assets');
    if (LocalAssets) {
      setTokenData(JSON.parse(LocalAssets));
    }
    const fetchTokens = async () => {
      const isMounted = true;
      if (isMounted == true) {
      const getTokens = await axios.get(`https://api.teztools.io/token/prices`)
        .then((response) => {
          const TokensResponse = response.data;
	  setTokenData(TokensResponse);
        })
	.catch(() => {
          console.log('failed to fetch tokens');
	})
      }
    }
    fetchTokens();
  }, [])
  return (
   <div className="AssetBoard">

   </div>
  )
}

