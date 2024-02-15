import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import appColors from '../../utils/appColors';
import appFonts from '../../utils/appFonts';
import {
  addCommasToRupees,
  calculateDiscountedPrice,
  sortString,
} from '../../utils/helper';
import ShowRating from '../ShowRating';

const OrderSummeryCard = ({data}) => {
  return (
    <View
      style={{
        ...styles.conatiner,
        borderBottomWidth: 1,
        borderBottomColor: appColors.borderColor,
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={{width: '40%'}}>
          <Image
            source={{uri: data?.selectedColor}}
            style={{width: '100%', height: 160}}
          />
        </View>
        <View style={{width: '55%', justifyContent: 'center'}}>
          <Text
            style={{
              fontFamily: appFonts?.Poppins,
              fontSize: 17,
              color: appColors.textBlack,
              textTransform: 'capitalize',
            }}>
            {sortString(data?.product_name, 20)}
          </Text>
          <Text
            style={{
              marginVertical: -4,
              textTransform: 'capitalize',
              fontFamily: appFonts.Poppins,
              fontSize: 12,
              marginBottom: 2,
            }}>
            category : {data?.category}
          </Text>
          <ShowRating rating={3} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 2,
              marginTop: 4,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: appFonts.Poppins,
                color: appColors.appBlack,
              }}>
              Price :
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
                  fontSize: 18,
                  fontFamily: appFonts.Poppins,
                  color: appColors.appBlack,
                }}>
                {addCommasToRupees(
                  calculateDiscountedPrice(data?.price, data?.discount),
                )}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginStart: 2,
              }}>
              <Image
                source={require('../../assets/images/rp.png')}
                style={{
                  height: 12,
                  width: 12,
                  tintColor: appColors.bo,
                }}
              />
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: appFonts.Poppins,
                  color: appColors.bo,
                  textDecorationLine: 'line-through',
                }}>
                {addCommasToRupees(data?.price)}
              </Text>
            </View>
          </View>
          <View>
            <Text>Size : {data?.size?.size}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: appColors.appWhite,
    paddingHorizontal: '4%',
    paddingVertical: '4%',
  },
});

export default OrderSummeryCard;
