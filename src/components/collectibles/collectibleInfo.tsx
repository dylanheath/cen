import React, { useState, useEffect } from 'react';

// styling
import './collectibleInfo.css';

export default function CollectibleInfo({setCollectibleData, CollectibleData} : {setCollectibleData:any, CollectibleData:any}) {

  return (
    <div className="Collectible">
     <div className="collectible-box">
       <div className="collectible-image-container">
         <img className="collectible-image" src={`https://ipfs.io/ipfs/${CollectibleData.display}`} />
       </div>
       <div className="collectible-information-container">
         <div className="collectible-information-box">
	   <div className="collectible-header-container">
             <p className="collectible-name">{CollectibleData.name}</p>
	     <p className="collectible-symbol">{CollectibleData.symbol ? CollectibleData.symbol : "?"}</p>
	   </div>
	   <div className="collectible-description-container">
             <p className="collectible-description">{CollectibleData.description.length < 1000 ? CollectibleData.description.slice(0, 600) +  " ......" : CollectibleData.description}</p>
	   </div>
	   <div className="collectible-details-container">
	     <p className="collectible-detail">{CollectibleData.collected} x</p>
	     <p className="collectible-detail">{CollectibleData.type}</p>
	   </div>
         </div>
       </div>
     </div>
    </div>
  )
}

