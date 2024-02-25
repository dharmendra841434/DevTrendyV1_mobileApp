import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import appFonts from '../../utils/appFonts';
import appColors from '../../utils/appColors';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import CustomButton from '../../components/CustomButton';
import BottomSlide from '../../components/BottomSlide';
import {countryCodes, indian_cities} from '../../utils/dummyData';
import axios from 'axios';
import {BASE_URL} from '../../utils/base_Url';
import {useFormik} from 'formik';
import {addressSchema} from '../../utils/addressSchema';
import {useDispatch, useSelector} from 'react-redux';
import {setUserData} from '../../reduxManagment/splice/appSlice';
import CustomHeader from '../../components/CustomHeader';

const EditAddress = props => {
  const userData = useSelector(state => state?.app?.userData);
  const id = userData?._id;
  const code = userData?.countryCode;
  const userAddress = userData?.addresses;
  const navigation = useNavigation();
  const [altrPhStatus, setAltrPhStatus] = useState(false);
  const [typeOfAdress, setTypeOfAdress] = useState('');
  const [isOpenModalForState, setIsOpenModalForState] = useState(false);
  const [isOpenModalForCities, setIsOpenModalForCities] = useState(false);
  const [allState, setAllState] = useState();
  const [allcities, setAllcities] = useState();
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();

  //console.log(userAddress, id, 'this is adresss');

  const {
    handleChange,
    handleReset,
    handleSubmit,
    handleBlur,
    setFieldValue,
    values,
    errors,
    touched,
  } = useFormik({
    validationSchema: addressSchema,
    initialValues: {
      firstName: '',
      lastName: '',
      alternativePhone: '',
      pinCode: '',
      state: '',
      city: '',
      houseNo: '',
      calonyORvillage: '',
      addressType: '',
    },
    enableReinitialize: true,
    onSubmit: () => {
      updateAdress();
    },
  });

  const updateAdress = async () => {
    setLoader(true);
    const addressData = {
      firstName: values.firstName,
      lastName: values.lastName,
      alternativePhone: values.alternativePhone,
      pinCode: values.pinCode,
      state: values.state,
      city: values.city,
      houseNo: values.houseNo,
      calonyORvillage: values.calonyORvillage,
      adressType: values.addressType,
    };

    const newAddress = [...userAddress, addressData];
    console.log(newAddress, 'ndsj');
    await axios
      .post(`${BASE_URL}/user/update/${id}`, {
        addresses: newAddress,
      })
      .then(res => {
        console.log(res.data, 'response update ');
        dispatch(setUserData(res?.data?.user));
        navigation.goBack();
      })
      .catch(error => {
        console.log(error, 'this is exios eee');
      })
      .finally(() => {
        setLoader(false);
        handleReset();
      });
  };

  const getAllState = async () => {
    let userCountry = countryCodes?.filter(item => item.phoneCode === code);
    await axios
      .post(`${BASE_URL}/user/get-states`, {country: userCountry[0]?.name})
      .then(res => {
        // console.log(res?.data);
        setAllState(res?.data?.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getAllCities = async stateName => {
    let userCountry = countryCodes?.filter(item => item.phoneCode === code);
    console.log(userCountry[0]?.name);
    await axios
      .post(`${BASE_URL}/user/get-cities`, {city: stateName})
      .then(res => {
        // console.log(res?.data);
        setAllcities(res?.data?.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllState();
  }, []);

  //console.log(allState, 'ct');

  return (
    <View>
      <StatusBar
        backgroundColor={appColors.appBlack}
        barStyle="light-content"
      />
      <CustomHeader title="Edit delivery address" />
      <ScrollView>
        <KeyboardAvoidingView>
          <View style={styles.container}>
            <TextInput
              style={{
                ...styles.input,
                borderColor:
                  touched.firstName && errors.firstName
                    ? appColors.appRed
                    : appColors.appGray,
              }}
              placeholder="First name (required )*"
              cursorColor={appColors.appBlack}
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
            />
            <TextInput
              style={{
                ...styles.input,
                borderColor:
                  touched.lastName && errors.lastName
                    ? appColors.appRed
                    : appColors.appGray,
              }}
              placeholder="Last name (required )*"
              cursorColor={appColors.appBlack}
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
            />
            {altrPhStatus ? (
              <Animatable.View animation="fadeInUp" duration={1500}>
                <TextInput
                  style={styles.input}
                  placeholder="Alternative phone"
                  cursorColor={appColors.appBlack}
                  onChangeText={handleChange('alternativePhone')}
                  onBlur={handleBlur('alternativePhone')}
                />
              </Animatable.View>
            ) : (
              <TouchableOpacity
                onPress={() => setAltrPhStatus(true)}
                style={{flexDirection: 'row', marginTop: '4%'}}>
                <Icon name="add" size={25} color={appColors.appRed} />
                <Text
                  style={{
                    fontFamily: appFonts.Poppins,
                    color: appColors.appRed,
                    marginStart: 5,
                  }}>
                  Add alternative phone number
                </Text>
              </TouchableOpacity>
            )}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TextInput
                style={{
                  ...styles.input,
                  width: '48%',
                  borderColor:
                    touched.pinCode && errors.pinCode
                      ? appColors.appRed
                      : appColors.appGray,
                }}
                placeholder="PinCode (required )*"
                cursorColor={appColors.appBlack}
                keyboardType="number-pad"
                onChangeText={handleChange('pinCode')}
                onBlur={handleBlur('pinCode')}
              />
              <TouchableOpacity style={styles.locationButton}>
                <Icon
                  name="location-outline"
                  size={25}
                  color={appColors.appWhite}
                />
                <Text
                  style={{
                    fontFamily: appFonts.Poppins,
                    color: appColors.appWhite,
                  }}>
                  Use my location
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TextInput
                style={{
                  ...styles.input,
                  width: '48%',
                  borderColor:
                    touched.state && errors.state
                      ? appColors.appRed
                      : appColors.appGray,
                }}
                placeholder="State (required )*"
                cursorColor={appColors.appBlack}
                onFocus={() => setIsOpenModalForState(true)}
                value={values.state}
              />
              <TextInput
                style={{
                  ...styles.input,
                  width: '45%',
                  borderColor:
                    touched.city && errors.city
                      ? appColors.appRed
                      : appColors.appGray,
                }}
                placeholder="City (required )*"
                cursorColor={appColors.appBlack}
                onFocus={() => setIsOpenModalForCities(true)}
                value={values.city}
              />
            </View>
            <TextInput
              style={{
                ...styles.input,
                borderColor:
                  touched.houseNo && errors.houseNo
                    ? appColors.appRed
                    : appColors.appGray,
              }}
              placeholder="House no. Building name (required )*"
              cursorColor={appColors.appBlack}
              onChangeText={handleChange('houseNo')}
              onBlur={handleBlur('houseNo')}
              keyboardType="number-pad"
            />
            <TextInput
              style={{
                ...styles.input,
                borderColor:
                  touched.landmark && errors.landmark
                    ? appColors.appRed
                    : appColors.appGray,
              }}
              placeholder="village, colony,street name (required )*"
              cursorColor={appColors.appBlack}
              onChangeText={handleChange('calonyORvillage')}
              onBlur={handleBlur('calonyORvillage')}
            />
            <View style={{marginTop: 10}}>
              <View style={{flexDirection: 'row', columnGap: 4}}>
                <Text
                  style={{
                    fontFamily: appFonts.PoppinsMedium,
                    color: appColors.appGray,
                  }}>
                  Type of address
                </Text>
                {touched.addressType && errors.addressType && (
                  <Text
                    style={{
                      fontFamily: appFonts.Poppins,
                      color: appColors.appRed,
                      fontSize: 12,
                    }}>
                    Required*
                  </Text>
                )}
              </View>
              <View
                style={{flexDirection: 'row', columnGap: 10, marginTop: '2%'}}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    setFieldValue('addressType', 'home');
                    setTypeOfAdress('home');
                  }}
                  style={{
                    ...styles.typeAddressButton,
                    borderColor:
                      typeOfAdress === '' || typeOfAdress !== 'home'
                        ? appColors.borderColor
                        : appColors.appRed,
                    columnGap: 10,
                  }}>
                  <Icon
                    name="home"
                    size={25}
                    color={
                      typeOfAdress === '' || typeOfAdress !== 'home'
                        ? appColors.borderColor
                        : appColors.appRed
                    }
                  />
                  <Text
                    style={{
                      fontFamily: appFonts.Poppins,
                      color:
                        typeOfAdress === '' || typeOfAdress !== 'home'
                          ? appColors.borderColor
                          : appColors.appRed,
                    }}>
                    Home
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    setFieldValue('addressType', 'office');
                    setTypeOfAdress('office');
                  }}
                  style={{
                    ...styles.typeAddressButton,
                    borderColor:
                      typeOfAdress === '' || typeOfAdress !== 'office'
                        ? appColors.borderColor
                        : appColors.appRed,
                    columnGap: 10,
                  }}>
                  <Icon
                    name="business-outline"
                    size={25}
                    color={
                      typeOfAdress === '' || typeOfAdress !== 'office'
                        ? appColors.borderColor
                        : appColors.appRed
                    }
                  />
                  <Text
                    style={{
                      fontFamily: appFonts.Poppins,
                      color:
                        typeOfAdress === '' || typeOfAdress !== 'office'
                          ? appColors.borderColor
                          : appColors.appRed,
                    }}>
                    Office
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <CustomButton
              title="Save address"
              isEnable={true}
              onPress={() => {
                handleSubmit();
              }}
              style={{marginVertical: 20}}
              loader={loader}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <BottomSlide
        modalVisible={isOpenModalForState}
        setModalVisible={setIsOpenModalForState}>
        <View style={styles.countryCodeSection}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{position: 'relative', height: '100%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: appColors.appRed,
                  backgroundColor: appColors.appRed,
                  paddingHorizontal: 6,
                }}>
                <Text
                  style={{
                    fontFamily: appFonts.Poppins,
                    color: appColors.appWhite,
                    paddingVertical: 10,
                    marginStart: 4,
                  }}>
                  Select your State
                </Text>
              </View>
              <View style={{height: '85%'}}>
                <FlatList
                  data={allState}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setFieldValue('state', item?.state_name);
                        setIsOpenModalForState(false);
                        getAllCities(item?.state_name);
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: appColors.borderColor,
                      }}>
                      <Text>{item?.state_name}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  setIsOpenModalForState(false);
                }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  borderTopColor: appColors.borderColor,
                  borderTopWidth: 1,
                  alignItems: 'center',
                  paddingVertical: 8,
                  backgroundColor: appColors.appWhite,
                }}>
                <Text
                  style={{
                    fontFamily: appFonts.Poppins,
                    color: appColors.appBlack,
                    fontSize: 18,
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </BottomSlide>
      <BottomSlide
        modalVisible={isOpenModalForCities}
        setModalVisible={setIsOpenModalForCities}>
        <View style={styles.countryCodeSection}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{position: 'relative', height: '100%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: appColors.appRed,
                  backgroundColor: appColors.appRed,
                  paddingHorizontal: 6,
                }}>
                <Text
                  style={{
                    fontFamily: appFonts.Poppins,
                    color: appColors.appWhite,
                    paddingVertical: 10,
                    marginStart: 4,
                  }}>
                  Select your city
                </Text>
              </View>
              <View style={{height: '85%'}}>
                <FlatList
                  data={allcities}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setFieldValue('city', item?.city_name);
                        setIsOpenModalForCities(false);
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: appColors.borderColor,
                      }}>
                      <Text>{item?.city_name}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  setIsOpenModalForCities(false);
                }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  borderTopColor: appColors.borderColor,
                  borderTopWidth: 1,
                  alignItems: 'center',
                  paddingVertical: 8,
                  backgroundColor: appColors.appWhite,
                }}>
                <Text
                  style={{
                    fontFamily: appFonts.Poppins,
                    color: appColors.appBlack,
                    fontSize: 18,
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </BottomSlide>
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
    paddingHorizontal: '4%',
    paddingVertical: '2%',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    paddingStart: 15,
    fontFamily: appFonts.Poppins,
    marginTop: 20,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appColors.appRed,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  typeAddressButton: {
    borderWidth: 1,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 15,
  },
  countryCodeSection: {
    backgroundColor: appColors.appWhite,
    width: '90%',
    height: '90%',
  },
});

export default EditAddress;
