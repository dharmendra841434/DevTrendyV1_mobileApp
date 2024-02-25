import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import appColors from '../../utils/appColors';
import appFonts from '../../utils/appFonts';
import CheckBox from '../../components/orderProcess/CheckBox';
import Icon from 'react-native-vector-icons/Ionicons';
import AppSlice, {
  updateUserCartItems,
} from '../../reduxManagment/splice/appSlice';
import AppSlider from '../../components/orderProcess/AppSlider';
import {useNavigation} from '@react-navigation/native';
// import RazorpayCheckout from 'react-native-razorpay';
import OrderProcessStatusBar from '../../components/orderProcess/OrderProcessStatusBar';
import axios from 'axios';
import {BASE_URL} from '../../utils/base_Url';
import {useDispatch, useSelector} from 'react-redux';
import Modal_Loader from '../../components/loaders/Modal_Loader';
import CustomHeader from '../../components/CustomHeader';
//import Toast from 'react-native-toast-message';

const Payments = ({}) => {
  const productDetails = useSelector(state => state?.app?.cartItems);
  const userSelectedAddress = useSelector(
    state => state?.app?.userSelectedAddress,
  );
  const userData = useSelector(state => state?.app?.userData);
  const [upi, setUpi] = useState(true);
  const [card, setCard] = useState(false);
  const [cashOnDelivery, setCashOnDelivery] = useState(false);
  const [loader, setLoader] = useState(false);
  const [stepsData, setStepsData] = useState([
    {
      title: 'Address',
      isComplete: true,
    },
    {
      title: 'Order Summery',
      isComplete: true,
    },
    {
      title: 'Payments',
      isComplete: false,
    },
  ]);

  const dispatch = useDispatch();

  const makePayment = async () => {
    ToastAndroid.showWithGravity(
      'UPI and Card Payment not implemented',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
    // var options = {
    //   description: 'Dev-Trendy',
    //   image:
    //     'https://res.cloudinary.com/devtrendy/image/upload/v1706431102/sazflmaxtfkz3r3m6ahf.png',
    //   currency: 'INR',
    //   key: 'rzp_test_ACg3V6rCV3ldRP',
    //   amount: `1000`,
    //   name: 'Dev Trendy',
    //   order_id: 'order_DslnoIgkIDL8Zt', //Replace this with an order_id created using Orders API.
    //   prefill: {
    //     email: 'dhk7283013741@gmail.com',
    //     contact: '7761895776',
    //     name: 'dharmendra kumar',
    //   },
    //   theme: {color: '#f0072f'},
    // };
    // RazorpayCheckout.open(options)
    //   .then(data => {
    //     // handle success
    //     alert(`Success: ${data.razorpay_payment_id}`);
    //   })
    //   .catch(error => {
    //     // handle failure
    //     alert(`Error: ${error.code} | ${error.description}`);
    //   });
  };

  const placeOrder = async () => {
    setLoader(true);
    for (let i = 0; i < productDetails.length; i++) {
      const orderData = {
        userId: userData?._id,
        productDetails: productDetails[i],
        address: userSelectedAddress,
        orderStatus: 'conferm',
      };
      // console.log(orderData);
      await axios
        .post(`${BASE_URL}/order/save-order`, orderData)
        .then(res => {
          //console.log(res.data, 'response update ');
        })
        .catch(error => {
          console.log(error, 'this is exios eee');
        });
    }
    setLoader(false);
    // Toast.show({
    //   type: 'success',
    //   text1: 'Hello',
    //   text2: 'This is some something 👋',
    // });

    const data = {userId: userData?._id, cartItems: []};
    dispatch(updateUserCartItems(data));
    navigation.navigate('orderSuccess');
  };

  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: appColors.appWhite,
          elevation: 5,
          paddingBottom: '10%',
        }}>
        <CustomHeader title="Payments" />
        <OrderProcessStatusBar data={stepsData} />
      </View>
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
      <View style={{width: '100%', bottom: 0, position: 'absolute'}}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            if (upi || card) {
              makePayment();
            } else {
              placeOrder();
            }
          }}
          style={{
            backgroundColor: appColors.appGreen,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 12,
            borderRadius: 3,
          }}>
          <Text
            style={{
              fontFamily: appFonts.PoppinsMedium,
              color: appColors.appWhite,
              fontSize: 16,
            }}>
            {upi || card ? 'Make payment' : ' Place Order'}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal_Loader modalVisible={loader} setModalVisible={setLoader} />
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
});

export default Payments;
