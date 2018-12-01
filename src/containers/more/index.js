import React from 'react';
import { StyleSheet, View } from 'react-native';
import TimerMixin from 'react-timer-mixin';
import ReactMixin from 'react-mixin';
import { shape, func } from 'prop-types';
import Constants from '../../constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Colors.DASHBOARD_BG_COLOR,
    flex: 1,
  },
});

class Home extends React.Component {
  static propTypes = { navigation: shape({ navigate: func.isRequired }).isRequired };

  state = { searchText: '' };

  render() {
    return <View style={styles.container} />;
  }
}
ReactMixin(Home.prototype, TimerMixin);

export default Home;
