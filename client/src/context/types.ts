import { Fetched_Transaction, TransactionForm, Customer } from '../common/types';

export interface UpdateTrsParams {
  transaction_ids: string[];
  newValue: string | number | boolean;
  field: string;
}

export type ContextType = {
  transactions: Fetched_Transaction[];
  isTransactionsLoaded: boolean;
  isCustomersLoaded: boolean;
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
  customers: Customer[];
};
