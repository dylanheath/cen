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
import SettingsIcon from '../../assets/settings.svg';
import ArrowDown from '../../assets/arrowdown.png';
import SendArrowDown from '../../assets/In.png';

// components 
import ContactsPopup from '../../components/contacts/Contacts';

// popups
import Settings from '../../components/popups/Settings';

export default function Send() {
  const { User, setUser } = useContext<any>(UserContext);
  const [Receiver, setReceiver]  = useState<any>(null);
  const [Amount, setAmount] = useState<number>(0);
  const [Message, setMessage] = useState<string | null>(null);
  const [Contacts, setContacts] = useState<Array<string>>(['']);
  const [PopupContacts, setPopupContacts] = useState<boolean | null>(null);
  const [SettingsPopup, setSettingsPopup] = useState<boolean>(false);
  const [SlippageSettings, setSlippageSettings] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      if (User.status === true) {
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
      } else {
        navigate('/app');	
      }
    }
    fetchContacts();
  }, [])
  return  (
    <div className="send">
      {PopupContacts && (
        <div className="send-contact-popup-container">
	  <ContactsPopup currentUser={User?.address} ContactsData={Contacts} selectReceiver={setReceiver} />
        </div>
      )}
      {SettingsPopup == true && (
        <div className="Popup-container">
          <Settings />
	</div>
      )}
      <div className="send-container">
        <div className="send-box">
	  <div className="send-header-container">
            <p className="send-header">Send</p>
	    <button className="settings-header-icon-button" type="button" onClick={() => setSettingsPopup(true)}>Settings</button>
	  </div>
	  <div className="send-input-container">
            <div className="send-amount-input-box">
	      <input className="send-amount-input" placeholder="0.0" type="text" pattern="^[0-9]*[.,]?[0-9]*$" inputMode="decimal" defaultValue="0.00"/>
	      <div className="send-token-select-container">
	        <button className="send-token-select-button" type="button">
		  <div className="send-token-select-content-container">
                    <img className="send-token-select-icon" src={tokens.XTZ.image} />
		    <p className="send-token-select-name">{tokens.XTZ.name}</p>
		    <img className="send-token-down-arrow" src={ArrowDown} />
		  </div>
		</button> 
	      </div>
	    </div>
	  </div>
	  <div className="send-arrow-down-container">
	    <img className="send-arrow-down" src={SendArrowDown} />
	  </div>
	  <div className="send-contact-button-container">
            <button className="send-contact-button" type="button" onClick={() => setPopupContacts(true)}>
	      <div className="send-account-container">
	        {Receiver && (
                  <p className="send-account-name">{Receiver?.User}</p>
		)}
                {!Receiver && (
                  <p className="send-account-name">Select Contact</p>
		)}
	      </div>
	    </button>
	  </div>
	  <div className="send-button-container">
            <button className="send-button" type="button">Send</button>
	  </div>
	</div>
      </div>
    </div>
  )
}

