import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import {calculateTotalPrice, sortString} from '../utils/helper';
import appColors from '../utils/appColors';
import appFonts from '../utils/appFonts';
import {useNavigation} from '@react-navigation/native';
import PriceTag from './PriceTag';
import {useDispatch, useSelector} from 'react-redux';
import {
  setCartItemsData,
  setTotalPrice,
} from '../reduxManagment/splice/appSlice';
import ShowRating from './ShowRating';

const Width = Dimensions.get('window').width;

const ProductCard = ({item, style}) => {
  const cartItems = useSelector(state => state?.app?.cartItems);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const default_size = {size: 'S', chest: 34, waist: 26, hips: 36};

  const addToCart = () => {
    let details = [...cartItems];
    // itemDetails = {

    // }
    details.push({
      ...item,
      size: default_size,
      selectedColor: item.coverImage,
      quantity: 1,
    });
    dispatch(setCartItemsData(details));
    let t = calculateTotalPrice(details);
    dispatch(setTotalPrice(t));
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('product_details', {
          details: item,
        });
      }}
      activeOpacity={0.6}
      style={style}
      key={item._id}>
      <Image
        source={{
          uri: item?.coverImage,
        }}
        style={{
          height: 150,
          width: Width / 2.4,
        }}
        resizeMode="cover"
      />
      <Text
        style={{
          color: appColors.appGray,
          fontFamily: appFonts.Poppins,
          marginTop: 2,
          textTransform: 'capitalize',
          fontSize: 12,
        }}>
        {item?.category}
      </Text>
      <ShowRating rating={3.5} />
      <Text
        style={{
          color: appColors.appBlack,
          fontFamily: appFonts.Poppins,
          textTransform: 'capitalize',
          fontSize: 16,
          marginTop: 2,
        }}>
        {sortString(item?.product_name + '|| ' + item?.type, 17)}
      </Text>
      {/* <View
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
      </View> */}
      <PriceTag item={item} />
      {/* <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          addToCart();
        }}
        style={{
          borderWidth: 1,
          borderColor: appColors.appBlack,
          borderRadius: 4,
          paddingVertical: 2,
          paddingHorizontal: 30,
        }}>
        <Text style={{fontFamily: appFonts.Poppins, color: appColors.appBlack}}>
          Add to cart
        </Text>
      </TouchableOpacity> */}
      <View style={styles.offTag}>
        <Text style={{color: appColors.appWhite, fontSize: 12}}>
          {item?.discount}% off
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 230,
    width: '45%',
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#ededeb',
    borderWidth: 1,
    borderColor: '#cacccb',
    borderRadius: 15,
    position: 'relative',
    paddingTop: 10,
  },
  offTag: {
    backgroundColor: appColors.appRed,
    position: 'absolute',
    top: 10,
    right: 0,
    height: 30,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopStartRadius: 15,
    borderBottomStartRadius: 15,
  },
});

export default ProductCard;
