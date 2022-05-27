import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// context
import { UserContext } from '../../context/context';

// api
import { api } from '../../utils/api';

// styling
import './dashboard.css';

// components
import Token from './Token';
import {DotWave, LeapFrog, MrMiyagi, Orbit, Pinwheel} from '@uiball/loaders';

interface Tokenfields {
  balance: string,
  symbol: string,
  name:string,
}

export default function Tokens() {
  const { User, setUser } = useContext<any>(UserContext);
  const [UserTokens, setUserTokens] = useState<Array<string>>([]);
  const [TokensReceived, setTokensReceived] = useState<boolean>(false);
  const [NoTokens, setNoTokens] = useState<boolean>(false);
  const navigate = useNavigate();
  const NFTnav = () => {
    navigate('/app/assets');
  };
  useEffect(() => { 
    setTokensReceived(false);
    if (User.status === true) {
      const fetchTokens = async () => {
	const address = await User.address?.toString();
	const TokenBalance: Array<string> = [];
	const AllTokens: Array<any> = [];
	if (address) {
          const getTokens = await axios.get<any>(`https://api.tzkt.io/v1/tokens/balances?account=${address}&balance.gt=1`, { timeout: 4000 })  
	    .then((response) => {
	      const TokenData = response.data;
	      TokenData.map((tok:any) => {
	        if ( tok.token.hasOwnProperty('metadata')&& tok.balance !== "0") {
                  TokenBalance.push(tok);
		  } 
	      })
	      if (TokenData.length === 0) {
	        setNoTokens(true);
	      }
	      setUserTokens(TokenBalance);
	      setTokensReceived(true);
	    })
	    .catch(() => {
              console.log("failed to grab tokens");
	    })
	 }
      }
      fetchTokens();
    }
  }, [])
  return (
    <div className="Tokens">
      <div className="Tokens-container">
        <div className="Tokens-box">
          <div className="Tokens-header-container">
            <p className="Tokens-header">Tokens</p>
	    <button className="Token-header-button" onClick={NFTnav}>View More</button>
	  </div>
	  <div className="Token-content-container">
	  {NoTokens == true && (
            <div className="Token-none-container">
              <p className="Token-none-tag">No Tokens Owned</p>
	      <Pinwheel size={40} speed={1.2} color="rgb(33, 114, 229)" />
	    </div>
          )}
	  {TokensReceived == true && NoTokens == false && (
              <Token TokensList={UserTokens} />
	    )}
	  </div>
	</div>
      </div>
    </div> 
  )
}
