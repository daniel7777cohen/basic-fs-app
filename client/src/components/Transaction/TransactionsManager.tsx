import styled from 'styled-components';
import TableManager from './table/TableManager';
import { translateTrsResponse } from '../utils/transaction-table-utils';
import { useContext } from 'react';
import { TransactionsContext } from '../../context/Context';
import { Spin } from 'antd';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: scroll;
`;

const TransactionsManager = () => {
  const { transactions, isTransactionsLoaded } = useContext(TransactionsContext);

  const hasTransactions = () => {
    return !isTransactionsLoaded && transactions.length > 0;
  };

  const renderTransactions = () =>
    hasTransactions() ? (
      <TableManager transactionTableData={translateTrsResponse(transactions)} />
    ) : (
      <span>No Transactions</span>
    );

  return <Container>{isTransactionsLoaded ? <Spin size={'large'} /> : renderTransactions()}</Container>;
};

export default TransactionsManager;
