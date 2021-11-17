import { capitalizeFirstLetter } from '../../common/utils';
import { Fetched_Transaction, TransactionTableData } from '../../common/types';

export function translateTrsResponse(transactionsResponse: Fetched_Transaction[]): TransactionTableData[] {
  return transactionsResponse.map((trs: Fetched_Transaction) => {
    return {
      ...trs,
      first_name: `${capitalizeFirstLetter(trs.first_name)}`,
      last_name: `${capitalizeFirstLetter(trs.last_name)}`,
      address: `${capitalizeFirstLetter(trs.country)}  ${capitalizeFirstLetter(
        trs.city
      )} ${capitalizeFirstLetter(trs.street)}`,
      isSelected: false,
    };
  });
}
