import { all } from 'redux-saga/effects';
import user from './user';

const sagas = function* sagas() {
  yield all([user()]);
};

export default sagas;
