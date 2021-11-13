import { Menu } from 'antd';
import { useHistory } from 'react-router';

const NavBar = () => {
  const history = useHistory();

  const redirectTo = (path: string) => {
    history.push(path);
  };

  return (
    <Menu style={{ width: '100%' }} defaultSelectedKeys={['1']} mode="horizontal">
      <Menu.Item onClick={() => redirectTo('/transactions')} key="1">
        VIEW{' '}
      </Menu.Item>
      <Menu.Item onClick={() => redirectTo('/transactions/create')} key="2">
        Create{' '}
      </Menu.Item>
    </Menu>
  );
};

export default NavBar;
