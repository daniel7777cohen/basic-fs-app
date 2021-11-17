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

  async updateTransactions(params: {
    transaction_ids: string[];
    newValue: string | number | boolean;
    field: string;
  }) {
    const response = await this.axios.put(`/transaction`, params);
    return response.data;
  }
}
