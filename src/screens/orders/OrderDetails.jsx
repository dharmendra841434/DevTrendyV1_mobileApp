import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import appColors from '../../utils/appColors';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import appFonts from '../../utils/appFonts';
import {
  addCommasToRupees,
  calculateDiscountedPrice,
  sortString,
} from '../../utils/helper';
import CustomHeader from '../../components/CustomHeader';

const OrderDetails = props => {
  const singleProduct = props?.route?.params?.productData;
  const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      <CustomHeader title="Order Details" />
      <View style={{paddingVertical: '3%'}}>
        <View
          style={{
            backgroundColor: appColors.appWhite,
            paddingHorizontal: '4%',
            elevation: 3,
            paddingVertical: '2%',
          }}>
          <Text
            style={{fontFamily: appFonts.Poppins, color: appColors.appGray}}>
            Order ID : {singleProduct?._id}
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: '4%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '4%',
          }}>
          <View style={{width: '70%'}}>
            <Text style={styles.productTitle}>
              {sortString(
                `${singleProduct?.product_name} ${singleProduct?.category}    ${singleProduct?.type}`,
                100,
              )}
            </Text>
            <Text
              style={{
                fontFamily: appFonts.Poppins,
                color: appColors.appGray,
                fontSize: 13,
              }}>
              Seller : Dev-Trendy
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/images/rp.png')}
                style={{height: 17, width: 17}}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: appFonts.PoppinsMedium,
                  color: appColors.textBlack,
                }}>
                {addCommasToRupees(
                  calculateDiscountedPrice(
                    singleProduct?.price,
                    singleProduct?.discount,
                  ),
                )}
              </Text>
            </View>
          </View>
          <View style={{width: '70%'}}>
            <Image
              source={{uri: singleProduct?.selectedColor}}
              style={{width: 120, height: 120}}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: appColors.appWhite,
  },
  topBar: {
    flexDirection: 'row',
    backgroundColor: appColors.appWhite,
    paddingVertical: 10,
    paddingHorizontal: 10,
    columnGap: 16,
    elevation: 5,
  },
  header: {
    fontFamily: appFonts.PoppinsMedium,
    color: appColors.appBlack,
    fontSize: 17,
  },
  productTitle: {
    fontFamily: appFonts.Poppins,
    color: appColors.textBlack,
    fontSize: 18,
    textTransform: 'capitalize',
  },
});

export default OrderDetails;
