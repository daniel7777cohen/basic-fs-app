import { createContext, useEffect, useState } from 'react';
import { ApiService } from '../api/AxiosService';
import { Customer, Fetched_Transaction, TransactionForm } from '../common/types';
import { defaultState } from './consts';
import { ContextType, UpdateTrsParams } from './types';

export const TransactionsContext = createContext<ContextType>(defaultState);

const apiService = new ApiService(process.env.REACT_APP_BASE_URL);

const TransactionsProvider = ({ children }: { children: any }) => {
  const [transactions, setTransactions] = useState<Fetched_Transaction[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isTransactionsLoaded, setIsTransactionLoaded] = useState(true);
  const [isCustomersLoaded, setIsCustomersLoaded] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentTablePage, setCurrentTablePage] = useState(0);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await apiService.fetchTransactions();
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
        setIsTransactionLoaded(false);
      }
    }
    fetchTransactions();
  }, []);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await apiService.fetchCustomers();
        if (response.message === 'success') {
          setCustomers(response.processedCustomers);
        } else {
          //handle error
          handleNotification(`Error - please try again, or contact support`, 3500);
        }
      } catch (error: any) {
        //handle error
        handleNotification(`${error.message}`, 3500);
      } finally {
        setIsCustomersLoaded(false);
      }
    }
    fetchCustomers();
  }, []);

  const updateTrs = async ({ transaction_ids, newValue, field }: UpdateTrsParams) => {
    try {
      setIsUpdating(true);
      const response = await apiService.updateTransactions({ transaction_ids, newValue, field });
      if (response.message === 'success') {
        updateUiOnSuccess({ transaction_ids, newValue, field });
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
      const response = await apiService.addTransaction(addedTransaction);
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

  const updateUiOnSuccess = ({ transaction_ids, newValue, field }: UpdateTrsParams) => {
    const newTransactions = [...transactions];
    for (const trs_id of transaction_ids) {
      const transactionToEditIndex = newTransactions.findIndex((trs) => trs.transaction_id === trs_id);
      if (transactionToEditIndex !== -1) {
        newTransactions[transactionToEditIndex] = {
          ...newTransactions[transactionToEditIndex],
          [field]: newValue,
        };

        setTransactions(newTransactions);
        const action = field === 'is_deleted' ? 'deleted' : 'updated';
        handleNotification(
          `${transaction_ids.length > 1 ? 'Transactions' : 'Transaction'} ${action} successfully`,
          3500
        );
      }
    }
  };

  const useTransactions = {
    transactions,
    customers,
    isTransactionsLoaded,
    isCustomersLoaded,
    setIsTransactionLoaded,
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
