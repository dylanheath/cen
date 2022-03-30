import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// styling
import './dropdown.css';

export default function Dropdown({state} : {state:any}) {
  const navigate = useNavigate();
  return (
    <div className="Dropdown">
        <button className="dropdown-option" onClick={() => {
          state(null);
        }}>
	Docs
	</button>
	<button className="dropdown-option" onClick={() => {
          navigate("/app/liquidity");
	  state(null);
	}}>
	Liquidity
	</button>
	<button className="dropdown-option" onClick={() => {
          navigate("/app/swap");
	  state(null);
	}}>
	Swap
	</button>
	<button className="dropdown-option" onClick={() => {
          navigate("/app/collectibles");
	  state(null);
	}}>
        NFTS
	</button>
	<button className="dropdown-option" onClick={() => {
          state(null);
	}}>
        Settings
	</button>
    </div>
  )
}

