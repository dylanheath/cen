import React from 'react';

export default function Token({TokensList} : {TokensList:Array<string>}) {

  return (
    <div className="Token-template-container">
      <p className="token-name">name</p>
      <p className="token-balance">balance</p>
    </div>
  )
}

