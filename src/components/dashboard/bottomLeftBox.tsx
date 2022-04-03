import React,{ useState, useEffect, useContext } from 'react' ;
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

// context
import { UserContext } from '../../context/context';

// api
import { api } from '../../utils/api';

// keys
import { CurrencyExchangeKey } from '../../keys/currencyExchange';

// util
import { currencyList } from '../../utils/currencyList';

// components
import ComponentTransactions from './Transactions';

// styling
import './dashboard.css'

export default function BottomLeftBox() {
  const { User, setUser } = useContext<any>(UserContext);
  const [Transactions, setTransactions] = useState<Array<string>>(['']);
  useEffect(() => {
    const LocalTransactions = JSON.parse(localStorage.getItem('transactions') || "");
    if (LocalTransactions) {
      setTransactions(LocalTransactions);
    }
    if (User) {
    const transactionsBundle: Array<string> = [];
    const fetchTransactions = async () => {
      const address = await User.address?.toString();
      if (address) {
      const getTransactionsReceived = await axios.get(`${api.url}/transactions/getreceived${address}`, { timeout: 4000 })
        .then((response) => {
          const TransactionsReceived = response.data;
	  const ReceivedPush = TransactionsReceived.map((transaction: any) => transactionsBundle.push(transaction));
        })
        .catch(() => {
          console.log('could not grab received transactions');
        })
        const getTransactionSent = await axios.get(`${api.url}/transactions/getsent${address}`, { timeout: 4000 })
          .then((response) => {
          const TransactionSent = response.data;
	  const SentPush = TransactionSent.map((transaction: any) => transactionsBundle.push(transaction));
        })
        .catch(() => {
          console.log('could not grab sent transactions');
        })
      const TransactionDateSort = transactionsBundle.sort((x: any, y: any) => +new Date(y.date) -  +new Date(x.date));
      TransactionDateSort.pop();
      setTransactions(TransactionDateSort);
      localStorage.setItem('transactions', JSON.stringify(TransactionDateSort));
      }
    }
    fetchTransactions();
  }  
} ,[])
  const navigate = useNavigate();
  return (
    <div className="bottom-left-box">
      <div className="bottom-left-header-container">
        <p className="bottom-left-header">Transactions</p>
	<button className="bottom-left-button">View</button>
      </div>
      <div className="bottom-left-transaction-container">
        {Transactions.length  && (
          <ComponentTransactions TransanctionData={Transactions} currentUser={User.address} /> 
	)}
      </div>
    </div>
  )
}

