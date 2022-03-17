import React, { useState, useEffect } from 'react';

// utils
import { nodes } from '../../utils/nodes';

export default function ControlPanel() {
  const [CurrentNode, setCurrentNode] = useState<string>('');
  return (
    <div className="Control-panel">
      <div className="Control-panel-container">
        <div className="Control-panel-box">
	  <div className="Control-panel-header-container">
	    <p className="Control-panel-header">Control Panel</p>
	  </div>
	</div>
      </div>
    </div>
  )
}

