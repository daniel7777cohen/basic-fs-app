import React, { useContext, useEffect, useState } from 'react';
import { TableDisplay } from './TableDisplay';
import { ColumnsProps } from './ColumnsProps';
import { Container } from './Styles';
import { DeleteFilled } from '@ant-design/icons';
import { TransactionsContext } from '../../../context/Context';
import { TransactionTableData } from '../../../common/types';
import { Spin } from 'antd';

const TableManager = ({ transactionTableData }: { transactionTableData: TransactionTableData[] }) => {
  const [data, setData] = useState<TransactionTableData[]>([]);
  const { updateTrs, isUpdating } = useContext(TransactionsContext);
  const [isDeletedFilter, setIsDeletedFilter] = useState(false);

  const onTableFieldChange = (rowIndex: number, field_name: string, value: string | number | boolean) => {
    const { transaction_id } = data[rowIndex];
    const params = {
      transaction_ids: [transaction_id],
      newValue: value,
      field: field_name,
    };
    updateTrs(params);
  };

  const onCheckboxClick = (rowIndex: number, columnId: any, value: string | number | boolean) => {
    setData((old: TransactionTableData[]) =>
      old.map((row: TransactionTableData, index: number) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  useEffect(() => {
    setData(transactionTableData);
  }, [transactionTableData]);

  const onDeleteClick = () => {
    const transactionIds = data
      .filter((row) => row.isSelected)
      .map(({ transaction_id }) => {
        return transaction_id;
      });

    const params = {
      transaction_ids: transactionIds,
      newValue: true,
      field: 'is_deleted',
    };
    updateTrs(params);
  };

  const toggleFilter = (checked: boolean) => {
    setIsDeletedFilter(checked);
  };

  useEffect(() => {
    let filteredData = [...transactionTableData];
    filteredData = filteredData.filter((row) => row.is_deleted === isDeletedFilter);
    setData(filteredData);
  }, [isDeletedFilter, transactionTableData]);

  return (
    <div>
      <div>{`Total Transactions(${transactionTableData.length})`}</div>
      <span>{`Displayed Transactions(${data.length})`}</span>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        Deleted
        <input
          style={{ marginLeft: '8px' }}
          type="checkbox"
          onChange={(e) => toggleFilter(e.target.checked)}
        />
      </div>
      <div style={{ display: 'flex', minHeight: '30px' }}>
        <DeleteFilled onClick={onDeleteClick} style={{ marginRight: '20px' }} />
        {isUpdating && <Spin />}
      </div>
      <Container>
        <TableDisplay
          columns={ColumnsProps(onCheckboxClick)}
          data={data}
          onTableFieldChange={onTableFieldChange}
          onCheckboxClick={onCheckboxClick}
          getRowProps={(row: any) => {
            return {
              style: {
                opacity: row.original.is_deleted ? 0.6 : 1,
              },
            };
          }}
        />
      </Container>
    </div>
  );
};

export default TableManager;
