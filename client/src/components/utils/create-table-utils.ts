import { TrsFormData } from '../Transaction/create/types';

//TODO: add validation for fields , credit_card, customer_id, etc..
export function isFormValid(formData: TrsFormData) {
  const { credit_card_number, currency, customer_id, last_name, total_price, first_name, credit_card_type } =
    formData;
  return (
    credit_card_number &&
    currency &&
    customer_id &&
    last_name &&
    total_price &&
    first_name &&
    credit_card_type
  );
}
