import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Image,
  Animated,
  Easing,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import appColors from '../utils/appColors';
import appFonts from '../utils/appFonts';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../utils/base_Url';
import {useDispatch} from 'react-redux';
import {setLoginStatus, setUserData} from '../reduxManagment/splice/appSlice';
import {fetch} from '@react-native-community/netinfo';
const SplashScreen = () => {
  // const animatedValue = new Animated.Value(0);
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();

  const checkUserAuthantication = async () => {
    setLoader(true);
    const token = await AsyncStorage.getItem('accessToken');
    if (token !== null) {
      console.log('user auth');
      await axios
        .get(`${BASE_URL}/user/${token}`)
        .then(res => {
          // console.log(res.data?.user, 'userdetails');
          dispatch(setUserData(res.data?.user));
          dispatch(setLoginStatus(true));
          //navigation.navigate('home');
          navigation.navigate('home');
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setLoader(false);
          navigation.navigate('home');
        });
    } else {
      navigation.navigate('home');
    }
  };

  useEffect(() => {
    fetch().then(state => {
      // console.log('Connection type', state.type);
      //console.log('Is connected?', state.isConnected);
      if (state?.isConnected) {
        checkUserAuthantication();
        //navigation.navigate('not_internet');
      } else {
        navigation.navigate('not_internet');
      }
    });
  }, []);

  // setTimeout(() => {
  //   navigation.navigate('home');
  // }, 3000);

  return (
    <ImageBackground
      source={require('../assets/images/bb2.png')}
      style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#15161d" />
      {/* <View
        style={{alignItems: 'center', justifyContent: 'center', height: '90%'}}>
        <Animatable.Text
          animation="zoomIn"
          duration={1000}
          style={styles.logoText}>
          Dev Trendy
        </Animatable.Text>

        <Animatable.Text
          animation="zoomIn"
          duration={1000}
          style={styles.subtext}>
          Technology & Fashion
        </Animatable.Text>
      </View> */}
      {loader && (
        <ActivityIndicator
          style={{marginTop: -200}}
          color={appColors.appGray}
          size={50}
        />
      )}
      <Animatable.Image
        animation="zoomIn"
        duration={1000}
        source={require('../assets/images/logo2.png')}
        style={{
          width: '80%',
          height: 350,
          position: 'absolute',
          left: '10%',
          top: '18%',
          alignSelf: 'center',
          // transform: [{rotate: '45deg'}],
        }}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoText: {
    color: appColors.appRed,
    fontSize: 55,
    fontFamily: appFonts.PoppinsExtraBold,
  },
  subtext: {
    color: appColors.appGray,
    fontSize: 20,
    fontFamily: appFonts.Ubuntu,
  },
});

export default SplashScreen;
