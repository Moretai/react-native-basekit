import React, { PureComponent } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { func, shape } from 'prop-types';
import NavigationBar from 'react-native-navbar';
import Constants from '../constants';
import { Button } from '../components';

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: Constants.Colors.BUTTON_COLOR,
    marginTop: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 5,
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 90,
  },
  container: { flex: 1 },
  content: {
    alignItems: 'center',
    flex: 1,
  },
  logoStyle: {
    alignSelf: 'center',
    height: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 50,
    marginVertical: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 10,
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 50,
  },
});

class Welcome extends PureComponent {
  static propTypes = {
    navigation: shape({
      dispatch: func.isRequired,
      navigate: func.isRequired,
    }).isRequired,
  };

  render() {
    const { navigation: { navigate } } = this.props;

    return (
      <View style={styles.container}>
        <NavigationBar statusBar={{ style: 'default' }} />
        <View style={styles.content}>
          <Image resizeMode="contain" source={Constants.Images.logo} style={styles.logoStyle} />
          <Button onPress={() => navigate('Signup')} style={styles.buttonStyle} title="Signup" />
          <Button onPress={() => navigate('Login')} style={styles.buttonStyle} title="Login" />
        </View>
      </View>
    );
  }
}

export default Welcome;
