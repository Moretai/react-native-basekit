import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewPropTypes, Image } from 'react-native';
import { oneOfType, bool, func, string, number } from 'prop-types';
import Constants from '../../constants';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Constants.Colors.TRANSPARENT,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2,
  },
  iconStyle: {
    height: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 6,
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 6,
  },
  textStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Constants.Colors.TRANSPARENT,
    color: Constants.Colors.BLACK,
    justifyContent: 'center',
    marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 1,
    textAlign: 'left',
    ...Constants.Fonts.large,
  },
});

const NavButton = (props) => {
  const {
    hideIcon, iconName, onPress, style, textStyle, text,
  } = props;

  return (
    <TouchableOpacity
      hitSlop={Constants.BaseStyle.HIT_SLOP}
      underlayColor={Constants.Colors.TRANSPARENT}
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {!hideIcon && <Image source={iconName} style={styles.iconStyle} />}
      <Text style={[styles.textStyle, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

NavButton.propTypes = {
  hideIcon: bool,
  iconName: oneOfType([string, number]),
  onPress: func,
  style: ViewPropTypes.style,
  text: string,
  textStyle: Text.propTypes.style,
};

NavButton.defaultProps = {
  hideIcon: false,
  iconName: Constants.Images.back,
  onPress: () => true,
  style: {},
  text: 'Back',
  textStyle: {},
};

export default NavButton;
