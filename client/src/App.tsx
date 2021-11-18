import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import TransactionRouter from './routes/TransactionsRouter';
import Layout from './components/Layout/Layout';
import NavBar from './components/NavBar/NavBar';
import TransactionsProvider from './context/Context';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #d8d8d8;
  height: 100%;
  width:100%;
`;

const App = () => {
  return (
    <>
      <TransactionsProvider>
        <Router>
          <NavBar />
          <Wrapper>
            <Layout>
              <Switch>
                <Route path="/transactions" component={TransactionRouter} />
                <Redirect from="*" to="/transactions" />
              </Switch>
            </Layout>
          </Wrapper>
        </Router>
      </TransactionsProvider>
    </>
  );
};

export default App;
