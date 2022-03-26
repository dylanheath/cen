import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';

// styling
import './dashboard.css';

// context
import { UserContext } from '../../context/context';

export default function Delegation() {
  const { User, setUser } = useContext<any>(UserContext);
  const [DelegateAmount, setDelegateAmount] = useState<number>(0);
  return ( 
    <div className="Delegation-box">
      <div className="delegation-header-container">
        <p className="delegation-header">Delegation</p>
      </div>
    </div>
  )
}
