import React, { useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Context
import { UserContext } from '../../context/context';

// api
import { api } from '../../utils/api';

// styling
import './send.css';

// utils
import { tokens } from '../../utils/tokens';
import { getActiveAccount, sendXTZ, sendUSDtz } from '../../utils/wallet';

// assets
import DefaultIcon from '../../assets/default.png';

// components 
import ContactsPopup from '../../components/contacts/Contacts';

export default function Send() {
  const { User, setUser } = useContext<any>(UserContext);
  const [Receiver, setReceiver]  = useState<any>(null);
  const [Amount, setAmount] = useState<number>(0);
  const [Message, setMessage] = useState<string | null>(null);
  const [Contacts, setContacts] = useState<Array<string>>(['']);
  const [Popup, setPopup] = useState<boolean | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchContacts = async () => {
      if (User.status == true) {
        const address = await User.address?.toString();
	const UserContacts = await User?.contacts;
	if (address | UserContacts) {
	  const getContacts = await axios.get(`${api.url}/user/contacts/list/users${address}`, { params: { contactslist: UserContacts } }) 
	    .then((response) => {
              const ContactsData = response.data;
	      setContacts(ContactsData);
	    })
	    .catch(() => {
	      console.log('could not grab contacts')
	    })
	}  
      }
    }
    fetchContacts();
  }, [])
  return  (
    <div className="send">
      {Popup && (
        <div className="send-contact-popup-container">
	  <ContactsPopup currentUser={User?.address} ContactsData={Contacts} selectReceiver={setReceiver} />
        </div>
      )}
      <div className="send-container">
        <div className="send-box">
	  <div className="send-header">
	  </div>
	  <div className="send-input-container">
            <input className="send-amount-input" />
	  </div>
	  <div className="send-contact-button-container">
            <button className="send-contact-button" type="button" onClick={() => setPopup(true)}>
	      <div className="send-account-container">
	        <img className="send-accout-picture" src={DefaultIcon} />
                <p className="send-account-name">{Receiver.User}</p>
	      </div>
	    </button>
	  </div>
	</div>
      </div>
    </div>
  )
}

