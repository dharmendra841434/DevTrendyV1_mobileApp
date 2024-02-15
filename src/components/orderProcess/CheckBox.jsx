import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import appColors from '../../utils/appColors';
import appFonts from '../../utils/appFonts';

const CheckBox = ({title, subText, OnChecked, children, isChecked}) => {
  // const [isChecked, setIsChecked] = useState(true);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: '3%',
      }}>
      <View style={{flexDirection: 'row', columnGap: 8}}>
        <TouchableOpacity activeOpacity={0.6} onPress={OnChecked}>
          <View
            style={{
              ...styles.radioOuter,
              borderColor: isChecked ? appColors.appBlue : appColors.appGray,
            }}>
            <View
              style={{
                ...styles.radioInner,
                backgroundColor: isChecked
                  ? appColors.appBlue
                  : appColors.appGray,
              }}
            />
          </View>
        </TouchableOpacity>
        <View>
          <Text
            style={{
              fontFamily: appFonts.Poppins,
              fontSize: 15,
              color: appColors.appBlack,
              marginTop: -4,
            }}>
            {title}
          </Text>
          <Text
            style={{
              fontFamily: appFonts.Poppins,
              fontSize: 13,
              marginTop: -3,
              color: appColors.appGray,
            }}>
            {subText}
          </Text>
        </View>
      </View>
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  radioOuter: {
    height: 20,
    width: 20,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  radioInner: {
    height: 15,
    width: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: appColors.appWhite,
  },
});
export default CheckBox;
