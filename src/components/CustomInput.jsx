import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import appColors from '../utils/appColors';
import appFonts from '../utils/appFonts';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomInput = ({
  keyboardType,
  OnSelectCountryCode,
  selectedCode,
  maxLength,
  onChangeText,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View style={{position: 'relative', marginTop: 20}}>
      <View
        style={{
          ...styles.inputContainer,
          borderColor: isFocus ? '#320ff7' : appColors.borderColor,
        }}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={OnSelectCountryCode}
            style={{
              justifyContent: 'center',
              width: '13%',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text>{selectedCode}</Text>
            <Icon name="caret-down-outline" />
          </TouchableOpacity>
          <TextInput
            cursorColor={appColors.appBlack}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            style={{
              width: '87%',
              paddingStart: 10,
              fontFamily: appFonts.Poppins,
              justifyContent: 'center',
              paddingTop: 16,
              paddingBottom: 8,
            }}
            maxLength={maxLength}
          />
        </View>
        <Text
          style={{
            position: 'absolute',
            top: -12,
            left: 10,
            backgroundColor: appColors.appWhite,
            paddingHorizontal: 10,
            fontFamily: appFonts.Poppins,
            color: isFocus ? '#320ff7' : appColors.appGray,
          }}>
          Phone Number
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderRadius: 6,
  },
});

export default CustomInput;
