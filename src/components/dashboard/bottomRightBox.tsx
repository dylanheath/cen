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

export default function BottomRightBox() {
  const { User, setUser } = useContext<any>(UserContext);
  return (
    <div className="bottom-right">
      <div className="bottom-right-box">
        <div className="top-right-header-container">
	  <p className="top-right-header">Nodes</p>
	  <button className="top-right-button" type="button">change nodes</button>
	</div>
      </div>
    </div>
  )
}

