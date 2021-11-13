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
  cerdit_card_type: string;
  cerdit_card_number: string;
}

export interface TransactionFormatted {
  name: string;
  email: string;
  address: string;
  currency: string;
  creditCardType: string;
  creditCardNumber: string;
}
