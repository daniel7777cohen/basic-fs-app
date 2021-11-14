export interface TransactionResponse {
  customer_id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  country: string;
  city: string;
  street: string;
  phone: string;
  total_price: string;
  currency: string;
  credit_card_type: string;
  credit_card_number: string;
  transaction_id: string;
}

export interface TransactionTableData extends TransactionResponse {
  isSelected: boolean;
}
