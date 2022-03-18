import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// context
import { UserContext } from '../../context/context';
// api
import { api } from '../../utils/api';

export default function Tokens() {
  const { User, setUser } = useContext<any>(UserContext);
  const [Tokens, setTokens] = useState<string>('');
  useEffect(() => {
    if (User.status === true) {
      const fetchTokens = async () => {
	const address = await User.address?.toString();
	const TokenBalance: Array<string> = [''];
        const getTokens = await axios.get<any>(`https://api.better-call.dev/v1/account/mainnet/${address}/token_balances`)  
	  .then((response) => {
            const TokenData = response.data;
	    TokenData.map((token:any) => {
	      if (token.token_id == 0 && token.hasOwnProperty('symbol')) {
                TokenBalance.push(token); 
	      }
	    })
	    setTokens(TokenData);
	  })
	  .catch(() => {
            console.log("failed to grab tokens");
	  })
      }
    }
  }, [])
  return (
    <div className="Tokens">
      <div className="Tokens-container">
        <div className="Tokens-box">
          <div className="Tokens-header-container">
            <p className="Tokens-header">Tokens</p>
	  </div>
	</div>
      </div>
    </div> 
  )
}
