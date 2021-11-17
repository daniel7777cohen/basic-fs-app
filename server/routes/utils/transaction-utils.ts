import { Customer, TransactionsDbResponse } from '../../common/types';

export const getProcessedTransactions = (transactionsDbResponse: TransactionsDbResponse[]) => {
  return transactionsDbResponse.map((trs) => {
    const { customer_id: customer, _id: transaction_id, ...trsRest } = trs;

    return {
      ...trsRest,
      transaction_id,
      ...getProcessedJoinedCustomer(customer),
    };
  });
};

const getProcessedJoinedCustomer = (customer: Customer) => {
  const { _id: customer_id, ...customerRest } = customer;
  return {
    customer_id,
    ...customerRest,
  };
};
