import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import appColors from '../../utils/appColors';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import appFonts from '../../utils/appFonts';
import OtpInputs from '../../components/otpInputs';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import {BASE_URL} from '../../utils/base_Url';
import {useDispatch} from 'react-redux';
import {setAccessToken} from '../../utils/helper';
import {
  setLoginStatus,
  setUserData,
} from '../../reduxManagment/splice/appSlice';

const Height = Dimensions.get('window').height;

const OtpVerification = props => {
  const otpDetails = props?.route?.params?.loginDetails;
  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');
  const [pin5, setPin5] = useState('');
  const [pin6, setPin6] = useState('');
  const [otpStatus, setOtpStatus] = useState('');
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  console.log(otpDetails.phone);

  const verifyOtpAndCompleteLogin = async () => {
    let otp = `${pin1}${pin2}${pin3}${pin4}${pin5}${pin6}`;
    if (Number(otp) === otpDetails?.otp) {
      setLoader(true);
      await axios
        .post(`${BASE_URL}/user/phone-login`, {
          phone: otpDetails?.phone,
          countryCode: otpDetails?.countryCode,
        })
        .then(res => {
          console.log(res.data, 'response login ');
          setAccessToken('accessToken', res?.data?.accessToken);
          dispatch(setUserData(res?.data?.data));
          dispatch(setLoginStatus(true));
          navigation.goBack();
        })
        .catch(error => {
          console.log(error.response?.data, 'this is exios eee');
        })
        .finally(() => {
          setLoader(false);
        });
    } else {
      setOtpStatus('Wrong otp try again');
    }
  };
  return (
    <View style={styles.screen}>
      <StatusBar
        backgroundColor={appColors.appBlack}
        barStyle="light-content"
      />
      <View style={styles.logoBg}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="close" size={30} color={appColors.appWhite} />
          </TouchableOpacity>
          <Animatable.Image
            animation="zoomIn"
            source={require('../../assets/images/logo2.png')}
            style={{height: 100, width: 100, marginStart: '26%'}}
          />
        </View>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <Animatable.View
            animation="slideInUp"
            duration={700}
            easing="ease-in-out"
            style={styles.forGround}>
            <View style={{marginTop: 30, marginHorizontal: '5%'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontFamily: appFonts.Poppins,
                    color: appColors.appBlack,
                    fontSize: 16,
                  }}>
                  Please enter the verification code we've send you on
                </Text>
                <Text
                  style={{
                    position: 'absolute',
                    fontFamily: appFonts.PoppinsMedium,
                    color: appColors.appBlack,
                    top: 22,
                    left: 100,
                    fontSize: 16,
                  }}>
                  {otpDetails?.phone}
                </Text>
              </View>
              <OtpInputs
                setPin1={setPin1}
                setPin2={setPin2}
                setPin3={setPin3}
                setPin4={setPin4}
                setPin5={setPin5}
                setPin6={setPin6}
                setOtpStatus={setOtpStatus}
              />
              <View
                style={{
                  marginTop: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '40%',
                  }}>
                  <ActivityIndicator color={appColors.appRed} size={25} />
                  <Text
                    style={{
                      fontFamily: appFonts.Poppins,
                      color: appColors.appBlack,
                      marginStart: 10,
                    }}>
                    Auto detect Otp
                  </Text>
                </View>
                <View
                  style={{
                    width: '60%',
                    paddingStart: 6,
                    alignItems: 'flex-end',
                  }}>
                  <Text
                    style={{
                      fontFamily: appFonts.Poppins,
                      color: appColors.appRed,
                      marginStart: 10,
                      fontSize: 12,
                    }}>
                    {otpStatus}
                  </Text>
                </View>
              </View>
            </View>
            <CustomButton
              isEnable={pin1 && pin2 && pin3 && pin4 && pin5 && pin6}
              title="Conferm"
              loader={loader}
              style={{
                ...styles.button,
                backgroundColor:
                  pin1 && pin2 && pin3 && pin4 && pin5 && pin6
                    ? appColors.appRed
                    : appColors.appGray,
              }}
              onPress={() => {
                if (pin1 && pin2 && pin3 && pin4 && pin5 && pin6) {
                  verifyOtpAndCompleteLogin();
                }
              }}
            />
          </Animatable.View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: appColors.appWhite,
  },
  logoBg: {
    backgroundColor: appColors.appBlack,
    height: '100%',
  },
  forGround: {
    position: 'absolute',
    backgroundColor: appColors.appWhite,
    top: Height / 6.6,
    right: 0,
    left: 0,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    bottom: 0,
  },
  button: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default OtpVerification;
