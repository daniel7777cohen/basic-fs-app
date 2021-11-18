import { Fetched_Transaction } from '../common/types';

export const defaultState = {
  transactions: [] as Fetched_Transaction[],
  isTransactionsLoaded: false,
  isCustomersLoaded: false,
  isUpdating: true,
  setTransactions: () => {},
  setIsUpdating: () => {},
  updateTrs: async () => {},
  addTrs: async () => {},
  setCurrentTablePage: () => {},
  currentTablePage: 0,
  notification: '',
  handleNotification: () => {},
  customers: [],
};
