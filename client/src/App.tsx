import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import TransactionRouter from './routes/TransactionsRouter';
import Layout from './components/Layout/Layout';
import NavBar from './components/NavBar/NavBar';
import TransactionsProvider from './context/Context';

const App = () => {
  return (
    <>
      <TransactionsProvider>
        <Router>
          <NavBar />
          <Layout>
            <Switch>
              <Route path="/transactions" component={TransactionRouter} />
              <Redirect from="*" to="/transactions" />
            </Switch>
          </Layout>
        </Router>
      </TransactionsProvider>
    </>
  );
};

export default App;
