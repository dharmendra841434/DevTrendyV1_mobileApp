import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import BottomSlide from '../BottomSlide';
import CustomInput from '../CustomInput';
import CustomButton from '../CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import appFonts from '../../utils/appFonts';
import appColors from '../../utils/appColors';
import {countryCodes} from '../../utils/dummyData';
import axios from 'axios';
import {BASE_URL} from '../../utils/base_Url';

const Height = Dimensions.get('window').height;

const LoginSection = ({modalVisible, setModalVisible}) => {
  const navigation = useNavigation();
  const [countryCodeData, setCountryCodeData] = useState([...countryCodes]);
  const [isOpenCountryCodeModal, setIsOpenCountryCodeModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('+91');
  const [phone_Number, setPhone_Number] = useState('');
  const [loader, setLoader] = useState(false);

  const sendOtp = async () => {
    setLoader(true);
    await axios
      .post(`${BASE_URL}/user/otp-generate`, {
        phone: `${selectedCountry}${phone_Number}`,
      })
      .then(res => {
        //console.log(res.data, 'response ');
        navigation.navigate('otp_verification', {
          loginDetails: {
            phone: phone_Number,
            otp: res.data?.data?.otp,
            countryCode: selectedCountry,
          },
        });
        setModalVisible(false);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <View>
      <BottomSlide
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={Styles.modalView}>
            <View style={{paddingHorizontal: '4%', paddingVertical: '5%'}}>
              <Text
                style={{
                  fontFamily: appFonts.PoppinsMedium,
                  color: appColors.appBlack,
                  fontSize: 17,
                }}>
                Login for the best exprience
              </Text>
              <Text
                style={{
                  fontFamily: appFonts.Poppins,
                  color: appColors.appGray,
                  marginTop: 4,
                }}>
                Enter phone number to continue
              </Text>
              <CustomInput
                selectedCode={selectedCountry}
                keyboardType="phone-pad"
                onChangeText={t => setPhone_Number(t)}
                maxLength={10}
                OnSelectCountryCode={() => setIsOpenCountryCodeModal(true)}
              />
              <View style={{marginTop: 16}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={Styles.termText}>
                    By continuing ,you agree to Dev Trendy's
                  </Text>
                  <Text style={{...Styles.termText, color: '#320ff7'}}>
                    Terms of use
                  </Text>
                  <Text style={Styles.termText}> and </Text>
                </View>
                <Text style={{...Styles.termText, color: '#320ff7'}}>
                  Privacy Policy
                </Text>
              </View>
              <CustomButton
                isEnable={phone_Number?.length === 10 ? true : false}
                onPress={() => {
                  if (phone_Number?.length === 10) {
                    sendOtp();
                  }
                }}
                title="Continue"
                loader={loader}
                style={{
                  marginTop: '5%',
                  backgroundColor:
                    phone_Number?.length === 10
                      ? appColors.appRed
                      : appColors.appGray,
                }}
              />
            </View>
            <TouchableOpacity
              style={{position: 'absolute', right: 10, top: 8}}
              onPress={() => setModalVisible(!modalVisible)}>
              <Icon name="close" size={22} color={appColors.appBlack} />
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </BottomSlide>
      <BottomSlide
        modalVisible={isOpenCountryCodeModal}
        setModalVisible={setIsOpenCountryCodeModal}>
        <View style={Styles.countryCodeSection}>
          <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
            //style={Styles.countryCodeSection}
          >
            <View style={{position: 'relative', height: '100%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: appColors.borderColor,
                  paddingHorizontal: 6,
                }}>
                <Icon name="search" size={20} />
                <TextInput
                  placeholder="Search Country"
                  onChangeText={t => {
                    if (t?.length === 0) {
                      setCountryCodeData([...countryCodes]);
                      return;
                    }
                    let f = countryCodeData?.filter(item =>
                      item.name?.toLowerCase()?.includes(t.toLowerCase()),
                    );
                    setCountryCodeData(f);
                  }}
                />
              </View>
              <View style={{height: '85%'}}>
                <FlatList
                  data={countryCodeData}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setSelectedCountry(item.phoneCode);
                        setIsOpenCountryCodeModal(false);
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: appColors.borderColor,
                      }}>
                      <Text>
                        {item.name} ({item.code})
                      </Text>
                      <Text>{item.phoneCode}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  setIsOpenCountryCodeModal(false);
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

const Styles = StyleSheet.create({
  modalView: {
    backgroundColor: appColors.appWhite,
    bottom: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    height: Height / 2.7,
    elevation: 5,
  },
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  termText: {
    fontFamily: appFonts.Poppins,
    fontSize: 13,
    color: appColors.appBlack,
  },
  countryCodeSection: {
    backgroundColor: appColors.appWhite,
    width: '90%',
    height: '90%',
  },
});

export default LoginSection;
