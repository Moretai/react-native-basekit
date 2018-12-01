import { call, select, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { ToastActionsCreators } from 'react-native-redux-toast';
import axios from 'axios';
import { NetInfo } from 'react-native';
import { showLoader, hideLoader } from '../actions/app-action-types';
import { logout } from '../actions/user-actions-types';

export const checkInternetConnectivty = () => new Promise((resolve, reject) => {
  NetInfo.isConnected.fetch().then((isConnected) => {
    if (isConnected) {
      resolve(isConnected);
    } else {
      reject(new Error('no intenet'));
    }
  });
});

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
});

// Add a request interceptor
instance.interceptors.request.use((config) => config, (error) => Promise.reject(error));

// Add a response interceptor
instance.interceptors.response.use((response) => response, (error) => Promise.reject(error));

function* httpClient(data) {
  const loginToken = yield select(({ user: { token } }) => token);
  const payload = {
    ...data,
    token: loginToken,
  };

  try {
    const isCoon = yield call(checkInternetConnectivty);

    if (isCoon) {
      yield put(showLoader());
      yield call(delay, 1000);

      try {
        const {
          data: result, error,
        } = yield call(instance, payload);

        yield put(hideLoader());

        return {
          data: result,
          error,
        };
      } catch (error) {
        yield put(hideLoader());
        if (error) {
          if (error.status === 401) {
            yield put(logout());
            yield put(ToastActionsCreators.displayInfo('Session Expired. Please login again.'));
          } else {
            yield put(ToastActionsCreators.displayInfo('Something went wrong.'));
          }
        }
      }
    }
  } catch (error) {
    yield put(ToastActionsCreators.displayInfo('Please make sure you\'re connected with internet.'));
  }

  return {
    data: null,
    error: true,
  };
}

export default httpClient;
