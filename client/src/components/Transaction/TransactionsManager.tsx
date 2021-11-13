import styled from 'styled-components';
import { mockData } from '../../mock';
import TableManager from './table/TableManager';
import { translateTrsResponse } from '../utils/transaction-table';
import { useEffect, useState } from 'react';
import { TransactionFormatted } from '../utils/types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: scroll;
`;

const TransactionsManager = () => {
  const [transactions, setTransactions] = useState<TransactionFormatted[]>([]);

  const handleDelete = (newData: TransactionFormatted[]) => {
    setTransactions(newData);
  };

  useEffect(() => {
    setTransactions(translateTrsResponse(mockData));
  }, []);

  const hasTransactions = transactions.length > 0;

  return (
    <Container>
      {hasTransactions && <TableManager handleDelete={handleDelete} transactionsFormatted={transactions} />}
    </Container>
  );
};

export default TransactionsManager;
