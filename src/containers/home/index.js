import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import TimerMixin from 'react-timer-mixin';
import ReactMixin from 'react-mixin';
import { arrayOf, shape, string, func } from 'prop-types';
import { connect } from 'react-redux';
import NavigationBar from 'react-native-navbar';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import Constants from '../../constants';
import * as userActions from '../../actions/user-actions-types';
import { NavButton } from '../../components';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Colors.DASHBOARD_BG_COLOR,
    flex: 1,
  },
  navTextStyle: { ...Constants.Fonts.headerBold },
  navigationBarStyle: {
    backgroundColor: Constants.Colors.DASHBOARD_BG_COLOR,
    ...ifIphoneX({ height: 64 }, { height: 44 }),
  },
  rowStyle: { padding: Constants.BaseStyle.PADDING },
  textStyle: { ...Constants.Fonts.regular },
});

class Home extends React.Component {
  componentDidMount() {
    const { getMovies } = this.props;

    getMovies();
  }

  render() {
    const { movies } = this.props;
    const titleConfig = {
      ellipsizeMode: 'clip',
      numberOfLines: 1,
      style: styles.navTextStyle,
      title: 'Dashboard',
    };

    return (
      <View style={styles.container}>
        <NavigationBar
          style={styles.navigationBarStyle}
          statusBar={{
            backgroundColor: Constants.Colors.DASHBOARD_BG_COLOR,
            style: 'default',
          }}
          title={titleConfig}
          leftButton={<NavButton hideIcon text="" />}
        />
        <FlatList
          style={styles.container}
          data={movies}
          renderItem={({
            item: {
              title, releaseYear,
            },
          }) => (
            <View style={styles.rowStyle}>
              <Text style={styles.textStyle}>{title}</Text>
              <Text style={styles.textStyle}>{`Release Year: ${releaseYear}`}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

Home.propTypes = {
  getMovies: func.isRequired,
  movies: arrayOf(
    shape({
      releaseYear: string.isRequired,
      title: string.isRequired,
    })
  ).isRequired,
};

ReactMixin(Home.prototype, TimerMixin);

const mapStateToProps = ({ user: { movies } }) => ({ movies });

export default connect(
  mapStateToProps,
  { getMovies: userActions.getMovies }
)(Home);
