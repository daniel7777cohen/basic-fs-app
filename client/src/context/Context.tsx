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
  handleNotification: (message: string, timeout: number) => void;
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
  handleNotification: () => {},
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
            const action = params.field === 'is_deleted' ? 'deleted' : 'updated';
            handleNotification(`Transaction ${action} successfully`, 3500);
          }
        }
      } else {
        handleNotification(`Error - please try again, or contact support`, 3500);
      }
    } catch (error: any) {
      //handle error
      handleNotification(`${error.message}`, 3500);
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
        setTransactions((prev) => [...prev, ...response.processedTransaction]);
        handleNotification('Transaction added successfully', 3500);
      } else {
        //handle error
        handleNotification(`Error - please try again, or contact support`, 3500);
      }
    } catch (error: any) {
      handleNotification(error.message, 3500);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleNotification = (message: string, timeout: number) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, timeout);
  };

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await axiosService.fetchTransactions();
        if (response.message === 'success') {
          setTransactions(response.processedTransactions);
        } else {
          //handle error
          handleNotification(`Error - please try again, or contact support`, 3500);
        }
      } catch (error: any) {
        //handle error
        handleNotification(`${error.message}`, 3500);
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
    handleNotification,
  };

  return <TransactionsContext.Provider value={useTransactions}>{children}</TransactionsContext.Provider>;
};

export default TransactionsProvider;
