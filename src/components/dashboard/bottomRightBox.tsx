import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// context
import { UserContext } from '../../context/context';

// api
import { api } from '../../utils/api';

export default function BottomRightBox() {
  const { User, setUser } = useContext<any>(UserContext);
  const [Contacts, setContacts] = useState<Array<string>>(['']);
  useEffect(() => {
    if (User) {
      const fetchContacts = async () => {
        const UserContacts = await User?.contact;
	const address = await User?.address;
	if (User) {
	const getContacts = await axios.get(`${api.url}/user/contacts/list/users${address}`, { params: { contactsList: UserContacts } }) 
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
    <div className="bottom-right">
      <div className="bottom-right-box">
        <div className="top-right-header-container">
	  <p className="top-left-header">dont know</p>
	</div>
	<div className="bottom-right-contacts-container">
	</div>
      </div>
    </div>
  )
}

