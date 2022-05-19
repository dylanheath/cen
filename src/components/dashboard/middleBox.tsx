import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// graph
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

// context
import { UserContext } from '../../context/context';

// api
import { api } from '../../utils/api';

// styling
import './dashboard.css';

// loading animation
import { Waveform } from '@uiball/loaders'

export default function MiddleBox() {
  const { User, setUser } = useContext<any>(UserContext);
  const [TotalTransactions, setTotalTransactions] = useState<number>(0); 
  const [TotalAmount, setTotalAmount] = useState<number>(0);
  const [TotalAmountConverted, setTotalAmountConverted] = useState<number>(0);
  const [BalanceHistory, setBalanceHistory] = useState<any>([0]);
  const [XTZdata, setXTZdata] = useState<any>({ATH: 0, ATL: 0, ATH_date: 0, ATL_date: 0, CircSupply: 0, MarketCap: 0, Price: 0,
  PriceChange: 0, Timestamp: 0, Volume: 0, ATL_change: 0, ATH_change: 0, Price_change_24: 0, High_24: 0, Low_24: 0});
  const [GraphLoading, setGraphLoading] = useState<boolean>(false);
  useEffect(() => {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    console.log(currentDate);
    const getAnalytics = async () => {
      if (User.status ==  true) {
        const address = await User.address?.toString();
        const getTotalTransactions = await axios.get(`${api.url}/transactions/totaltransactions`, { timeout: 5000 })
          .then((response) => {
            const TotalTransactionsData = response.data;
	    setTotalTransactions(TotalTransactionsData);
          })
	  .catch(() => {
            console.log('failed to grab total transactions');
	  })
        const getBalanceHistory = await axios.get(`https://api.tzkt.io/v1/accounts/${address}/balance_history`)
	  .then((response) => {
            const BalanceHistoryData = response.data.slice(-10);
	    const graphBalances: Array<number> = []
	    if (BalanceHistoryData.length > 0) {
	       BalanceHistoryData.map((timestampBalance:any) => {
               graphBalances.push(timestampBalance.balance, timestampBalance.timestamp);
	    })
              setBalanceHistory(graphBalances);
	    }
	  })
	  .catch(() => {
            console.log("failed to get balance history");
	  })
	const getXTZdata = await axios.get(`${api.url}/price/xtz`, {timeout: 5000})
          .then((response) => {
            const PriceData = response.data[0];
	    let currentDatesPrice: Array<Date> = [];
	    PriceData.Price_graph.map((price_time:any) => {
	      if ( new Date(price_time.Timestamp).toLocaleDateString("en-US") == new Date(timestamp).toLocaleDateString("en-US")) {
                currentDatesPrice.push(price_time.Price);
	      }
	    })
	    const XTZobj: any = {
              ATH: PriceData.ATH,
              ATH_date: new Date(PriceData.ATH_date),
              ATL: PriceData.ATL,
              ATL_date: new Date(PriceData.ATL_date),
	      CircSupply: PriceData.CircSupply,
              MarketCap: PriceData.MarketCap,
              Price: PriceData.Price,
              PriceChange: PriceData.PriceChange,
              Timestamp: PriceData.Timestamp,
              Token: "XTZ",
              Volume: PriceData.Volume,
	      ATL_change: PriceData.ATL_change,
	      ATH_change: PriceData.ATH_change,
	      Price_graph: currentDatesPrice,
	      High_24: PriceData.High_24,
	      Low_24: PriceData.Low_24,
	      Price_change_24: PriceData.Price_change_24
	    }
	    setXTZdata(XTZobj);
	    setGraphLoading(false);
	  })
	  .catch(() => {
            console.log("failed to get price data");
	    setGraphLoading(false);
	  })
      }
    }
   setGraphLoading(true);
   getAnalytics();
      setInterval(function(){
        getAnalytics();
      },60 * 1000);
  }, [])
  return (
    <div className="Middle-top">
      <div className="Middle-top-box">
        <div className="Middle-top-header-container">
	  <p className="Middle-top-header">Analytics</p>
	  <p className="Middle-top-personal-analytics">ecosystem</p>
	</div>
	<div className="Middle-top-market-ecosystem-container">
	  <div className="Middle-top-market-data-container">
	    <div className="Middle-top-atl-container">
	      <p className="Middle-top-converted-price">${XTZdata.High_24.toFixed(2)}</p>
	      <p className="Middle-top-atl-tag">24h</p>
	    </div>
	    <div className="Middle-top-analytics-container-main">
	      <div className="Middle-top-analytics-container">
	        <p className="Middle-top-total-amount-header-top">24h change</p>
	        <div className="Middle-top-total-header">
	          <p className="Middle-top-total-transactions"> {XTZdata.Price_change_24.toFixed(2)} %</p>
	        </div>
	      </div>
	    </div>
	  </div>
	  <div className="Middle-top-analytics-outline-container">
            <div className="Middle-top-analytics-outline" style={GraphLoading == true ? {paddingTop: '2.6rem'} : {}}>
	      {GraphLoading == false && (
	        <Sparklines data={XTZdata.Price_graph}>
                  <SparklinesLine color="rgb(33, 114, 229)" />
                </Sparklines>
	      )}
	      {GraphLoading == true && (
	        <div className="Middle-top-graph-load-container">
                  <Waveform
                    size={40}
 		    lineWeight={3.5}
 		    speed={1}
 		    color="white"
                  />
	        </div>
	      )}
	    </div>
	  </div>
	</div>
      </div>
    </div>
  )
}

