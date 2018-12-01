import { NetInfo } from 'react-native';
import Connection from '../config/Connection';

export const httpClient = ({
  url = '', method = 'post', data, token = '',
}) => new Promise((resolve) => {
  NetInfo.isConnected.fetch().then((isConnected) => {
    if (isConnected) {
      fetch(Connection.getBaseUrl() + url, {
        body: JSON.stringify(data),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-authorization': token,
        },
        method,
        timeout: 1000 * 1 * 60,
      });
    } else {
      resolve({ message: 'Check your internet connectivity' });
    }
  });
});

export const mediaUpload = ({
  url = '', method = 'post', data, token = '',
}) => new Promise((resolve) => {
  NetInfo.isConnected.fetch().then((isConnected) => {
    if (isConnected) {
      fetch(Connection.getBaseUrl() + url, {
        body: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          'x-authorization': token,
        },
        method,
        timeout: 1000 * 1 * 60,
      })
        .then((response) => response.text())
        .then((responseText) => {
          resolve(JSON.parse(responseText));
        })
        .catch(() => {
          resolve({ message: 'Something went wrong. Please try after somtime' });
        });
    } else {
      resolve({ message: 'Check your internet connectivity' });
    }
  });
});
