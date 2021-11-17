import { createContext, useEffect, useState } from 'react';
import { AxiosService } from '../api/AxiosService';
import { Fetched_Transaction } from '../common/types';

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
  addTrs: (addedTrs: Fetched_Transaction) => Promise<void>;
  setCurrentTablePage: React.Dispatch<React.SetStateAction<number>>;
  currentTablePage: number;
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
};

export const TransactionsContext = createContext<ContextType>(defaultState);

const axiosService = new AxiosService(process.env.REACT_APP_BASE_URL);

const TransactionsProvider = ({ children }: { children: any }) => {
  const [transactions, setTransactions] = useState<Fetched_Transaction[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentTablePage, setCurrentTablePage] = useState(0);

  const updateTrs = async (params: {
    transaction_ids: string[];
    newValue: string | number | boolean;
    field: string;
  }) => {
    try {
      setIsUpdating(true);
      debugger;
      const response = await axiosService.updateTransactions(params);
      if (response.message === 'success') {
        const newTransactions = [...transactions];
        for (const trs_id of params.transaction_ids) {
          const transactionToEditIndex = newTransactions.findIndex((trs) => trs.transaction_id === trs_id);
          if (transactionToEditIndex !== -1) {
            // const {  ...rest } = editedRow;
            newTransactions[transactionToEditIndex] = {
              ...newTransactions[transactionToEditIndex],
              [params.field]: params.newValue,
            };

            setTransactions(newTransactions);
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

  const addTrs = async (addedTrs: Fetched_Transaction) => {
    const newTransactions = [...transactions, addedTrs];
    setTransactions(newTransactions);
  };

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
  };

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const { processedTransactions } = await axiosService.fetchTransactions();
        setTransactions(processedTransactions);
      } catch (error: any) {
        console.log(error.message);
        //handle error
      } finally {
        setIsDataLoaded(false);
      }
    }
    fetchTransactions();
  }, []);

  return <TransactionsContext.Provider value={useTransactions}>{children}</TransactionsContext.Provider>;
};

export default TransactionsProvider;
