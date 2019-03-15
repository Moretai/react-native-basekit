import { NavigationActions, createStackNavigator } from 'react-navigation';
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import React from 'react';
import { Alert, BackHandler } from 'react-native';
import { shape, string, number, func } from 'prop-types';
import routes from './routes';

const stackNavigatorConfiguration = {
  headerMode: 'none',
  mode: 'card',
  navigationOptions: { gesturesEnabled: false },
};

export const AppNavigator = createStackNavigator(routes, stackNavigatorConfiguration);

// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigatorexport
export const routerMiddleware = createReactNavigationReduxMiddleware('root', (state) => state.nav);

const App = reduxifyNavigator(AppNavigator, 'root');

class navigator extends React.Component {
  static propTypes = {
    dispatch: func.isRequired,
    nav: shape({
      index: number,
      key: string.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const {
      nav, dispatch,
    } = this.props;

    if (nav.index === 0) {
      Alert.alert(
        'Exit',
        'Are you sure you want close the labeltone?',
        [
          {
            onPress: () => BackHandler.exitApp(),
            text: 'Yes',
          },
          {
            style: 'cancel',
            text: 'Cancel',
          },
        ],
        { cancelable: false }
      );
    }
    dispatch(NavigationActions.back());

    return true;
  };

  render() {
    const {
      nav, dispatch,
    } = this.props;

    return <App state={nav} dispatch={dispatch} />;
  }
}

const mapStateToProps = ({ nav }) => ({ nav });

export default connect(mapStateToProps)(navigator);
