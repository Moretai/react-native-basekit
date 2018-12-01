import React from 'react';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import Constants from '../../constants';

const styles = StyleSheet.create({
  separatorStyle: {
    backgroundColor: Constants.Colors.BORDER_COLOR,
    height: 1,
  },
});
const Separator = ({ style }) => <View style={[styles.separatorStyle, style]} />;

Separator.propTypes = { style: ViewPropTypes.style };
Separator.defaultProps = { style: {} };

export default Separator;
