import React from 'react';
import TezosIcon from '../assets/TezosCoin.png';

type token = {
   XTZ: {
    name: string,
    image: string,
    contract: string | null,
   },
}

export const tokens: token = {
  XTZ: {
    name: "XTZ",
    image: TezosIcon,
    contract: "not found",
  }
}
