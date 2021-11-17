import axios, { AxiosInstance } from 'axios';

export class AxiosService {
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

  async deleteTransactions(transactionIds: string[]) {
    const response = await this.axios.delete(`/transaction`, {
      data: { transaction_ids: transactionIds },
    });
    return response.data;
  }
}
