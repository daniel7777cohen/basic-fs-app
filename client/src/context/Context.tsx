import { createContext, useEffect, useState } from 'react';
import { AxiosService } from '../api/AxiosService';
import { Fetched_Transaction, TransactionForm } from '../common/types';

type ContextType = {
  transactions: Fetched_Transaction[];
  isDataLoaded: boolean;
  setTransactions: React.Dispatch<React.SetStateAction<Fetched_Transaction[]>>;
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdating: boolean;
  updateTrs: (params: {
    transaction_ids: string[];
    newValue: string | number | boolean;
    field: string;
  }) => Promise<void>;
  addTrs: (addedTransaction: TransactionForm) => Promise<void>;
  setCurrentTablePage: React.Dispatch<React.SetStateAction<number>>;
  currentTablePage: number;
  notification: string;
};

const defaultState = {
  transactions: [] as Fetched_Transaction[],
  isDataLoaded: false,
  isUpdating: true,
  setTransactions: () => {},
  setIsUpdating: () => {},
  updateTrs: async () => {},
  addTrs: async () => {},
  setCurrentTablePage: () => {},
  currentTablePage: 0,
  notification: '',
};

export const TransactionsContext = createContext<ContextType>(defaultState);

const axiosService = new AxiosService(process.env.REACT_APP_BASE_URL);

const TransactionsProvider = ({ children }: { children: any }) => {
  const [transactions, setTransactions] = useState<Fetched_Transaction[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentTablePage, setCurrentTablePage] = useState(0);
  const [notification, setNotification] = useState('');

  const updateTrs = async (params: {
    transaction_ids: string[];
    newValue: string | number | boolean;
    field: string;
  }) => {
    try {
      setIsUpdating(true);
      const response = await axiosService.updateTransactions(params);
      if (response.message === 'success') {
        const newTransactions = [...transactions];
        for (const trs_id of params.transaction_ids) {
          const transactionToEditIndex = newTransactions.findIndex((trs) => trs.transaction_id === trs_id);
          if (transactionToEditIndex !== -1) {
            newTransactions[transactionToEditIndex] = {
              ...newTransactions[transactionToEditIndex],
              [params.field]: params.newValue,
            };

            setTransactions(newTransactions);
            setNotification('add-success');
          }
        }
      } else {
        //handle error
      }
    } catch (error: any) {
      //handle error
      console.log(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const addTrs = async (addedTransaction: TransactionForm) => {
    try {
      setIsUpdating(true);
      const response = await axiosService.addTransaction(addedTransaction);
      debugger;
      if (response.message === 'success') {
        setTransactions(response.processedTransactions);
        setNotification('add-success');
        setTimeout(() => {
          setNotification('');
        }, 5000);
      } else {
        //handle error
      }
    } catch (error) {
      //handle error
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await axiosService.fetchTransactions();
        if (response.message === 'success') {
          setTransactions(response.processedTransactions);
        } else {
          //handle error
        }
      } catch (error: any) {
        console.log(error.message);
        //handle error
      } finally {
        setIsDataLoaded(false);
      }
    }
    fetchTransactions();
  }, []);

  const useTransactions = {
    transactions,
    isDataLoaded,
    setTransactions,
    updateTrs,
    addTrs,
    setCurrentTablePage,
    currentTablePage,
    isUpdating,
    setIsUpdating,
    notification,
  };

  return <TransactionsContext.Provider value={useTransactions}>{children}</TransactionsContext.Provider>;
};

export default TransactionsProvider;
