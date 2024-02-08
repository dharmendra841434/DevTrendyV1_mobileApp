import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import appColors from '../utils/appColors';
import appFonts from '../utils/appFonts';

const CustomButton = ({
  title,
  style,
  onPress,
  isEnable,
  loader,
  titleStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={isEnable ? 0.6 : 1}
      onPress={onPress}
      style={{...styles.button, ...style}}>
      {loader ? (
        <View>
          {loader ? (
            <ActivityIndicator color={appColors.appWhite} size={25} />
          ) : (
            <Text style={{...styles.text, ...titleStyle}}>
              {title ? title : 'Set Your Button Text'}
            </Text>
          )}
        </View>
      ) : (
        <Text style={{...styles.text, ...titleStyle}}>
          {title ? title : 'Set Your Button Text'}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: appColors.appRed,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 3,
  },
  text: {
    fontFamily: appFonts.PoppinsMedium,
    color: appColors.appWhite,
  },
});

export default CustomButton;
