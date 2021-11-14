import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import TransactionCreate from '../components/Transaction/create/TransactionCreate';
import TransactionsManager from '../components/Transaction/TransactionsManager';

const TransactionRouter = () => {
  const routeMatch = useRouteMatch();

  const getFullPath = (path: string) => {
    return routeMatch.path + path;
  };

  return (
    <Switch>
      <Route exact path={`${getFullPath('/')}`} component={TransactionsManager} />
      <Route exact path={`${getFullPath('/create')}`} component={TransactionCreate} />
      <Redirect from="*" to="/transactions" />
    </Switch>
  );
};

export default TransactionRouter;
