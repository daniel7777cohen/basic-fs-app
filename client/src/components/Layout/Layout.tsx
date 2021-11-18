import React, { useContext } from 'react';
import styled from 'styled-components';
import { colors } from '../../common/styles/colors';
import { TransactionsContext } from '../../context/Context';

interface Props {
  children: React.ReactNode;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${colors.layout};
  height: 100%;
  padding-top: 80px;
`;

const Layout = ({ children }: Props) => {
  const { notification } = useContext(TransactionsContext);

  return (
    <Wrapper>
      <>
        {
          <div
            style={{
              position: 'fixed',
              bottom: 0,
              top: '60px',
              left: 'auto',
              fontSize: '32px',
            }}
          >
            {notification}
          </div>
        }
        {children}
      </>
    </Wrapper>
  );
};

export default Layout;
