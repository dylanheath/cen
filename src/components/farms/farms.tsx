import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// styling
import './farms.css';

//context
import { UserContext } from '../../context/context';

// utils
import { api } from '../../utils/api';

// assets
import PlentyXTZ from '../../assets/farms/plenty-xtz.png'
import PlentyCtez from '../../assets/farms/plenty-ctez.png';
import XTZprice from '../dashboard/XTZprice';

export default function Farms() {
  const { User, setUser } = useContext<any>(UserContext);
  const [AvailableFarms, setAvailableFarms] = useState<Array<string>>(['']);
  const [Tokens, setTokens] = useState<Array<string>>(['']);
  const [TotalStakingUSD, setTotalStakingUSD] = useState<number>(0);
  const [TotalStakingXTZ, setTotalStakingXTZ] = useState<string | number>("0.00");
  const [XTZprice, setXTZprice] = useState<number>(0);
  const [XTZfarm, setXTZfarm] = useState<number>(0);
  const [CTEZfarm, setCTEZfarm] = useState<number>(0);
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
	
	const getPrice = await axios.get(`${api.url}/price/xtz`)
	    .then((response) => {
              const PriceData = response.data[0];
	      setXTZprice(PriceData.Price);
	    })
	    .catch(() => {
               console.log("failed to get price");
	    })

	axios.all([axios.get(`https://api.tzkt.io/v1/contracts/KT1JQAZqShNMakSNXc2cgTzdAWZFemGcU6n1/bigmaps/balances/keys/${address}`),
	           axios.get(`https://api.tzkt.io/v1/contracts/KT1MfMMsYX34Q9cEaPtk4qkQ6pojA7D2nsgr/bigmaps/balances/keys/${address}`),
		   axios.get(`https://api.teztools.io/token/prices`)])
	           .then(axios.spread((... FarmsResponse) => {
		       let FarmsUSD: any = 0;
		       let FarmsXTZ: any = 0;
		       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                       // @ts-ignore
		       const TokenPrices =  FarmsResponse.slice(-1)[0].data;
		       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                       // @ts-ignore
		       const PlentyToken: any = TokenPrices.contracts.find(tk => tk.symbol === "PLENTY");
		       console.log(PlentyToken);
		       FarmsResponse.slice(0, -1);
		       const XTZfarmData =  FarmsResponse[0].data;
		       const CTEZfarmData =  FarmsResponse[1].data;
		       setXTZfarm(Number(XTZfarmData));
		       setCTEZfarm(Number(CTEZfarmData));
		       FarmsResponse.map((farm:any) => {
		         if (Number(farm.data) > 0) {
                           const PlentyDecimals = farm.data.slice(0, - PlentyToken.decimals)
			   FarmsUSD += Number(farm.currentPrice * PlentyDecimals);
			 }
		       })
		       setTotalStakingUSD(FarmsUSD);
		     })) 
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
          <p className="farms-analytics-header">Total Staking</p>
	</div>
	<div className="farms-analytics-amount-container">
	  <p className="farms-available-rewards">{XTZprice * TotalStakingUSD == 0 ? "0.00" : XTZprice * Number(TotalStakingUSD.toFixed(2))}</p> 
	  <p className="farms-available-rewards-xtz">XTZ</p>
	</div>
	<p className="farms-available-rewards-usd">{TotalStakingUSD == 0 ? "0.00" : TotalStakingUSD.toFixed(2)}</p>
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
          <p className="farms-rewards-price-header">Staking Balance:</p>
	  <p className="farms-rewards-price">{XTZfarm == 0 ||  null || undefined ? "0.00" : XTZfarm.toFixed(2)}</p>
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
          <p className="farms-rewards-price-header"> Staking Balance:</p>
	  <p className="farms-rewards-price">{CTEZfarm == 0 || null || undefined ? "0.00" : CTEZfarm.toFixed(2)}</p>
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

