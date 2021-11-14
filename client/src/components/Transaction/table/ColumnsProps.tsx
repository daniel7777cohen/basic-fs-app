import { useMemo } from 'react';

export const ColumnsProps = (
  onCheckboxClick: (rowIndex: number, columnId: any, value: string | number | boolean) => void
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
                onCheckboxClick(row.index, 'isSelected', e.target.checked);
              }}
              type="checkbox"
              checked={row.original.isSelected}
            />
          );
        },
      },
      {
        Header: 'First Name',
        accessor: 'first_name',
      },
      {
        Header: 'Last Name',
        accessor: 'last_name',
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
        accessor: 'total_price',
      },
      {
        Header: 'Currency',
        accessor: 'currency',
      },
      {
        Header: 'Credit Card Type',
        accessor: 'credit_card_type',
      },
      {
        Header: 'Credit Card Number',
        accessor: 'credit_card_number',
      },
    ],
    [onCheckboxClick]
  );
};
