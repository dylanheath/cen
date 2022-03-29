import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// components
import CollectiblesBox from '../../components/collectibles/collectibles';

// styling
import './collectibles.css'

export default function Collectibles() {

  return (
    <div className="Collectibles-container">
      <CollectiblesBox />
    </div>
  )
}

