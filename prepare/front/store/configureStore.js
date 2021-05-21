import { createWrapper } from 'next-redux-wrapper';
import { createStore, applyMiddleware, compose  } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';


import reducer from '../reducers';

const configureStore = () => {
  const middleweares = [];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middleweares))
    : composeWithDevTools(applyMiddleware(...middleweares));
  const store = createStore(reducer, enhancer);
  return store;
  // const sagaMiddleware = createSagaMiddleware();
  // const middlewares = [sagaMiddleware, loggerMiddleware];

  // const store = createStore(reducer, enhancer);
  // store.sagaTask = sagaMiddleware.run(rootSaga);
  // return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;