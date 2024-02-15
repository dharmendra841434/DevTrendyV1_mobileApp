import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import appColors from '../../utils/appColors';
import appFonts from '../../utils/appFonts';
import CheckBox from '../../components/orderProcess/CheckBox';
import Icon from 'react-native-vector-icons/Ionicons';
import AppSlice from '../../reduxManagment/splice/appSlice';
import AppSlider from '../../components/orderProcess/AppSlider';

const Payments = () => {
  const [upi, setUpi] = useState(true);
  const [card, setCard] = useState(false);
  const [cashOnDelivery, setCashOnDelivery] = useState(false);
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>All Payments Method</Text>
        <View style={{marginTop: '4%'}}>
          <CheckBox
            title="UPI"
            subText="pay by any upi app"
            isChecked={upi}
            OnChecked={() => {
              setCard(false);
              setUpi(true);
              setCashOnDelivery(false);
            }}>
            <AppSlider />
          </CheckBox>
          <CheckBox
            isChecked={card}
            OnChecked={() => {
              setCard(true);
              setUpi(false);
              setCashOnDelivery(false);
            }}
            title="Credit/Debit ATM Card"
            subText="add and secure card as per RBI guidline"
          />
          <CheckBox
            isChecked={cashOnDelivery}
            title="Cash on delivery"
            OnChecked={() => {
              setCard(false);
              setUpi(false);
              setCashOnDelivery(true);
            }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '70%',
          alignSelf: 'center',
          marginVertical: '3%',
        }}>
        <Icon name="shield-checkmark" size={25} color={appColors.appGray} />
        <Text
          style={{
            fontSize: 13,
            fontFamily: appFonts.Poppins,
            color: appColors.appGray,
            marginStart: '3%',
          }}>
          100% safe and secure payments
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '4%',
    marginTop: '4%',
    backgroundColor: appColors.appWhite,
    paddingVertical: '3%',
  },
  title: {
    fontSize: 18,
    fontFamily: appFonts.PoppinsMedium,
    color: appColors.appBlack,
  },
});

export default Payments;
