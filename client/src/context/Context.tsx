import { createContext, useEffect, useState } from 'react';
import { TransactionTableData, TransactionResponse } from '../components/utils/types';
import { mockData } from '../mock';

export type ContextType = {
  transactions: TransactionResponse[];
  setTransactions: React.Dispatch<React.SetStateAction<TransactionResponse[]>>;
  updateTrs: (editedRow: TransactionTableData) => Promise<void>;
  deleteTrs: (rowsToDeleteParams: { customer_id: string; transaction_id: string | undefined }[]) => void;
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

  const deleteTrs = async (
    rowsToDeleteParams: { customer_id: string; transaction_id: string | undefined }[]
  ) => {
    const rowsToDeleteIds = rowsToDeleteParams.map((row) => row.customer_id);
    const newTransactions = transactions.filter((trs) => !rowsToDeleteIds.includes(trs.customer_id));
    setTransactions(newTransactions);
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
