import React, { useContext, useEffect, useState } from 'react';
import { TableDisplay } from './TableDisplay';
import { ColumnsProps } from './ColumnsProps';
import { Container } from './Styles';
import { DeleteFilled } from '@ant-design/icons';
import { TransactionsContext } from '../../../context/Context';
import { TransactionTableData } from '../../../common/types';

const TableManager = ({ transactionTableData }: { transactionTableData: TransactionTableData[] }) => {
  const [data, setData] = useState<TransactionTableData[]>([]);
  const [skipPageReset, setSkipPageReset] = useState(false);
  const { deleteTrs, updateTrs } = useContext(TransactionsContext);
  const [isDeletedFilter, setIsDeletedFilter] = useState(false);

  const updateMyData = (rowIndex: number, columnId: any, value: string | number | boolean) => {
    setSkipPageReset(true);
    const editedRow = { ...data[rowIndex], [columnId]: value };
    updateTrs(editedRow);
  };

  const onCheckboxClick = (rowIndex: number, columnId: any, value: string | number | boolean) => {
    setSkipPageReset(true);
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
    setSkipPageReset(false);
  }, [data]);

  useEffect(() => {
    setData(transactionTableData);
  }, [transactionTableData]);

  const onDeleteClick = () => {
    const transactionIds = data
      .filter((row) => row.isSelected)
      .map(({ transaction_id }) => {
        return transaction_id;
      });
    deleteTrs(transactionIds);
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
      <DeleteFilled onClick={onDeleteClick} />
      <Container>
        <TableDisplay
          columns={ColumnsProps(onCheckboxClick)}
          data={data}
          updateMyData={updateMyData}
          onCheckboxClick={onCheckboxClick}
          skipPageReset={skipPageReset}
          getRowProps={(row: any) => {
            return {
              style: {
                opacity: row.original.is_deleted ? 0.3 : 1,
              },
            };
          }}
        />
      </Container>
    </div>
  );
};

export default TableManager;
