import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Homepage from './pages/Homepage';
import TransactionRouter from './routes/TransactionsRouter';
import Layout from './components/Layout/Layout';

const App = () => {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/transactions" component={TransactionRouter} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </Layout>
  );
};

export default App;
