import { Menu } from 'antd';
import { useHistory } from 'react-router';

const NavBar = () => {
  const history = useHistory();

  const redirectTo = (path: string) => {
    history.push(path);
  };

  const getDefaultSelectedKey = () => {
    const currentPathArray = history.location.pathname.split('/');
    const currnePath = currentPathArray[currentPathArray.length - 1];

    switch (currnePath) {
      case 'transactions':
        return ['1'];
      case 'create':
        return ['2'];
      default:
        return ['1'];
    }
  };

  return (
    <Menu
      style={{ width: '100%', overflow: 'hidden' }}
      defaultSelectedKeys={getDefaultSelectedKey()}
      mode="horizontal"
    >
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
