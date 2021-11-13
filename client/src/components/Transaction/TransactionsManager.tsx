import styled from 'styled-components';
import { mockData } from '../../mock';
import TransactionsTable from './table/TableManager';
import { translateTrsResponse } from '../utils/transaction-table';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: scroll;
`;

const TransactionsManager = () => {
  return (
    <Container>
      <TransactionsTable transactionsFormatted={translateTrsResponse(mockData)} />
    </Container>
  );
};

export default TransactionsManager;
