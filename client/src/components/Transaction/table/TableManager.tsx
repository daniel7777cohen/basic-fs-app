import React, { useEffect, useState } from 'react';
import { TransactionFormatted } from '../../utils/types';
import { TableDisplay } from './TableDisplay';
import { ColumnsProps } from './Columns';
import { Container } from './Styles';
import { Button } from 'antd';
import { DeleteFilled } from '@ant-design/icons';

const TableManager = ({
  transactionsFormatted,
  handleDelete,
}: {
  transactionsFormatted: TransactionFormatted[];
  handleDelete: (newData: TransactionFormatted[]) => void;
}) => {
  const [data, setData] = useState<TransactionFormatted[]>(transactionsFormatted);
  const [originalData] = useState(transactionsFormatted);
  const [skipPageReset, setSkipPageReset] = useState(false);

  const updateMyData = (rowIndex: number, columnId: any, value: string | number | boolean) => {
    setSkipPageReset(true);
    setData((old: TransactionFormatted[]) =>
      old.map((row: TransactionFormatted, index: number) => {
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
    setData(transactionsFormatted);
  }, [transactionsFormatted]);

  const onDeleteClick = () => {
    const newData = data.filter((row) => !row.isSelected);
    handleDelete(newData);
  };
  const resetData = () => setData(originalData);

  return (
    <Container>
      <span>{`Transactions(${data.length})`}</span>
      <Button style={{ marginRight: '20px', marginLeft: '20px' }} onClick={resetData}>
        Reset Data
      </Button>
      <DeleteFilled onClick={onDeleteClick} />
      <TableDisplay
        columns={ColumnsProps(updateMyData)}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
    </Container>
  );
};

export default TableManager;
