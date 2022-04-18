import React, {useEffect, useState, useContext} from 'react';

// context
import { UserContext } from '../../context/context';

// styling
import './connect.css';

export default function ConnectBox() {
  const { User, setUser } = useContext<any>(UserContext);
  const [BetaAccept, setBetaAccept] = useState<boolean>(false);
  return (
    <div className="Connect-box">
    </div>
  )
}
