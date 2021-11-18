import axios, { AxiosInstance } from 'axios';
import { TransactionForm } from '../common/types';
import { UpdateTrsParams } from '../context/types';

export class ApiService {
  private axios: AxiosInstance;

  constructor(baseUrl: string | undefined) {
    this.axios = axios.create({
      headers: { 'Content-Type': 'application/json' },
      baseURL: baseUrl,
    });
  }

  async fetchTransactions() {
    const response = await this.axios.get('/transaction');
    return response.data;
  }

  async fetchCustomers() {
    const response = await this.axios.get('/customer');
    return response.data;
  }

  async updateTransactions({ transaction_ids, newValue, field }: UpdateTrsParams) {
    const params = { transaction_ids, newValue, field };
    const response = await this.axios.put(`/transaction`, params);
    return response.data;
  }

  async addTransaction(addedTransaction: TransactionForm) {
    const response = await this.axios.post(`/transaction`, addedTransaction);
    return response.data;
  }
}
