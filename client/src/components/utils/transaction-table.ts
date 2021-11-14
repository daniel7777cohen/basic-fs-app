import { capitalizeFirstLetter } from '../../common/utils';
import { TransactionTableData, TransactionResponse } from '../../common/types';

export function translateTrsResponse(transactionsResponse: TransactionResponse[]): TransactionTableData[] {
  return transactionsResponse.map((trs: TransactionResponse) => {
    return {
      ...trs,
      first_name: `${capitalizeFirstLetter(trs.first_name)}`,
      last_name: `${capitalizeFirstLetter(trs.last_name)}`,
      address: `${capitalizeFirstLetter(trs.country)}  ${capitalizeFirstLetter(
        trs.city
      )} ${capitalizeFirstLetter(trs.street)}`,
      isSelected: false,
      transaction_id: '1',
      
    };
  });
}
