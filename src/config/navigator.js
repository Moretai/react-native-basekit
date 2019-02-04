import { createStackNavigator } from 'react-navigation';
import { reduxifyNavigator,
  createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import routes from './routes';

const stackNavigatorConfiguration = {
  headerMode: 'none',
  mode: 'card',
  navigationOptions: { gesturesEnabled: false },
};

export const AppNavigator = createStackNavigator(
  routes,
  stackNavigatorConfiguration
);

// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigatorexport
export const routerMiddleware = createReactNavigationReduxMiddleware(
  'root',
  (state) => state.nav
);

const App = reduxifyNavigator(AppNavigator, 'root');
const mapStateToProps = (state) => ({ state: state.nav });
const navigator = connect(mapStateToProps)(App);

export default navigator;
