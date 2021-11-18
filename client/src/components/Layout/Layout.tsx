import React from 'react';
import styled from 'styled-components';


interface Props {
  children: React.ReactNode;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding-top: 40px;
  position: relative;
`;

const Layout = ({ children }: Props) => {

  return (
    <Wrapper>
      <>{children}</>
    </Wrapper>
  );
};

export default Layout;
