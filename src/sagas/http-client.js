import { call, select, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { ToastActionsCreators } from 'react-native-redux-toast';
import { NetInfo } from 'react-native';
import Idx from 'idx';
import { showLoader, hideLoader } from '../actions/app-action-types';
import { logoutSuccess,
  setAuthenticationToken } from '../actions/user-actions-types';
import axiosInstance from '../utilities/axios-instance';

export const checkInternetConnectivity = () => new Promise((resolve, reject) => {
  NetInfo.isConnected.fetch().then((isConnected) => {
    if (isConnected) {
      resolve(isConnected);
    } else {
      reject(new Error('no internet'));
    }
  });
});

function* HttpClient(payload) {
  yield put(showLoader());

  const authToken = yield select(({ user: { token } }) => token);
  const data = {
    ...payload,
    headers: { Authorization: authToken },
  };

  try {
    const isCoon = yield call(checkInternetConnectivity);

    if (isCoon) {
      try {
        yield call(delay, 1000);
        const {
          data: result,
          headers: { Authorization: authenticationToken = '' },
        } = yield call(axiosInstance, data);

        yield put(hideLoader());
        if (authenticationToken) {
          yield put(setAuthenticationToken(authenticationToken));
        }

        return {
          error: null,
          result,
        };
      } catch (error) {
        yield put(hideLoader());
        if (Idx(error, (_) => _.statusCode)) {
          if (error.statusCode === 401) {
            yield put(logoutSuccess());
            yield put(
              ToastActionsCreators.displayInfo(
                'Session Expired. Please login again.'
              )
            );
          } else {
            yield put(ToastActionsCreators.displayInfo(error.message));
          }
        } else {
          yield put(
            ToastActionsCreators.displayInfo(
              'Something went wrong. Please again later.'
            )
          );
        }

        return {
          error,
          result: null,
        };
      }
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(
      ToastActionsCreators.displayInfo(
        'Please make sure you\'re connected with internet.'
      )
    );
  }

  return {
    error: true,
    result: null,
  };
}

export default HttpClient;
