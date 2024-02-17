import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import appColors from '../../utils/appColors';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addCommasToRupees,
  calculateDiscountedPrice,
  calculateTotalPrice,
  changeSelectedColor,
  changeSelectedSize,
  decreasQty,
  increasQty,
  sortString,
} from '../../utils/helper';
import appFonts from '../../utils/appFonts';
import ShowRating from '../../components/ShowRating';
import {
  getUserAddresses,
  setCartItemsData,
  setTotalPrice,
  updateUserCartItems,
} from '../../reduxManagment/splice/appSlice';
import CheckDeliveryAdress from '../../components/DetectCurrentLocation';
import CustomButton from '../../components/CustomButton';
import LoginSection from '../../components/LoginSection/LoginSection';
import ChangeAddress from '../savedAddress/ChangeAddress';
import BottomSlide from '../../components/BottomSlide';
import SizeSection from '../../components/SizeDropDown';

const HEIGHT = Dimensions.get('window').height;

const CartScreen = props => {
  const isBack = props?.route?.params?.isBack;
  const cartItems = useSelector(state => state?.app?.cartItems);
  const totalPrice = useSelector(state => state?.app?.totalPrice);
  const isLoggedIn = useSelector(state => state?.app?.isLoggedIn);
  const userData = useSelector(state => state?.app?.userData);
  const userAddresses = useSelector(state => state?.app?.userAddresses);
  const userSelectedAddress = useSelector(
    state => state?.app?.userSelectedAddress,
  );
  const [isModelOpen, setIsModelOpen] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [changeAddressMoal, setChangeAddressMoal] = useState(false);
  useEffect(() => {
    dispatch(getUserAddresses(userData?._id));
  }, [dispatch]);

  const decreaseQuantity = item => {
    if (item?.quantity > 1) {
      let res = decreasQty(cartItems, item?._id, item?.quantity);
      dispatch(setCartItemsData(res));
      const data = {
        userId: userData?._id,
        cartItems: res,
      };
      dispatch(updateUserCartItems(data));
      dispatch(setTotalPrice(calculateTotalPrice(res)));
    }
  };

  const increaseQuantity = item => {
    if (item?.quantity < 9) {
      let res = increasQty(cartItems, item?._id, item?.quantity);
      dispatch(setCartItemsData(res));
      const data = {
        userId: userData?._id,
        cartItems: res,
      };
      dispatch(updateUserCartItems(data));
      dispatch(setTotalPrice(calculateTotalPrice(res)));
    }
  };

  const removeItems = item => {
    let t = [...cartItems];
    let res = t.filter((item4, index) => item4?._id !== item?._id);
    const data = {
      userId: userData?._id,
      cartItems: res,
    };
    dispatch(setCartItemsData(res));
    dispatch(updateUserCartItems(data));
    dispatch(setTotalPrice(calculateTotalPrice(res)));
  };

  const selectColor = async (item, item2) => {
    let data = [...cartItems];
    let result = await changeSelectedColor(data, item?._id, item2);
    const res = {
      userId: userData?._id,
      cartItems: result,
    };
    dispatch(updateUserCartItems(res));
    dispatch(setCartItemsData(result));
  };

  const handleSelectSize = async (val, item) => {
    let data = [...cartItems];
    let result = await changeSelectedSize(data, item?._id, val);
    const res = {
      userId: userData?._id,
      cartItems: result,
    };
    dispatch(updateUserCartItems(res));
    dispatch(setCartItemsData(result));
  };

  return (
    <>
      <StatusBar backgroundColor={appColors.appWhite} barStyle="dark-content" />
      {cartItems?.length !== 0 ? (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <View
              style={{
                elevation: 5,
                backgroundColor: appColors.appWhite,
                marginBottom: 10,
              }}>
              <View style={{...styles.topBar, marginStart: isBack ? 0 : '3%'}}>
                {isBack && (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.goBack()}>
                    <Icon
                      name="arrow-back-outline"
                      size={22}
                      color={appColors.appBlack}
                    />
                  </TouchableOpacity>
                )}
                <Text
                  style={{
                    color: appColors.appBlack,
                    fontFamily: appFonts.Poppins,
                  }}>
                  My Cart
                </Text>
              </View>
              {isLoggedIn && userAddresses?.length !== 0 ? (
                <View
                  style={{
                    marginStart: '6%',
                    marginVertical: '4%',
                    marginTop: -3,
                  }}>
                  <View>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontFamily: appFonts.PoppinsMedium,
                          textTransform: 'capitalize',
                          color: appColors.appBlack,
                          fontSize: 16,
                        }}>
                        {userSelectedAddress?.firstName}{' '}
                        {userSelectedAddress?.lastName}{' '}
                      </Text>
                      <View
                        style={{
                          backgroundColor: appColors.cardBg,
                          padding: 3,
                          marginStart: '3%',
                          borderRadius: 3,
                        }}>
                        <Text style={{textTransform: 'capitalize'}}>
                          {userSelectedAddress?.adressType}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{width: '60%', marginTop: -2}}>
                        <Text
                          style={{
                            fontFamily: appFonts.Poppins,
                            color: appColors.appGray,
                            textTransform: 'capitalize',
                          }}>
                          {userSelectedAddress?.calonyORvillage}{' '}
                          {userSelectedAddress?.city}-
                          {userSelectedAddress?.pinCode} State -{' '}
                          {userSelectedAddress?.state}{' '}
                        </Text>

                        {userSelectedAddress?.alternativePhone && (
                          <Text
                            style={{
                              fontFamily: appFonts.Poppins,
                              color: appColors.textBlack,
                            }}>
                            {userSelectedAddress?.alternativePhone}
                          </Text>
                        )}
                      </View>
                      <View style={{marginRight: '7%'}}>
                        <TouchableOpacity
                          onPress={() =>
                            setChangeAddressMoal(!changeAddressMoal)
                          }
                          style={{
                            borderColor: appColors.appRed,
                            borderWidth: 1,
                            borderRadius: 4,
                            paddingHorizontal: '4%',
                            alignItems: 'center',
                            paddingVertical: '3%',
                          }}>
                          <Text
                            style={{
                              fontFamily: appFonts.Poppins,
                              color: appColors.appRed,
                            }}>
                            Change
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ) : (
                <CheckDeliveryAdress />
              )}
            </View>

            <FlatList
              data={cartItems}
              scrollEnabled={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <View
                  key={index}
                  style={{
                    padding: 6,
                    backgroundColor: appColors.cardBg,
                    marginVertical: 5,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View>
                      <Image
                        alt="dfiu"
                        source={{uri: item?.selectedColor}}
                        style={{height: 100, width: 100, borderWidth: 2}}
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          alignSelf: 'center',
                          marginTop: 6,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            decreaseQuantity(item);
                          }}
                          style={{
                            marginHorizontal: 5,
                            backgroundColor: appColors.appWhite,
                            borderRadius: 20,
                          }}>
                          <Icon
                            name="remove"
                            size={25}
                            color={appColors.textBlack}
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontFamily: appFonts.Poppins,
                            fontSize: 20,
                            marginHorizontal: 5,
                            color: appColors.appBlack,
                          }}>
                          {item?.quantity}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            increaseQuantity(item);
                          }}
                          style={{
                            marginHorizontal: 5,
                            backgroundColor: appColors.appWhite,
                            borderRadius: 20,
                          }}>
                          <Icon
                            name="add"
                            size={25}
                            color={appColors.textBlack}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{paddingStart: 10, width: '75%'}}>
                      <Text
                        style={{
                          fontFamily: appFonts?.Poppins,
                          fontSize: 17,
                          color: appColors.textBlack,
                          textTransform: 'capitalize',
                        }}>
                        {sortString(item?.product_name, 20)}
                      </Text>
                      <Text
                        style={{
                          marginVertical: -4,
                          textTransform: 'capitalize',
                          fontFamily: appFonts.Poppins,
                        }}>
                        {item?.category}
                      </Text>
                      <ShowRating rating={3} />
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 2,
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
                              calculateDiscountedPrice(
                                item?.price,
                                item?.discount,
                              ),
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
                            {addCommasToRupees(item?.price)}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          width: '100%',
                        }}>
                        <View
                          style={{
                            width: '100%',
                            borderRightWidth: 1,
                            borderRightColor: appColors.borderColor,
                            alignItems: 'center',
                            flexDirection: 'row',
                            columnGap: 6,
                          }}>
                          <Text
                            style={{
                              fontFamily: appFonts.Poppins,
                              color: appColors.textBlack,
                            }}>
                            Colors
                          </Text>
                          <View style={{flexDirection: 'row'}}>
                            {item?.images?.map((item2, index2) => (
                              <TouchableOpacity
                                key={index2}
                                onPress={() => selectColor(item, item2)}>
                                <Image
                                  source={{uri: item2}}
                                  style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 20,
                                    marginHorizontal: 5,
                                    borderWidth: 2,
                                    borderColor:
                                      item?.selectedColor === item2
                                        ? appColors.appRed
                                        : appColors.appWhite,
                                  }}
                                />
                              </TouchableOpacity>
                            ))}
                          </View>
                        </View>
                        <View
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                            columnGap: 10,
                            paddingVertical: 10,
                          }}>
                          <Text
                            style={{
                              fontFamily: appFonts.Poppins,
                              color: appColors.textBlack,
                            }}>
                            Size{' '}
                          </Text>
                          <SizeSection
                            selected={item?.size}
                            onSelect={v => handleSelectSize(v, item)}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.subButtonContainer}>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      style={styles.subButton}>
                      <Icon
                        name="bag-add-outline"
                        size={20}
                        color={appColors.appGray}
                      />
                      <Text style={{marginStart: 4, color: appColors.appGray}}>
                        Save for later
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        removeItems(item);
                      }}
                      activeOpacity={0.6}
                      style={styles.subButton2}>
                      <Icon
                        name="trash-outline"
                        size={20}
                        color={appColors.appGray}
                      />
                      <Text style={{marginStart: 4, color: appColors.appGray}}>
                        Remove
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
            <View style={styles.actionBar}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: appColors.borderColor,
                  width: '25%',
                  borderRadius: 3,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 7,
                    justifyContent: 'center',
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
                    {addCommasToRupees(totalPrice)}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  if (!isLoggedIn) {
                    setIsModelOpen(true);
                  } else {
                    if (userAddresses.length === 0) {
                      console.log('akudsiaui');
                      navigation.navigate('selectAddress');
                    } else {
                      navigation.navigate('proccessOrder');
                    }
                  }
                }}
                activeOpacity={0.6}
                style={{
                  backgroundColor: appColors.appGreen,
                  width: '70%',
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
                  Place Order
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <View style={styles.screen}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '50%',
            }}>
            <Icon name="cart" size={200} color={appColors.appGray} />
            <Text
              style={{
                fontFamily: appFonts.PoppinsMedium,
                color: appColors.appBlack,
                fontSize: 18,
              }}>
              Your cart is empty
            </Text>
            <CustomButton
              title="Shoping"
              style={{...styles.subButton2, marginTop: '10%'}}
              isEnable={true}
              onPress={() => navigation.navigate('Home')}
            />
          </View>
        </View>
      )}
      <BottomSlide
        modalVisible={changeAddressMoal}
        setModalVisible={setChangeAddressMoal}>
        <ChangeAddress
          setCloseModal={setChangeAddressMoal}
          addresses={userAddresses}
        />
      </BottomSlide>
      <LoginSection
        modalVisible={isModelOpen}
        setModalVisible={setIsModelOpen}
      />
    </>
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
    columnGap: 10,
    paddingHorizontal: '3%',
    paddingVertical: '2%',
  },
  dropDown: {
    borderWidth: 1,
    borderColor: appColors.bo,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    padding: 4,
    paddingHorizontal: 9,
    alignSelf: 'center',
    borderRadius: 1,
    flexDirection: 'row',
  },
  subButton: {
    borderRightWidth: 1,
    borderRightColor: appColors.borderColor,
    width: '50%',
    alignItems: 'center',
    paddingVertical: 6,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  subButton2: {
    width: '50%',
    alignItems: 'center',
    paddingVertical: 6,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  subButtonContainer: {
    borderTopColor: appColors.borderColor,
    borderTopWidth: 1,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
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

export default CartScreen;
