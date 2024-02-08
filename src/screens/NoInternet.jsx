import {View, Text, StatusBar, StyleSheet, Image} from 'react-native';
import React from 'react';
import appColors from '../utils/appColors';
import * as Animatable from 'react-native-animatable';
import appFonts from '../utils/appFonts';
import CustomButton from '../components/CustomButton';
import {fetch} from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';

const NoInternet = () => {
  const navigation = useNavigation();

  //   const reFreshPage = () => {
  //     fetch().then(state => {
  //       console.log('Connection type', state.type);
  //       console.log('Is connected?', state.isConnected);
  //       if (state?.isConnected) {
  //         navigation.navigate('splash');
  //       } else {
  //         navigation.navigate('not_internet');
  //       }
  //     });
  //   };
  return (
    <View style={styles.screen}>
      <StatusBar
        backgroundColor={appColors.appWhite}
        barStyle="light-content"
      />
      <Animatable.Image
        source={require('../assets/images/lostConnection.png')}
        style={{height: 360, width: '100%'}}
      />
      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: appFonts.otlineText,
            fontSize: 90,
            color: appColors.appRed,
          }}>
          OPPS
        </Text>
        <Text
          style={{
            fontFamily: appFonts.PoppinsMedium,
            color: appColors.appBlack,
            fontSize: 20,
          }}>
          No Internet Connection!
        </Text>
        <Text
          style={{
            fontFamily: appFonts.Poppins,
            color: appColors.appGray,
            textAlign: 'center',
            marginHorizontal: '10%',
          }}>
          Check your internet connection and then restart app and enjoy shoping
          journey
        </Text>
        {/* <CustomButton
          title="Refresh "
          isEnable={true}
          onPress={() => reFreshPage()}
          style={{paddingVertical: 6, paddingHorizontal: 20, marginTop: '10%'}}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: appColors.appWhite,
  },
});

export default NoInternet;
