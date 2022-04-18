import React, {useEffect, useState, useContext} from 'react';

// context
import { UserContext } from '../../context/context';

export default function Farms() {
  const { User, setUser } = useContext<any>(UserContext);
  const [StakingTotal, setStakingTotal] = useState<number>(0);
  return (
    <div className="Farms-box">
      <div className="farms-header-container">

      </div> 
      <div className="farms-staking-amount-container">

      </div>
    </div>
  )
}

