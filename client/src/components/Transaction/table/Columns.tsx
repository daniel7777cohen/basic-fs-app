import { useMemo } from 'react';

export const ColumnsProps = () => {
  return useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Address',
        accessor: 'address',
      },
      {
        Header: 'Currency',
        accessor: 'currency',
      },
      {
        Header: 'Credit Card Type',
        accessor: 'creditCardType',
      },
      {
        Header: 'Credit Card Number',
        accessor: 'creditCardNumber',
      },
    ],
    []
  );
};
