import { useMemo } from 'react';

export const ColumnsProps = (
  updateMyData: (rowIndex: number, columnId: any, value: string | number | boolean) => void
) => {
  return useMemo(
    () => [
      {
        Header: '',
        accessor: 'isSelected',
        Cell: ({ row }: { row: any }) => {
          return (
            <input
              onChange={(e) => {
                updateMyData(row.index, 'isSelected', e.target.checked);
              }}
              type="checkbox"
              checked={row.original.isSelected}
            />
          );
        },
      },
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
        Header: 'Total Price',
        accessor: 'totalPrice',
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
