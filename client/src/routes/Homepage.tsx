import { useHistory } from 'react-router-dom';
import { Button as ButtonComponent } from 'antd';
import styled from 'styled-components';

const Button = styled(ButtonComponent)``;

const Homepage = () => {
  const history = useHistory();

  const redirectTo = (path: string) => {
    history.push(path);
  };

  return (
    <div>
      <Button onClick={() => redirectTo('/transactions')}>View Transactions</Button>
      <Button onClick={() => redirectTo('/transactions/create')}>Create a transaction</Button>
    </div>
  );
};

export default Homepage;
