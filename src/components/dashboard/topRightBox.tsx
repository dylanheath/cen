import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TopRightBox() {
  const [AddPopup, setAddPopup] = useState<boolean | null>(null); 
  return (
    <div className="top-right">
      <div className="top-right-box">
        <div className="top-right-header-container">
	  <p className="top-left-header">Contacts</p>
	  <button className="bottom-left-button" type="button">Add</button>
	</div>
      </div>
    </div>
  )
}

