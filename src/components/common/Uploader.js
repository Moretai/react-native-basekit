import React from 'react';
import { Image, View, ViewPropTypes, StyleSheet, Text, Platform, TouchableOpacity } from 'react-native';
import { bool, func, string, number } from 'prop-types';
import Constants from '../../constants';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderColor: Constants.Colors.BORDER_COLOR,
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 2,
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 90,
    ...Platform.select({
      android: { height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 7.8 },
      ios: { height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 5 },
    }),
  },
  iconStyle: {
    alignSelf: 'center',
    marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3,
  },
  textInputStyle: {
    color: Constants.Colors.BLACK,
    flex: 1,
    marginHorizontal: 10,
    ...Constants.Fonts.regular,
  },
});

const Uploader = ({
  container,
  value,
  textInputStyle,
  icon,
  iconStyle,
  rightButton,
  leftButton,
  onPress,
  placeholderTextColorInput,
}) => {
  const textStyle = {
    ...textInputStyle,
    color: placeholderTextColorInput,
  };

  return (
    <TouchableOpacity
      hitSlop={Constants.BaseStyle.HIT_SLOP}
      activeOpacity={0.9}
      style={[styles.container, container]}
      onPress={onPress}
    >
      {leftButton && (
        <View>
          <Image resizeMode="contain" source={icon} style={[styles.iconStyle, iconStyle]} />
        </View>
      )}
      <Text style={[styles.textInputStyle, textStyle]}>{value}</Text>
      {rightButton && (
        <View>
          <Image resizeMode="contain" source={icon} style={[styles.iconStyle, iconStyle]} />
        </View>
      )}
    </TouchableOpacity>
  );
};

Uploader.propTypes = {
  container: ViewPropTypes.style,
  icon: number,
  iconStyle: ViewPropTypes.style,
  leftButton: bool,
  onPress: func.isRequired,
  placeholderTextColorInput: string,
  rightButton: bool,
  textInputStyle: ViewPropTypes.style,
  value: string.isRequired,
};

Uploader.defaultProps = {
  container: {},
  icon: Constants.Images.iconSearch,
  iconStyle: {},
  leftButton: false,
  placeholderTextColorInput: Constants.Colors.BORDER_COLOR,
  rightButton: false,
  textInputStyle: {},
};

export default Uploader;
