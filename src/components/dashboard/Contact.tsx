import React from 'react'

// assets
import DefaultIcon from '../../assets/default.png';

// styling
import './Contacts.css';

export default function Contact({ContactsList, currentUser} : {ContactsList:any, currentUser:any}) {

  return (
    <div className="Contact">
      <div className="Contact-box">
        {ContactsList.map((contact:any) => (
          <div className="contact-template-container" key={ContactsList.id}>
	    <button className="contact-template" type="button">
	      <div className="contact-account-container">
                <img className="contact-account-picture" src={DefaultIcon} />
		<p className="contact-account-name">{contact?.User}</p>
	      </div>
	    </button>
	  </div>
        ))}
      </div>
    </div>
  )
}

