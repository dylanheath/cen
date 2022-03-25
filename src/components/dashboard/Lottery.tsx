import React, { useEffect, useState } from 'react';
import axios from 'axios';

// styling
import './dashboard.css';

// assets
import LotteryIcon from '../../assets/LotteryIcon.png';

export default function Lottery() {
  const [LotteryPool, setLotteryPool] = useState<number>(0);
  return (
    <div className="Lottery-box">
      <div className="lottery-header-container">
        <p className="lottery-header">Lottery</p>
	<img className="lottery-icon" src={LotteryIcon} />
      </div>
      <div className="lottery-content-container">
        <p className="lottery-content">Buy tickets and take a chance at winning big.</p>
      </div>
      <div className="lottery-button-container">
        <button className="lottery-button" type="button">Go to Lottery</button>
      </div>
    </div>
  )
}

