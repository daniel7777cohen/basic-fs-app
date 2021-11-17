export interface Customer {
  customer_id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  country: string;
  city: string;
  street: string;
  phone: string;
}

export interface Transaction {
  transaction_id: string;
  createdAt: string;
  total_price: number;
  currency: string;
  credit_card_type: string;
  credit_card_number: number;
  is_deleted: boolean;
}

export type Fetched_Transaction = Transaction & Customer;

export interface TransactionTableData extends Fetched_Transaction {
  isSelected: boolean;
}

export interface TransactionForm {
  total_price: number;
  currency: string;
  credit_card_type: string;
  credit_card_number: number;
  customer_id: string;
}
