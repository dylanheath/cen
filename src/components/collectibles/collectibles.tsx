import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// context
import { UserContext } from '../../context/context';

// components
import CollectibleInfo from './collectibleInfo';

// assets
import DefaultIcon from '../../assets/default.png';

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
  symbol: string,
}

export default function CollectiblesBox() {
  const { User, setUser } = useContext<any>(UserContext);
  const [NFTS, setNFTS] = useState<Array<string | null>>([null]);
  const [NFTpopup, setNFTpopup] = useState<string | null>(null);
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
		  symbol: nft.symbol,
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
    <div>
      {NFTpopup && (
        <div className="collectible-popup-container">
          <CollectibleInfo setCollectibleData={setNFTpopup} CollectibleData={NFTpopup} />
	</div>
      )}
        <div className="Collectibles">
          {NFTS.map((nftData:any) => (
	   <div>
	    <div className="collectible-container">
            <button className="collectible-template" onClick={() => setNFTpopup(nftData)}>
	      <img className="nft-image" src={`https://ipfs.io/ipfs/${nftData?.display}`} onError={(e) => { (e.target as HTMLImageElement).src = DefaultIcon}} /> 
	      <div className="nft-information-container">
	        <div className="nft-name-collected-container">
	          <p className="nft-name">{nftData?.name.length > 19 ? nftData?.name.slice(0, - 3 ) + " ..." : nftData?.name}</p>
		  <p className="nft-collected">{nftData?.collected == 0 ? "1" : nftData?.collected} x</p>
		</div>
	      </div>
	    </button>
	    </div>
	   </div>
          ))}
        </div>
    </div>
  )
}

