import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import appColors from '../../utils/appColors';
import appFonts from '../../utils/appFonts';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import OrderSummeryCard from '../../components/orderProcess/OrderSummeryCard';
import {
  addCommasToRupees,
  calculateTotalAtualPrice,
  calculateTotalPrice,
} from '../../utils/helper';

const OrderSummery = () => {
  const orderData = useSelector(state => state?.app?.cartItems);
  const userSelectedAddress = useSelector(
    state => state?.app?.userSelectedAddress,
  );

  return (
    <View style={{height: '82%'}}>
      <ScrollView>
        <View
          style={{
            backgroundColor: appColors.appWhite,
            marginVertical: '5%',
            paddingVertical: '3%',
            paddingHorizontal: '4%',
            borderBottomWidth: 0.6,
            borderBottomColor: appColors.borderColor,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily: appFonts.PoppinsMedium,
                textTransform: 'capitalize',
                color: appColors.appBlack,
                fontSize: 16,
              }}>
              {userSelectedAddress?.firstName} {userSelectedAddress?.lastName}{' '}
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
            <View style={{width: '90%', marginTop: -2}}>
              <Text
                style={{
                  fontFamily: appFonts.Poppins,
                  color: appColors.appGray,
                  textTransform: 'capitalize',
                }}>
                {userSelectedAddress?.calonyORvillage}{' '}
                {userSelectedAddress?.city}-{userSelectedAddress?.pinCode} State
                - {userSelectedAddress?.state}{' '}
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
          </View>
        </View>
        <View>
          {orderData?.map((item, index) => (
            <View key={index}>
              <OrderSummeryCard data={item} />
            </View>
          ))}
        </View>
        <View style={styles.priceCalculationSection}>
          <Text
            style={{
              fontFamily: appFonts.PoppinsMedium,
              color: appColors.appBlack,
              fontSize: 16,
            }}>
            Prices Details
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '3%',
            }}>
            <Text
              style={{
                fontFamily: appFonts.Poppins,
                color: appColors.appBlack,
              }}>
              Price ({orderData?.length} items)
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
                  fontFamily: appFonts.Poppins,
                  color: appColors.appBlack,
                }}>
                {addCommasToRupees(calculateTotalAtualPrice(orderData))}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '1%',
            }}>
            <Text
              style={{
                fontFamily: appFonts.Poppins,
                color: appColors.appBlack,
              }}>
              Discount
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: appFonts.Poppins,
                  color: appColors.appGreen,
                }}>
                -
              </Text>
              <Image
                source={require('../../assets/images/rp.png')}
                style={{height: 17, width: 17, tintColor: appColors.appGreen}}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: appFonts.Poppins,
                  color: appColors.appGreen,
                }}>
                {addCommasToRupees(
                  calculateTotalAtualPrice(orderData) -
                    calculateTotalPrice(orderData),
                )}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '1%',
            }}>
            <Text
              style={{
                fontFamily: appFonts.Poppins,
                color: appColors.appBlack,
              }}>
              Delivery Charge
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
                  fontFamily: appFonts.Poppins,
                  color: appColors.appBlack,
                }}>
                40
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '1%',
              borderTopColor: appColors.borderColor,
              borderTopWidth: 1,
              paddingTop: 5,
            }}>
            <Text
              style={{
                fontFamily: appFonts.PoppinsMedium,
                color: appColors.appBlack,
                fontSize: 17,
              }}>
              Total
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
                  fontFamily: appFonts.Poppins,
                  color: appColors.appBlack,
                }}>
                {addCommasToRupees(calculateTotalPrice(orderData) + 40)}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 13,
                fontFamily: appFonts.Poppins,
                color: appColors.appGreen,
              }}>
              You will save{' '}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/images/rp.png')}
                style={{height: 14, width: 14, tintColor: appColors.appGreen}}
              />
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: appFonts.Poppins,
                  color: appColors.appGreen,
                }}>
                {calculateTotalAtualPrice(orderData) -
                  calculateTotalPrice(orderData)}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 13,
                fontFamily: appFonts.Poppins,
                color: appColors.appGreen,
              }}>
              {' '}
              on this order
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '70%',
            alignSelf: 'center',
            marginVertical: '3%',
            marginBottom: '20%',
          }}>
          <Icon name="shield-checkmark" size={25} color={appColors.appGray} />
          <Text
            style={{
              fontSize: 13,
              fontFamily: appFonts.Poppins,
              color: appColors.appGray,
              marginStart: '3%',
            }}>
            Safe and secure payments.Easy returns. 100% authantic product
          </Text>
        </View>
      </ScrollView>
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

export default OrderSummery;
