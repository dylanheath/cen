import React from 'react';

//assets
import TezosIcon from '../assets/TezosCoin.png';
import USDtzIcon from '../assets/USDtz.png';

type token = {
   "XTZ": {
    name: string,
    image: string,
   },
   "USDtz": {
    name: string,
    image: string,
   },
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
}
