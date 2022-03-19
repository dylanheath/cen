import React from 'react';

//assets
import TezosIcon from '../assets/TezosCoin.png';
import USDtzIcon from '../assets/USDtez.png';
import tzBTCIcon from '../assets/tzBTC.svg';

type token = {
   "XTZ": {
    name: string,
    image: string,
   },
   "USDtz": {
    name: string,
    image: string,
   },
   "tzBTC": {
    name: string,
    image: string,
   }

}

export const tokens: token = {
  "XTZ": {
    name: "XTZ",
    image: TezosIcon,
  },
  "USDtz": {
    name: "USDtz",
    image: USDtzIcon,
  },
  "tzBTC": {
    name: "tzBTC",
    image: tzBTCIcon,
  }
}
