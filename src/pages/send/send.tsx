import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Context
import { UserContext } from '../../context/context';

// api
import { api } from '../../utils/api';

// styling
import './send.css';

// utils
import { tokens } from '../../utils/tokens';

import { getActiveAccount, sendXTZ, sendUSDtz } from '../../utils/wallet';

export default function send() {
  return  (
    <div className="send">
      <p>send</p>
    </div>
  )
}

