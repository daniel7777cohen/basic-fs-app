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
  const { deleteTrs, transactions } = useContext(TransactionsContext);

  const handleDelete = (rowsToDeleteParams: { customerId: string; transactionId: string }[]) => {
    deleteTrs(rowsToDeleteParams);
  };

  const hasTransactions = transactions?.length > 0;

  return (
    <Container>
      {hasTransactions && (
        <TableManager
          handleDelete={handleDelete}
          transactionsFormatted={translateTrsResponse(transactions)}
        />
      )}
    </Container>
  );
};

export default TransactionsManager;
