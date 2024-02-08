import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  getUserAddresses,
  setUserSelectedAddress,
} from '../../reduxManagment/splice/appSlice';
import appColors from '../../utils/appColors';
import Icon from 'react-native-vector-icons/Ionicons';
import appFonts from '../../utils/appFonts';
import CheckDeliveryAdress from '../../components/DetectCurrentLocation';
import {sortString} from '../../utils/helper';

const ChangeAddress = ({setCloseModal, addresses}) => {
  const userData = useSelector(state => state?.app?.userData);
  const dispatch = useDispatch();
  const userAddresses = addresses;
  const [loader, setLoader] = useState(false);
  const userSelectedAddress = useSelector(
    state => state?.app?.userSelectedAddress,
  );

  return (
    <View style={styles.conatiner}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setCloseModal(false)}>
          <Icon name="close" size={30} color={appColors.appBlack} />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: appFonts.PoppinsMedium,
            color: appColors.appBlack,
            fontSize: 15,
          }}>
          Select delivery address
        </Text>
      </View>
      <View>
        <FlatList
          data={userAddresses}
          scrollEnabled
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              onPress={() => {
                dispatch(setUserSelectedAddress(item));
                setCloseModal(false);
              }}
              style={styles.addressContainer}>
              <View
                style={{
                  ...styles.radioOuter,
                  borderColor:
                    userSelectedAddress?._id === item?._id
                      ? appColors.appBlue
                      : appColors.borderColor,
                }}>
                <View
                  style={{
                    ...styles.radioInner,
                    backgroundColor:
                      userSelectedAddress?._id === item?._id
                        ? appColors.appBlue
                        : appColors.borderColor,
                  }}
                />
              </View>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontFamily: appFonts.PoppinsMedium,
                      textTransform: 'capitalize',
                      color: appColors.appBlack,
                      fontSize: 16,
                    }}>
                    {item?.firstName} {item?.lastName}{' '}
                  </Text>
                  <View
                    style={{
                      backgroundColor: appColors.cardBg,
                      padding: 3,
                      marginStart: '3%',
                      borderRadius: 3,
                    }}>
                    <Text style={{textTransform: 'capitalize'}}>
                      {item?.adressType}
                    </Text>
                  </View>
                </View>
                <View style={{width: '100%', marginTop: -2}}>
                  <Text
                    style={{
                      fontFamily: appFonts.Poppins,
                      color: appColors.appGray,
                      textTransform: 'capitalize',
                    }}>
                    {sortString(
                      ` ${item?.calonyORvillage} ${item?.city}-${item?.pinCode} State -
                    ${item?.state} `,
                      35,
                    )}
                  </Text>

                  {item?.alternativePhone && (
                    <Text
                      style={{
                        fontFamily: appFonts.Poppins,
                        color: appColors.textBlack,
                      }}>
                      {item?.alternativePhone}
                    </Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={{marginVertical: 6}}>
        <Text
          style={{
            fontFamily: appFonts.PoppinsMedium,
            color: appColors.textBlack,
            fontSize: 16,
            marginStart: '5%',
            marginVertical: 10,
          }}>
          Use pincode to check delivery info
        </Text>
        <CheckDeliveryAdress />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: appColors.appWhite,
    width: '100%',
    borderTopColor: appColors.borderColor,
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: appColors.borderColor,
    borderBottomWidth: 1,
    columnGap: 8,
    paddingStart: 6,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    borderBottomColor: appColors.borderColor,
    borderBottomWidth: 0.5,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  radioInner: {
    height: 15,
    width: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: appColors.appWhite,
  },
});

export default ChangeAddress;
