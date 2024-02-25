import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import appColors from '../../utils/appColors';
import {useNavigation} from '@react-navigation/native';
import OrderProcessStatusBar from '../../components/orderProcess/OrderProcessStatusBar';
import appFonts from '../../utils/appFonts';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import OrderSummery from './OrderSummery';
import {
  addCommasToRupees,
  calculateTotalAtualPrice,
  calculateTotalPrice,
} from '../../utils/helper';
import CustomHeader from '../../components/CustomHeader';

const ProccessOrder = () => {
  const orderData = useSelector(state => state?.app?.cartItems);
  const [upi, setUpi] = useState(true);
  const [card, setCard] = useState(false);
  const [cashOnDelivery, setCashOnDelivery] = useState(false);

  const navigation = useNavigation();
  const [stepsData, setStepsData] = useState([
    {
      title: 'Address',
      isComplete: true,
    },
    {
      title: 'Order Summery',
      isComplete: false,
    },
    {
      title: 'Payments',
      isComplete: false,
    },
  ]);

  return (
    <View style={styles.screen}>
      <View
        style={{
          backgroundColor: appColors.appWhite,
          elevation: 5,
          paddingBottom: '10%',
        }}>
        <CustomHeader title="Order Summery" />
        <OrderProcessStatusBar data={stepsData} />
      </View>
      <OrderSummery />
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: appColors.appWhite,
          paddingHorizontal: '4%',
          paddingVertical: '1%',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTopColor: appColors.borderColor,
          borderTopWidth: 0.6,
          alignItems: 'center',
        }}>
        <View style={{width: '50%'}}>
          <Text
            style={{
              fontFamily: appFonts.Poppins,
              color: appColors.appGray,
              textDecorationLine: 'line-through',
            }}>
            {addCommasToRupees(
              calculateTotalAtualPrice(orderData) -
                calculateTotalPrice(orderData),
            )}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontFamily: appFonts.Poppins,
              color: appColors.appBlack,
              marginTop: -6,
            }}>
            {addCommasToRupees(calculateTotalPrice(orderData))}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontFamily: appFonts.Poppins,
              color: appColors.appBlue,
              marginTop: -4,
            }}>
            View price details
          </Text>
        </View>
        <View style={{width: '50%'}}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              navigation.navigate('paymentPage');
            }}
            style={{
              backgroundColor: appColors.appGreen,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 10,
              borderRadius: 3,
            }}>
            <Text
              style={{
                fontFamily: appFonts.PoppinsMedium,
                color: appColors.appWhite,
                fontSize: 16,
              }}>
              {!stepsData[0].isComplete || !stepsData[1].isComplete
                ? 'Continue'
                : 'Place Order'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: appColors.grayBg,
  },
  topBar: {
    flexDirection: 'row',
    backgroundColor: appColors.appWhite,
    paddingVertical: 10,
    paddingHorizontal: 10,
    columnGap: 16,
  },
  header: {
    fontFamily: appFonts.PoppinsMedium,
    color: appColors.appBlack,
    fontSize: 17,
  },
  priceCalculationSection: {
    marginTop: '5%',
    backgroundColor: appColors.appWhite,
    borderTopColor: appColors.borderColor,
    borderTopWidth: 0.6,
    paddingHorizontal: '4%',
    paddingVertical: '2%',
  },
});

export default ProccessOrder;
