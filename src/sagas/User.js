import { all, call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN,
  LOGOUT,
  loginFailure,
  loginRequested,
  loginSuccess,
  logoutFailure,
  logoutSuccess,
  logoutRequested,
  getMoviesRequested,
  getMoviesFailure,
  getMoviesSuccess,
  GET_MOVIES } from '../actions/user-actions-types';
import httpClient from './HttpClient';

export function* login() {
  yield put(loginRequested());

  const {
    error, result,
  } = yield call(httpClient, {
    data: {
      email: '',
      password: '',
    },
    method: 'post',
    url: '/abc',
  });

  if (error) {
    yield put(loginFailure(error));
  } else {
    yield put(loginSuccess(result));
  }
}

export function* logout() {
  yield put(logoutRequested());

  const { error } = yield call(httpClient, {
    data: {
      email: '',
      password: '',
    },
    method: 'put',
    url: '/abc',
  });

  if (error) {
    yield put(logoutFailure(error));
  } else {
    yield put(logoutSuccess());
  }
}

export function* getMovies() {
  yield put(getMoviesRequested());

  const {
    error, result,
  } = yield call(httpClient, {
    baseURL: 'https://facebook.github.io/react-native/',
    method: 'get',
    url: 'movies.json',
  });

  if (error) {
    yield put(getMoviesFailure(error));
  } else {
    yield put(getMoviesSuccess(result.movies));
  }
}

function* User() {
  yield all([takeLatest(GET_MOVIES, getMovies), takeLatest(LOGIN, login), takeLatest(LOGOUT, logout)]);
}

export default User;
