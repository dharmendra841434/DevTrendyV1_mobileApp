import {View, Text, Image} from 'react-native';
import React from 'react';
import appColors from '../utils/appColors';
import appFonts from '../utils/appFonts';
import {calculateDiscountedPrice} from '../utils/helper';

const PriceTag = ({item}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={require('../assets/images/rp.png')}
          style={{height: 15, width: 15}}
        />
        <Text
          style={{
            color: appColors.appBlack,
            fontFamily: appFonts.Poppins,

            fontSize: 16,
          }}>
          {calculateDiscountedPrice(item?.price, item?.discount)}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 1,
        }}>
        <Image
          source={require('../assets/images/rp.png')}
          style={{
            height: 10,
            width: 10,
            tintColor: appColors.appGray,
          }}
        />
        <Text
          style={{
            color: appColors.appGray,
            fontFamily: appFonts.Poppins,
            fontSize: 13,
            textDecorationLine: 'line-through',
          }}>
          {item?.price}
        </Text>
      </View>
    </View>
  );
};

export default PriceTag;
