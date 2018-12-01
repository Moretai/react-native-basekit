import React from 'react';
import { NetInfo, View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import configureStore from './config/ConfigureStore';
import Root from './Root';
import Constants from './constants';
import './utilities/StringEn';
import Loader from './components/common/Loader';

const {
  store, persistor,
} = configureStore();

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Colors.White,
    flex: 1,
  },
});

class src extends React.Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true; // eslint-disable-line
  }

  componentDidMount() {
    this.handleNetwork();
  }

  handleNetwork = () => {
    function handleFirstConnectivityChange() {
      NetInfo.isConnected.removeEventListener('connectionChange', handleFirstConnectivityChange);
    }
    NetInfo.isConnected.addEventListener('connectionChange', handleFirstConnectivityChange);
    NetInfo.isConnected.fetch().then(() => {});
  };

  render() {
    return (
      <View style={styles.container}>
        <Provider store={store}>
          <PersistGate loading={<Loader />} persistor={persistor}>
            <Root />
          </PersistGate>
        </Provider>
      </View>
    );
  }
}

export default src;
