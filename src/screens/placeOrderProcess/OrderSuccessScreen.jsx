import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import appColors from '../../utils/appColors';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import appFonts from '../../utils/appFonts';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getUserDetails,
  getUserOrders,
} from '../../reduxManagment/splice/appSlice';
import {useDispatch, useSelector} from 'react-redux';

const OrderSuccessScreen = () => {
  const userData = useSelector(state => state?.app?.userData);
  const navigation = useNavigation();
  const [seconds, setSeconds] = useState(5);
  const dispatch = useDispatch();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        navigation.navigate('Account');
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds]);
  const updateUser = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token !== null) {
      dispatch(getUserDetails(token));
      dispatch(getUserOrders(userData?._id));
    }
  };
  useEffect(() => {
    updateUser();
  }, []);

  return (
    <View style={styles.screen}>
      <Animatable.View animation="zoomIn" duration={3000}>
        <Icon
          name="checkmark-circle-outline"
          color={appColors.appGreen}
          size={300}
        />
        <Text
          style={{
            fontFamily: appFonts.PoppinsMedium,
            fontSize: 19,
            color: appColors.appBlack,
            textAlign: 'center',
          }}>
          Order Places Successfully
        </Text>
        <Text
          style={{
            fontFamily: appFonts.PoppinsMedium,
            color: appColors.appRed,
            textAlign: 'center',
          }}>
          Return in {seconds}
        </Text>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: appColors.appWhite,
    alignItems: 'center',
    paddingVertical: '30%',
  },
});

export default OrderSuccessScreen;
