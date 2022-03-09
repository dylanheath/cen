import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TopRightBox() {
  const [AddPopup, setAddPopup] = useState<boolean | null>(null); 
  return (
    <div className="top-right">
      <div className="top-right-box">
        <div className="top-right-header-container">
	</div>
      </div>
    </div>
  )
}

