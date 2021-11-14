import styled from 'styled-components';
import TableManager from './table/TableManager';
import { translateTrsResponse } from '../utils/transaction-table';
import { useContext } from 'react';
import { TransactionsContext } from '../../context/Context';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: scroll;
`;

const TransactionsManager = () => {
  const { transactions } = useContext(TransactionsContext);
  const hasTransactions = transactions?.length > 0;

  return (
    <Container>
      {hasTransactions && (
        <TableManager
          transactionTableData={translateTrsResponse(transactions)}
        />
      )}
    </Container>
  );
};

export default TransactionsManager;
