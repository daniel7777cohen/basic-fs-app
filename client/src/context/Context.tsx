import { createContext, useEffect, useState } from 'react';
import { TransactionFormatted, TransactionResponse } from '../components/utils/types';
import { mockData } from '../mock';

export type ContextType = {
  transactions: TransactionResponse[];
  setTransactions: React.Dispatch<React.SetStateAction<TransactionResponse[]>>;
  updateTrs: (editedTrs: TransactionFormatted) => Promise<void>;
  deleteTrs: (rowsToDeleteParams: { customerId: string; transactionId: string }[]) => void;
};

const defaultState = {
  transactions: [] as TransactionResponse[],
  setTransactions: () => {},
  updateTrs: async () => {},
  deleteTrs: async () => {},
};

export const TransactionsContext = createContext<ContextType>(defaultState);

const TransactionsProvider = ({ children }: { children: any }) => {
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);

  const deleteTrs = async (rowsToDeleteParams: { customerId: string; transactionId: string }[]) => {
    //async operation
    const rowsToDeleteIds = rowsToDeleteParams.map((row) => row.customerId);
    const newTransactions = transactions.filter((trs) => !rowsToDeleteIds.includes(trs.customer_id));
    setTransactions(newTransactions);
  };

  const updateTrs = async (editedTrs: TransactionFormatted) => {
    //async operation
  };

  const useTransactions = {
    transactions,
    setTransactions,
    updateTrs,
    deleteTrs,
  };

  useEffect(() => {
    setTransactions(mockData);
  }, []);
  return <TransactionsContext.Provider value={useTransactions}>{children}</TransactionsContext.Provider>;
};

export default TransactionsProvider;
