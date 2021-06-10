import AppReducer from './reducers'
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga";
import { createStore, applyMiddleware } from 'redux';

export default () => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    AppReducer,
    applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(rootSaga)

  return store
}