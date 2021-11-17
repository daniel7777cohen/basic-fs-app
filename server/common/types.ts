export enum Gender {
  Male = 'male',
  Female = 'female',
}

export interface Customer {
  _id: string;
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
  _id: string;
  createdAt: Date;
  total_price: number;
  currency: string;
  credit_card_type: string;
  credit_card_number: number;
  is_deleted: boolean;
  __v: number;
}

export interface TransactionsDbResponse extends Transaction {
  customer_id: Customer;
}
