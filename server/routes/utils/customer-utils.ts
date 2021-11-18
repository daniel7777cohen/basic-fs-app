import { Customer } from '../../common/types';

export const getProcessedCustomers = (customersDbResponse: Customer[]) => {
  return customersDbResponse.map((customer) => {
    const { _id: customer_id, ...rest } = customer;
    return {
      customer_id,
      ...rest,
    };
  });
};
