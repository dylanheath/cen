import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// styling
import './dashboard.css';

// api
import { api } from '../../utils/api';

// context
import { UserContext } from '../../context/context';

// components
import Contact from './Contact';

export default function TopRightBox() {
  const [AddPopup, setAddPopup] = useState<boolean | null>(null); 
  const [Contacts, setContacts] = useState<boolean |null>(null);
  const { User, setUser } = useContext<any>(UserContext); 
  useEffect(() => {
    if (User) {
      const fetchContacts = async () => {
        const UserContacts = await User?.contacts;
	const address = await User?.address;
	if (address || UserContacts) {
	const getContacts = await axios.get(`${api.url}/user/contacts/list/users${address}`, { params: { contactslist: UserContacts } })
	  .then((response) => {
            const ContactsData = response.data;
	    setContacts(ContactsData);
	  })
	  .catch(() => {
            console.log('could not grab contacts');
	  })
	}
      }
      fetchContacts();
    }
  }, [])
  return (
    <div className="top-right">
      <div className="top-right-box">
        <div className="top-right-header-container">
	  <p className="top-left-header">Contacts</p>
	  <button className="bottom-left-button" type="button">Add</button>
	</div>
	<div className="top-right-contacts-container">
	  {Contacts && (
	    <Contact ContactsList={Contacts} currentUser={User.address} />
          )}
	</div>
      </div>
    </div>
  )
}

