/* eslint-disable global-require */
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers/index';
import rootSaga from '../sagas/index';

// Build the middleware for intercepting and dispatching navigation actions
// const middleware = routerMiddleware(history);

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history = {}) {
  let store;

  const historyMiddleware = routerMiddleware(history);

  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['news'],
  };

  if (module.hot) {
    // Support hot reloading of components
    // Enable Webpack hot module replacement for reducers
    const composeEnhancers = composeWithDevTools({});
    const devToolMiddleware = composeEnhancers(
      applyMiddleware(
        historyMiddleware,
        sagaMiddleware,
      ),
    );

    store = createStore(
      persistReducer(persistConfig, rootReducer(history)),
      initialState,
      devToolMiddleware,
    );

    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  } else {
    store = createStore(
      persistReducer(persistConfig, rootReducer(history)),
      initialState,
      applyMiddleware(historyMiddleware, sagaMiddleware),
    );
  }

  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store, null);

  return { store, persistor };
}
