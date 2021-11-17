import { createContext, useEffect, useState } from 'react';
import { AxiosService } from '../api/AxiosService';
import { Fetched_Transaction, TransactionTableData } from '../common/types';

export type ContextType = {
  transactions: Fetched_Transaction[];
  isLoading: boolean;
  setTransactions: React.Dispatch<React.SetStateAction<Fetched_Transaction[]>>;
  updateTrs: (editedRow: TransactionTableData) => Promise<void>;
  deleteTrs: (transactionIds: string[]) => void;
  addTrs: (addedTrs: Fetched_Transaction) => Promise<void>;
  setCurrentTablePage: React.Dispatch<React.SetStateAction<number>>;
  currentTablePage: number;
};

const defaultState = {
  transactions: [] as Fetched_Transaction[],
  isLoading: false,
  setTransactions: () => {},
  updateTrs: async () => {},
  deleteTrs: async () => {},
  addTrs: async () => {},
  setCurrentTablePage: () => {},
  currentTablePage: 0,
};

export const TransactionsContext = createContext<ContextType>(defaultState);

const axiosService = new AxiosService(process.env.REACT_APP_BASE_URL);

const TransactionsProvider = ({ children }: { children: any }) => {
  const [transactions, setTransactions] = useState<Fetched_Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTablePage, setCurrentTablePage] = useState(0);

  const deleteTrs = async (transactionIds: string[]) => {
    try {
      setIsLoading(true);
      const response = await axiosService.deleteTransactions(transactionIds);
      if (response.message === 'success') {
        const newTransactions = [...transactions];
        transactionIds.forEach((trsId) => {
          const transaction = newTransactions.find((trs) => trs.transaction_id === trsId);
          if (transaction) {
            transaction.is_deleted = true;
          }
        });
        setTransactions(newTransactions);
      }
    } catch (error) {
      //handle error
    } finally {
      setIsLoading(false);
    }
  };

  const updateTrs = async (editedRow: TransactionTableData) => {
    const newTransactions = [...transactions];
    const transactionToEditIndex = newTransactions.findIndex(
      (trs) => trs.customer_id === editedRow.customer_id
    );

    if (transactionToEditIndex !== -1) {
      const { isSelected, ...rest } = editedRow;
      newTransactions[transactionToEditIndex] = rest;
    }

    setTransactions(newTransactions);
  };

  const addTrs = async (addedTrs: Fetched_Transaction) => {
    const newTransactions = [...transactions, addedTrs];
    setTransactions(newTransactions);
  };

  const useTransactions = {
    transactions,
    isLoading,
    setTransactions,
    updateTrs,
    deleteTrs,
    addTrs,
    setCurrentTablePage,
    currentTablePage,
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
        setIsLoading(false);
      }
    }
    fetchTransactions();
  }, []);

  return <TransactionsContext.Provider value={useTransactions}>{children}</TransactionsContext.Provider>;
};

export default TransactionsProvider;
