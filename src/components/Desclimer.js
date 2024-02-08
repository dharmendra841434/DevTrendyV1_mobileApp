import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import BottomSlide from './BottomSlide';
import appColors from '../utils/appColors';
import Icon from 'react-native-vector-icons/Ionicons';
import appFonts from '../utils/appFonts';
import CustomButton from './CustomButton';

const Disclaimer = ({isOpen, setIsOpen, onPress}) => {
  return (
    <View>
      <BottomSlide modalVisible={isOpen} setModalVisible={setIsOpen}>
        <View style={styles.container}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: appFonts.PoppinsBold,
                color: appColors.appRed,
                fontSize: 28,
                textTransform: 'uppercase',
              }}>
              Disclaimer
            </Text>
            {/* <Image
              source={require('../assets/images/dis.png')}
              style={{width: 50, height: 50}}
            /> */}
          </View>
          <Text
            style={{
              width: '85%',
              fontFamily: appFonts.Poppins,
              color: appColors.appBlack,
              textAlign: 'justify',
              marginTop: '2%',
            }}>
            This app is currently in the testing phase, during which all
            features are operational and functioning as intended. However,
            please be aware that as testing continues, there may still be
            unforeseen issues or bugs that could impact the app's performance or
            user experience.
          </Text>
          <CustomButton
            isEnable={true}
            title="I understand"
            style={styles.button}
            onPress={onPress}
          />
        </View>
      </BottomSlide>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.appWhite,
    width: '95%',
    height: '40%',
    borderRadius: 4,
    alignItems: 'center',
    paddingVertical: '5%',
  },
  button: {
    backgroundColor: '#21b504',
    paddingHorizontal: '8%',
    marginTop: '3%',
  },
});

export default Disclaimer;
