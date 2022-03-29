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

export default function Tokens() {
  const { User, setUser } = useContext<any>(UserContext);
  const [UserTokens, setUserTokens] = useState<Array<string>>(['']);
  const [TokensReceived, setTokensReceived] = useState<boolean>(false);
  const navigate = useNavigate();
  const NFTnav = () => {
    navigate('/app/collectibles');
  };
  useEffect(() => { 
    setTokensReceived(false);
    if (User.status === true) {
      const fetchTokens = async () => {
	const address = await User.address?.toString();
	const TokenBalance: Array<string> = [];
	if (address) {
          const getTokens = await axios.get<any>(`https://api.better-call.dev/v1/account/mainnet/${address}/token_balances`, { timeout: 4000 })  
	    .then((response) => {
              const TokenData = response.data;
	      TokenData.balances.map((token:any) => {
	        if (token.token_id == 0 && token.hasOwnProperty('symbol') && !token.hasOwnProperty('creators')) {
                  TokenBalance.push(token);
	        }
	      })
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
	    <button className="Token-header-button" onClick={NFTnav}>View NFTS</button>
	  </div>
	  <div className="Token-content-container">
	    {TokensReceived == true && (
              <Token TokensList={UserTokens} />          
	    )}
	  </div>
	</div>
      </div>
    </div> 
  )
}
