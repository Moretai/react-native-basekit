import { applyMiddleware, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import sagas from '../sagas';
import { routerMiddleware } from './navigator';

const ConfigureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, applyMiddleware(routerMiddleware, sagaMiddleware));
  const persistor = persistStore(store);

  sagaMiddleware.run(sagas);

  return {
    persistor,
    store,
  };
};

export default ConfigureStore;
