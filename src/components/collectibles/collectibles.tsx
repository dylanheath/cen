import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// context
import { UserContext } from '../../context/context';

// utils
import { api } from '../../utils/api';

// styling
import './collectibles.css'

interface NFTfields {
  name: string,
  description: string,
  creator: string,
  alias: any,
  display: string,
  collected: number,
}

export default function CollectiblesBox() {
  const { User, setUser } = useContext<any>(UserContext);
  const [NFTS, setNFTS] = useState<Array<string | null>>([null]);
  useEffect(() => {
    let isMounted = true;
    const fetchNFTS = async () => {
      const address = await User.address?.toString();
      const NFTcollection: Array<any> = [];
      if (User.status === true) {
        const getNFTs = await axios.get(`https://api.better-call.dev/v1/account/mainnet/${address}/token_balances`, { timeout: 4000 })
	  .then((response) => {
            const NFTdata = response.data.balances;
	    NFTdata.map((nft:any) => {
	      if (nft.token_id > 0 &&  nft.decimals === 0) {
	        const NFTobj: NFTfields = {
                  name: nft.name, 
		  description: nft.description,
                  creator: nft.creators,
		  alias: null, 
		  display: nft.display_uri.replace("ipfs://", ""),
		  collected: nft.balance,
	        }
                NFTcollection.push(NFTobj); 
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
        <div className="Collectibles">
          {NFTS.map((nftData:any) => (
	    <div className="collectible-container">
            <button className="collectible-template">
	      <img className="nft-image" src={`https://ipfs.io/ipfs/${nftData?.display}`} /> 
	      <div className="nft-information-container">
	        <div className="nft-name-collected-container">
	          <p className="nft-name">{nftData?.name.length > 19 ? nftData?.name.slice(0, - 3 ) + " ..." : nftData?.name}</p>
		  <p className="nft-collected">{nftData?.collected == 0 ? "1" : nftData?.collected} x</p>
		</div>
	      </div>
	    </button>
	    </div>
          ))}
        </div>
  )
}

