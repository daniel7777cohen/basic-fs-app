import { capitalizeFirstLetter } from '../../common/utils';
import { TransactionFormatted, TransactionResponse } from './types';

export function translateTrsResponse(transactionsResponse: TransactionResponse[]): TransactionFormatted[] {
  return transactionsResponse.map((trs: TransactionResponse) => {
    return {
      customerId: trs.customer_id,
      name: `${capitalizeFirstLetter(trs.first_name)} ${capitalizeFirstLetter(trs.last_name)}`,
      email: trs.email,
      address: `${capitalizeFirstLetter(trs.country)}  ${capitalizeFirstLetter(
        trs.city
      )} ${capitalizeFirstLetter(trs.street)}`,
      currency: trs.currency,
      creditCardType: trs.cerdit_card_type,
      creditCardNumber: trs.cerdit_card_number,
      totalPrice: trs.total_price,
    };
  });
}
