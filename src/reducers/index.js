import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import news from './news';

const rootReducer = (history) => {
  const appReducer = combineReducers({
    router: connectRouter(history),
    news,
  });

  const rootReducerModified = (state, action) => appReducer(state, action)

  return rootReducerModified;
};

export default rootReducer;
