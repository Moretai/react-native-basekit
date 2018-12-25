import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from '../../constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Colors.DASHBOARD_BG_COLOR,
    flex: 1,
  },
});

const More = () => <View style={styles.container} />;

export default More;
