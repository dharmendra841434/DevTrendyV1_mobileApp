import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import appColors from '../../utils/appColors';
import appFonts from '../../utils/appFonts';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import AddressCard from '../../components/AddressCard';
import {
  getUserAddresses,
  removeSingleAddress,
} from '../../reduxManagment/splice/appSlice';
import BottomSlide from '../../components/BottomSlide';
import ChangeAddress from './ChangeAddress';
import CustomHeader from '../../components/CustomHeader';

const SavedAddress = props => {
  //const userData = props?.route?.params?.userData;
  const userData = useSelector(state => state?.app?.userData);
  const userAddresses = useSelector(state => state?.app?.userAddresses);
  //const loader = useSelector(state => state?.app?.addressesLoader);
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoader(true);
    dispatch(getUserAddresses(userData?._id));
    setLoader(false);
  }, [dispatch]);

  //console.log(userData?._id, 'addresss');

  return (
    <View>
      <StatusBar
        backgroundColor={appColors.appBlack}
        barStyle="light-content"
      />
      <CustomHeader title="My Addresses" />
      <View
        style={{
          backgroundColor: appColors.appWhite,
          elevation: 5,
          paddingHorizontal: '2%',
          paddingVertical: 10,
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('newAddress', {
              userId: userData?._id,
              countryCode: userData?.countryCode,
            })
          }
          style={{flexDirection: 'row'}}>
          <Icon name="add" size={25} color={appColors.appBlue} />
          <Text
            style={{
              fontFamily: appFonts.PoppinsMedium,
              color: appColors.appBlue,
              marginStart: 5,
            }}>
            Add a new address
          </Text>
        </TouchableOpacity>
      </View>

      {loader ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.container}>
          {userAddresses?.length === 0 ? (
            <View style={{marginTop: '8%', paddingStart: '3%'}}>
              <Text
                style={{
                  fontFamily: appFonts.Poppins,
                  color: appColors.appBlack,
                }}>
                You have no any saved address
              </Text>
            </View>
          ) : (
            <View style={{height: '100%'}}>
              <Text
                style={{
                  fontFamily: appFonts.PoppinsMedium,
                  color: appColors.appGray,
                  fontSize: 12,
                  marginStart: '4%',
                }}>
                {userAddresses?.length} SAVED ADDRESS
              </Text>
              <FlatList
                data={userAddresses}
                renderItem={({item, index}) => (
                  <AddressCard
                    key={index}
                    address={item}
                    phone={userData?.phone}
                    index={index}
                    isThreeDot={true}
                    onRemove={() => {
                      dispatch(removeSingleAddress(item?._id));
                      dispatch(getUserAddresses(userData?._id));
                    }}
                  />
                )}
              />
            </View>
          )}
        </View>
      )}
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
    alignItems: 'center',
    paddingHorizontal: '3%',
    paddingVertical: '2%',
    backgroundColor: appColors.appBlack,
  },
  container: {
    marginTop: 16,
  },
});

export default SavedAddress;
