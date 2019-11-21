import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import { ToastContainer } from 'react-toastify';
import history from './utils/history';
import Routes from './routes';
import configureStore from './store/configureStore';
import GlobalStyle from './global-styles';
import 'react-toastify/dist/ReactToastify.css';

export const { store, persistor } = configureStore({}, history);

export default class App extends Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter history={history}>
              <ToastContainer style={{ width: '320px', padding: '0px' }} autoClose={5000} closeButton={false} />
              <Routes history={history} />
            </ConnectedRouter>
          </PersistGate>
        </Provider>
      </>
    );
  }
}
