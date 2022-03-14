import React, {useState} from 'react';

// assets
import DefaultIcon from '../../assets/default.png';

// styling
import './contacts.css';

export default function ContactsPopup({ContactsData, currentUser, selectReceiver } : {ContactsData:any, currentUser:string, selectReceiver:any}) {
  return  (
    <div className="contact-container">
    {ContactsData.map((contact:any) => {
      <button className="contact" key={contact.id} onClick={() => selectReceiver(contact)}>
        <div className="contact-information-container">
	  <img className="contact-picture" src={DefaultIcon} />
          <p className="contact-name">{contact?.User}</p>
        </div>
      </button>
    })}
    </div>
  )
}

