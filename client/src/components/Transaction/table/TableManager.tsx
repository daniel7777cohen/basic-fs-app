import React, { useContext, useEffect, useState } from 'react';
import { TransactionTableData } from '../../utils/types';
import { TableDisplay } from './TableDisplay';
import { ColumnsProps } from './ColumnsProps';
import { Container } from './Styles';
import { Button } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import { TransactionsContext } from '../../../context/Context';

const TableManager = ({ transactionsFormatted }: { transactionsFormatted: TransactionTableData[] }) => {
  const [data, setData] = useState<TransactionTableData[]>(transactionsFormatted);
  const [originalData] = useState(transactionsFormatted);
  const [skipPageReset, setSkipPageReset] = useState(false);

  const { deleteTrs, updateTrs } = useContext(TransactionsContext);

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
          debugger;
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
    setData(transactionsFormatted);
  }, [transactionsFormatted]);

  const onDeleteClick = () => {
    const rowsToDeleteParams = data
      .filter((row) => row.isSelected)
      .map(({ customer_id, transaction_id }) => {
        return { customer_id, transaction_id };
      });
    deleteTrs(rowsToDeleteParams);
  };

  const resetData = () => setData(originalData);

  return (
    <div>
      <span>{`Transactions(${data.length})`}</span>
      <Button style={{ marginRight: '20px', marginLeft: '20px' }} onClick={resetData}>
        Reset Data
      </Button>
      <DeleteFilled onClick={onDeleteClick} />
      <Container>
        <TableDisplay
          columns={ColumnsProps(onCheckboxClick)}
          data={data}
          updateMyData={updateMyData}
          onCheckboxClick={onCheckboxClick}
          skipPageReset={skipPageReset}
        />
      </Container>
    </div>
  );
};

export default TableManager;
