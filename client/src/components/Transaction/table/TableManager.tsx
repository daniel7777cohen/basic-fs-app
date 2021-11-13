import React, { useEffect, useState } from 'react';
import { TransactionFormatted } from '../../utils/types';
import { TableDisplay } from './TableDisplay';
import { ColumnsProps } from './Columns';
import { Container } from './Styles';

const TableManager = ({ transactionsFormatted }: { transactionsFormatted: TransactionFormatted[] }) => {
  const [data, setData] = useState<TransactionFormatted[]>(transactionsFormatted);
  const [originalData] = useState(data);
  const [skipPageReset, setSkipPageReset] = useState(false);

  const updateMyData = (rowIndex: number, columnId: number, value: string | number) => {
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

  const resetData = () => setData(originalData);

  return (
    <Container>
      <button onClick={resetData}>Reset Data</button>
      <TableDisplay
        columns={ColumnsProps()}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
    </Container>
  );
};

export default TableManager;
