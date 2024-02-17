import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import appColors from '../../utils/appColors';
import appFonts from '../../utils/appFonts';
import {useNavigation} from '@react-navigation/native';

import {
  addCommasToRupees,
  calculateDiscountedPrice,
  calculateTotalPrice,
  isAddedToCart,
} from '../../utils/helper';
import {dummyData, sizeChart} from '../../utils/dummyData';
import axios, {all} from 'axios';
import ProductCard from '../../components/ProductCard';
import {useDispatch, useSelector} from 'react-redux';
import {
  setCartItemsData,
  setTotalPrice,
  updateUserCartItems,
} from '../../reduxManagment/splice/appSlice';
import CheckDeliveryAdress from '../../components/DetectCurrentLocation';

const Width = Dimensions.get('window').width;

const ProductDetails = props => {
  const userData = useSelector(state => state?.app?.userData);
  const cartItems = useSelector(state => state?.app?.cartItems);
  const single_product_data = props?.route?.params?.details;
  const navigation = useNavigation();
  const [activeImage, setActiveImage] = useState(
    single_product_data?.images[0],
  );
  const [selectedSize, setSelectedSize] = useState(sizeChart[0]);
  const [similarPorductList, setSimilarPorductList] = useState([]);

  const dispatch = useDispatch();

  const getSimilerProducts = async () => {
    //setDataLoader(true);
    await axios
      .get('https://dev-shop-api.vercel.app/api/v1/product/products-list')
      .then(res => {
        const alldata = res.data?.data;
        const filtered = alldata?.filter(
          (item, index) => item?.category === single_product_data?.category,
        );
        const filterCurrentProduct = filtered?.filter(
          item => item?._id !== single_product_data?._id,
        );
        setSimilarPorductList(filterCurrentProduct);
        setActiveImage(single_product_data?.images[0]);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        // setDataLoader(false);
      });
  };
  const addToCart = () => {
    let details = [...cartItems];
    // itemDetails = {

    // }
    details.push({
      ...single_product_data,
      size: selectedSize,
      selectedColor: activeImage,
      quantity: 1,
    });
    dispatch(setCartItemsData(details));
    let t = calculateTotalPrice(details);
    dispatch(setTotalPrice(t));
    const data = {
      userId: userData?._id,
      cartItems: details,
    };

    //console.log(data);
    dispatch(updateUserCartItems(data));
  };

  useEffect(() => {
    getSimilerProducts();
  }, [single_product_data, dispatch]);

  //console.log(cartItems, 'items');

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor={appColors.appWhite} barStyle="dark-content" />
      <View style={styles.topBar}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back-outline"
            size={22}
            color={appColors.appBlack}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('search');
          }}
          style={styles.searchButton}>
          <Icon name="search-outline" size={22} color={appColors.appGray} />
          <Text
            style={{
              color: appColors.appGray,
              marginStart: 4,
              fontFamily: appFonts.Poppins,
            }}>
            Search for products
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('cart', {
              isBack: true,
            })
          }
          activeOpacity={0.6}
          style={{position: 'relative'}}>
          <Icon name="cart-outline" size={35} color={appColors.appRed} />
          {cartItems?.length !== 0 && (
            <View style={styles.cartData}>
              <Text
                style={{
                  fontFamily: appFonts.Poppins,
                  color: appColors.appWhite,
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>
                {cartItems?.length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{padding: 4}}>
        <View>
          <Image
            source={{uri: activeImage}}
            style={{height: 400, width: '100%'}}
          />
          <View style={styles.offTag}>
            <Text style={{color: appColors.appWhite, fontSize: 12}}>
              {single_product_data?.discount}% off
            </Text>
          </View>
        </View>
        <View style={{marginTop: 5}}>
          <FlatList
            data={single_product_data?.images}
            horizontal
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setActiveImage(item)}
                style={{
                  margin: 4,
                  borderWidth: 2,
                  borderColor:
                    activeImage === item
                      ? appColors.appRed
                      : appColors.borderColor,
                  borderRadius: 6,
                  overflow: 'hidden',
                }}>
                <Image source={{uri: item}} style={{height: 100, width: 60}} />
              </TouchableOpacity>
            )}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 2,
            marginVertical: 9,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: appFonts.Poppins,
              color: appColors.textBlack,
            }}>
            Price :
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../assets/images/rp.png')}
              style={{height: 20, width: 20}}
            />
            <Text
              style={{
                fontSize: 24,
                fontFamily: appFonts.Poppins,
                color: appColors.textBlack,
              }}>
              {addCommasToRupees(
                calculateDiscountedPrice(
                  single_product_data?.price,
                  single_product_data?.discount,
                ),
              )}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginStart: 5,
            }}>
            <Image
              source={require('../../assets/images/rp.png')}
              style={{height: 12, width: 12, tintColor: appColors.appGray}}
            />
            <Text
              style={{
                fontSize: 15,
                fontFamily: appFonts.Poppins,
                color: appColors.appGray,
                textDecorationLine: 'line-through',
              }}>
              {addCommasToRupees(single_product_data?.price)}
            </Text>
          </View>
        </View>
        <View>
          <FlatList
            data={sizeChart}
            horizontal
            scrollEnabled={false}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSelectedSize(item)}
                key={item.size}
                style={{
                  ...styles.sizeBox,
                  borderColor:
                    selectedSize.size === item.size
                      ? appColors.appRed
                      : appColors.borderColor,
                }}>
                <Text
                  style={{
                    fontFamily: appFonts.Poppins,
                    color: appColors.textBlack,
                    fontSize: 16,
                  }}>
                  {item.size}
                </Text>
              </TouchableOpacity>
            )}
          />
          <View style={{paddingHorizontal: 2}}>
            <Text
              style={{
                marginTop: 3,
                fontFamily: appFonts.Poppins,
                color: appColors.textBlack,
                fontSize: 17,
              }}>
              Size details :{' '}
            </Text>
            <Text style={styles.text}>Chest : {selectedSize.chest}</Text>
            <Text style={styles.text}>Waist : {selectedSize.waist} </Text>
            <Text style={styles.text}>Hips : {selectedSize.hips}</Text>
          </View>
          <Text
            style={{
              fontFamily: appFonts.Poppins,
              textAlign: 'left',
              marginStart: 3,
              marginBottom: 10,
              textTransform: 'capitalize',
            }}>
            {single_product_data?.description}
          </Text>
          <CheckDeliveryAdress />
        </View>
        <View style={{marginBottom: '20%'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 3,
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontFamily: appFonts.Poppins,
                color: appColors.appBlack,
                fontSize: 20,
              }}>
              Similar Products
            </Text>
          </View>
          <FlatList
            data={similarPorductList}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <ProductCard style={styles.cardContainer} item={item} />
            )}
          />
        </View>
      </ScrollView>
      <View style={styles.actionBar}>
        {isAddedToCart(cartItems, single_product_data?._id) ? (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() =>
              navigation.navigate('cart', {
                isBack: true,
              })
            }
            style={{
              borderWidth: 1,
              borderColor: appColors.borderColor,
              width: '15%',
              borderRadius: 3,
              alignItems: 'center',
              position: 'relative',
            }}>
            <Icon name="cart" size={40} color={appColors.appRed} />
            <View style={styles.checked}>
              <Icon
                name="checkmark-outline"
                size={13}
                color={appColors.appWhite}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => addToCart()}
            style={{
              borderWidth: 1,
              borderColor: appColors.borderColor,
              width: '15%',
              borderRadius: 3,
              alignItems: 'center',
            }}>
            <Icon name="cart-outline" size={40} color={appColors.appRed} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            addToCart();
            navigation.navigate('cart', {
              isBack: true,
            });
          }}
          style={{
            backgroundColor: appColors.appRed,
            width: '80%',
            height: '100%',
            borderRadius: 3,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: appFonts.Poppins,
              color: appColors.appWhite,
              fontSize: 16,
            }}>
            Buy Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: appColors.appWhite,
    position: 'relative',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
    paddingVertical: '2%',
  },
  searchButton: {
    width: '75%',
    height: 45,
    marginStart: '4%',
    borderRadius: 5,
    backgroundColor: '#ededeb',
    borderWidth: 1,
    borderColor: '#cacccb',
    color: appColors.appBlack,
    paddingStart: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sizeBox: {
    backgroundColor: appColors.cardBg,
    margin: 3,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 4,
  },
  text: {
    marginStart: 10,
    fontFamily: appFonts.Poppins,
    color: appColors.textBlack,
    marginVertical: -2,
  },
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: appColors.appWhite,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: appColors.borderColor,
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
  cardContainer: {
    height: 265,
    width: Width / 2.5,
    alignItems: 'center',
    backgroundColor: '#ededeb',
    borderWidth: 1,
    borderColor: '#cacccb',
    borderRadius: 15,
    position: 'relative',
    paddingTop: 10,
    marginHorizontal: 7,
  },
  cartData: {
    backgroundColor: appColors.appRed,
    height: 22,
    width: 22,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    right: -10,
    top: -5,
    borderWidth: 2,
    borderColor: appColors.appWhite,
  },
  checked: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'green',
    borderRadius: 30,
    padding: 2,
    borderWidth: 2,
    borderColor: appColors.appWhite,
  },
});

export default ProductDetails;
