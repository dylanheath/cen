import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// context
import { UserContext } from '../../context/context';

// utils
import { api } from '../../utils/api';

// styling
import './collectibles.css'

export default function CollectiblesBox() {
  const { User, setUser } = useContext<any>(UserContext);
  const [NFTS, setNFTS] = useState<Array<string | null>>([null]);
  useEffect(() => {
    let isMounted = true;
    const fetchNFTS = async () => {
      const address = await User.address?.toString();
      const NFTcollection: Array<string> = [];
      if (User.status === true) {
        const getNFTs = await axios.get(`https://api.better-call.dev/v1/account/mainnet/${address}/token_balances`, { timeout: 4000 })
	  .then((response) => {
            const NFTdata = response.data.balances;
	    NFTdata.map((nft:any) => {
	      if (nft.token_id > 0 &&  nft.decimals === 0) {
                NFTcollection.push(nft); 
	      }
	    })
	    console.log(NFTdata);
	    setNFTS(NFTcollection);
	  })
	  .catch(() => {
            console.log('failed to get owned NFTS');
	  })
      } 
      isMounted = false;
    }
    fetchNFTS();
  }, [])
  return (
    <div className="Collectibles-container">
        <div className="Collectibles">
          {NFTS.map((nftData:any) => (
            <div className="collectible-template">
	      <img className="nft-image" src={`https://ipfs.io/ipfs/${nftData?.display_uri.replace("ipfs://", "")}`} /> 
	      <p className="nft-name">{nftData?.name}</p>
	    </div>
          ))}
        </div>
    </div>
  )
}

