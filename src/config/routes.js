import ChangePassword from '../containers/auth/ChangePassword';
import Dashboard from '../containers/Dashboard';
import ForgotPassword from '../containers/auth/ForgotPassword';
import Loader from '../components/common/Loader';
import Login from '../containers/auth/Login';
import Signup from '../containers/auth/Signup';
import Welcome from '../containers/Welcome';

export default {
  ChangePassword: { screen: ChangePassword },
  Dashboard: { screen: Dashboard },
  ForgotPassword: { screen: ForgotPassword },
  Loader: { screen: Loader },
  Login: { screen: Login },
  Signup: { screen: Signup },
  Welcome: { screen: Welcome },
};
