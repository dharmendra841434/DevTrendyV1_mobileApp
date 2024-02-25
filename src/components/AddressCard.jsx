import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import appColors from '../utils/appColors';
import appFonts from '../utils/appFonts';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {
  getUserAddresses,
  removeSingleAddress,
} from '../reduxManagment/splice/appSlice';

const AddressCard = ({address, phone, index, onRemove, isThreeDot}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', columnGap: 5}}>
          <Text style={styles.heading}>{address?.firstName}</Text>
          <Text style={styles.heading}>{address?.lastName}</Text>
        </View>
        <View
          style={{
            backgroundColor: appColors.cardBg,
            padding: 6,
            marginStart: '3%',
            borderRadius: 3,
          }}>
          <Text style={{textTransform: 'capitalize'}}>
            {address?.adressType}
          </Text>
        </View>
      </View>
      <View style={{width: '80%', marginVertical: 2}}>
        <Text
          style={{
            fontFamily: appFonts.Poppins,
            color: appColors.textBlack,
            textTransform: 'capitalize',
          }}>
          {address?.calonyORvillage} house number - {address?.houseNo}{' '}
          {address?.city}-{address?.pinCode} State - {address?.state}{' '}
        </Text>
        <Text
          style={{fontFamily: appFonts.Poppins, color: appColors.textBlack}}>
          {phone}
        </Text>
        {address?.alternativePhone && (
          <Text
            style={{fontFamily: appFonts.Poppins, color: appColors.textBlack}}>
            {address?.alternativePhone}
          </Text>
        )}
      </View>
      {isThreeDot && (
        <>
          <TouchableOpacity
            onPress={() => setIsOpen(!isOpen)}
            style={{position: 'absolute', top: 24, right: 15}}>
            <Text style={styles.dot}>.</Text>
            <Text style={styles.dot}>.</Text>
            <Text style={styles.dot}>.</Text>
            {/* <Icon2 name="ellipsis-v" size={20} color={appColors.appGray} /> */}
          </TouchableOpacity>
          {isOpen && (
            <View
              style={{
                position: 'absolute',
                backgroundColor: appColors.cardBg,
                right: 20,
                top: 20,
                width: 130,
                paddingHorizontal: 8,
                paddingVertical: 6,
                elevation: 5,
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('editAddress', {
                    ID: index,
                    addressData: address,
                  });
                }}
                style={{marginVertical: 5}}>
                <Text
                  style={{
                    fontFamily: appFonts.Poppins,
                    color: appColors.appBlack,
                  }}>
                  Edit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onRemove} style={{marginVertical: 5}}>
                <Text
                  style={{
                    fontFamily: appFonts.Poppins,
                    color: appColors.appBlack,
                    fontSize: 13,
                  }}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.appWhite,
    elevation: 5,
    paddingHorizontal: '3%',
    paddingVertical: '2%',
    marginVertical: 10,
  },
  heading: {
    fontFamily: appFonts.PoppinsMedium,
    textTransform: 'capitalize',
    color: appColors.textBlack,
    fontSize: 18,
  },
  dot: {
    fontFamily: appFonts.PoppinsMedium,
    fontSize: 25,
    marginVertical: -24,
  },
});

export default AddressCard;
