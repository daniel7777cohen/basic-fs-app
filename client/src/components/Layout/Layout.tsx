import React from 'react';
import styled from 'styled-components';
import { colors } from '../../common/styles/colors';

interface Props {
  children: React.ReactNode;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${colors.layout};
  height: 100%;
  padding: 20px 0;
`;

const Layout = ({ children }: Props) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Layout;
