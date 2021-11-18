import styled from 'styled-components';
import { colors } from '../../../common/styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1650px;
  margin-top: 20px;
  overflow: scroll;
  min-height: 518px;
  box-shadow: 0px 3px 15px 8px rgb(0 0 0 / 50%);
  background-color: white;

  @media screen and (max-width: 1500px) {
    max-width: 1375px;
  }

  table {
    background-color: ${colors.white};
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 8px;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      max-width: 200px;

      :last-child {
        border-right: 0;
      }

      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;
