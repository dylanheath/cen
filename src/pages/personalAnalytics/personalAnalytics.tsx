import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

// components
import PersonalAnalytics from '../../components/personalAnalytics/personalAnalytics';

// styling
import './personalAnalytics.css'

export default function PersonAnalytics() {
  return (
    <div className="Personal-analytics">
      <div className="personal-analytics-container">
        <PersonalAnalytics />
      </div>
    </div>
  )
}

