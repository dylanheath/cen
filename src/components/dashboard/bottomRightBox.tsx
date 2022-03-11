import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//styling
import './dashboard.css';

// context
import { UserContext } from '../../context/context';

// api
import { api } from '../../utils/api';

// components
import Contacts from './Contact';

// assets
import DocsIcon from '../../assets/docs.png';

export default function BottomRightBox() {
  const { User, setUser } = useContext<any>(UserContext);
  return (
    <div className="bottom-right">
      <div className="bottom-right-box">
        <div className="top-right-header-container">
	  <p className="top-right-header">Docs</p>
          <img className="Middle-bottom-grid-header-icon" src={DocsIcon} />
	</div>
	<div className="Middle-bottom-grid-content">
	  <p className="bottom-right-content">View our latest updates and technical information.</p>
	</div>
	<div className="bottom-right-button-container">
	  <button className="top-left-buy-button" type="button">Go to Docs</button>
	</div>
      </div>
    </div>
  )
}

