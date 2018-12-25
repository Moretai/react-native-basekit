import React from 'react';
import { Keyboard, findNodeHandle, View, Image, ScrollView, Text, Platform, TouchableOpacity } from 'react-native';
import NavigationBar from 'react-native-navbar';
import _ from 'lodash';
import { func, shape } from 'prop-types';
import TimerMixin from 'react-timer-mixin';
import ReactMixin from 'react-mixin';
import { ToastActionsCreators } from 'react-native-redux-toast';
import Regex from '../../utilities/Regex';
import Constants from '../../constants';
import styles from './Styles';
import { Button, TextInput, NavButton } from '../../components';

class Login extends React.Component {
  static propTypes = {
    navigation: shape({
      dispatch: func.isRequired,
      navigate: func.isRequired,
    }).isRequired,
  };

  state = {
    password: '',
    username: '',
  };

  usernameRef = React.createRef();
  passwordRef = React.createRef();
  scrollViewRef = React.createRef();

  onSubmit = () => {
    Keyboard.dismiss();

    const {
      username, password,
    } = this.state;
    const {
      navigation: {
        dispatch, navigate,
      },
    } = this.props;
    const {
      enterEmail, enterValidEmail, enterPassword, invalidPassword,
    } = Constants.i18n.validations;

    if (_.isEmpty(username.trim())) {
      dispatch(ToastActionsCreators.displayInfo(enterEmail));

      return;
    }

    if (!Regex.validateEmail(username.trim())) {
      dispatch(ToastActionsCreators.displayInfo(enterValidEmail));

      return;
    }

    if (_.isEmpty(password.trim())) {
      dispatch(ToastActionsCreators.displayInfo(enterPassword));

      return;
    }

    if (!Regex.validatePassword(password.trim())) {
      dispatch(ToastActionsCreators.displayInfo(invalidPassword));

      return;
    }

    navigate('Dashboard');
  };

  handleScrollView = (ref) => {
    const context = this;
    const scrollResponder = context.scrollViewRef.current.getScrollResponder();

    context.setTimeout(() => {
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        ref,
        (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 20,
        true
      );
    }, 300);
  };

  resetScrollView = (ref) => {
    const context = this;
    const scrollResponder = context.scrollViewRef.current.getScrollResponder();

    context.setTimeout(() => {
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(ref, 0, true);
    }, 300);
  };

  render() {
    const {
      username, password,
    } = this.state;
    const {
      navigation: {
        navigate, goBack,
      },
    } = this.props;
    const {
      common: {
        emailAddress, password: passwordText, forgotPass, or,
      },
      login: {
        login, createAccount,
      },
    } = Constants.i18n;

    return (
      <View style={styles.container}>
        <NavigationBar
          style={styles.navigationBarStyle}
          statusBar={{ style: 'default' }}
          leftButton={<NavButton onPress={() => goBack()} />}
        />
        <View style={styles.content}>
          <ScrollView
            ref={this.scrollViewRef}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
            keyboardShouldPersistTaps="always"
          >
            <Image source={Constants.Images.logo} style={styles.logoStyle} />
            <TextInput
              ref={this.usernameRef}
              value={username}
              placeholder={emailAddress}
              returnKeyType="next"
              keyboardType="email-address"
              onChangeText={(name) => this.setState({ username: name })}
              onFocus={() => {
                this.handleScrollView(findNodeHandle(this.usernameRef.current));
              }}
              onBlur={() => {
                this.resetScrollView(findNodeHandle(this.usernameRef.current));
              }}
              onSubmitEditing={() => this.passwordRef.current.focus()}
            />
            <TextInput
              ref={this.passwordRef}
              value={password}
              placeholder={passwordText}
              returnKeyType="done"
              secureTextEntry
              maxLength={16}
              onChangeText={(pass) => this.setState({ password: pass })}
              onFocus={() => {
                this.handleScrollView(findNodeHandle(this.passwordRef.current));
              }}
              onBlur={() => {
                this.resetScrollView(findNodeHandle(this.passwordRef.current));
              }}
              onSubmitEditing={this.onSubmit}
            />
            <TouchableOpacity
              hitSlop={Constants.BaseStyle.HIT_SLOP}
              onPress={() => navigate('ForgotPassword')}
              activeOpacity={0.9}
            >
              <Text style={styles.textDecorationLineStyle}>{`${forgotPass.toUpperCase()}?`}</Text>
            </TouchableOpacity>
            <Button onPress={this.onSubmit} style={styles.buttonStyle} title={login.toUpperCase()} />
            <Text style={styles.sepratorStyle}>{or}</Text>
            <TouchableOpacity
              hitSlop={Constants.BaseStyle.HIT_SLOP}
              onPress={() => navigate('Signup')}
              activeOpacity={0.9}
            >
              <Text style={styles.textDecorationLineStyle}>{createAccount}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}
ReactMixin(Login.prototype, TimerMixin);

export default Login;
