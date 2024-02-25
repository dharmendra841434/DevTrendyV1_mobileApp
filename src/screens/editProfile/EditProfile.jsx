import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import appColors from '../../utils/appColors';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import appFonts from '../../utils/appFonts';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import {setUserData} from '../../reduxManagment/splice/appSlice';
import {useDispatch} from 'react-redux';
import {BASE_URL} from '../../utils/base_Url';
import CustomHeader from '../../components/CustomHeader';

const EditProfile = props => {
  const userData = props?.route?.params?.userData;
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState(userData?.firstName);
  const [lastName, setLastName] = useState(userData?.lastName);
  const [phone, setPhone] = useState(userData?.phone);
  const [gender, setGender] = useState(userData?.gender);
  const [loader, setLoader] = useState(false);

  //console.log(userData, 'userData');

  const dispatch = useDispatch();

  const saveUserDetails = async () => {
    setLoader(true);
    const editedField = {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
    };
    await axios
      .post(`${BASE_URL}/user/update/${userData?._id}`, editedField)
      .then(res => {
        // console.log(res.data, 'response login ');
        dispatch(setUserData(res?.data?.user));
        setLoader(false);
        navigation.goBack();
      })
      .catch(error => {
        console.log(error.response?.data, 'this is exios eee');
        setLoader(false);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <StatusBar
          backgroundColor={appColors.appBlack}
          barStyle="light-content"
        />
        <CustomHeader title="Edit Profile" />
        <View style={{paddingHorizontal: '4%'}}>
          <View>
            <Text
              style={{
                fontFamily: appFonts.Poppins,
                color: appColors.appGray,
                marginTop: 30,
              }}>
              First Name
            </Text>
            <TextInput
              style={{
                borderBottomColor: appColors.borderColor,
                borderBottomWidth: 1,
                marginTop: -13,
                paddingBottom: 4,
              }}
              onChangeText={t => setFirstName(t)}
              cursorColor={appColors.appBlack}
              value={firstName}
            />
          </View>
          <View>
            <Text
              style={{
                fontFamily: appFonts.Poppins,
                color: appColors.appGray,
                marginTop: 30,
              }}>
              Last Name
            </Text>
            <TextInput
              style={{
                borderBottomColor: appColors.borderColor,
                borderBottomWidth: 1,
                marginTop: -13,
                paddingBottom: 4,
              }}
              onChangeText={t => setLastName(t)}
              cursorColor={appColors.appBlack}
              value={lastName}
            />
          </View>
          <View>
            <Text
              style={{
                fontFamily: appFonts.Poppins,
                color: appColors.appGray,
                marginTop: 30,
              }}>
              Phone
            </Text>
            <TextInput
              style={{
                borderBottomColor: appColors.borderColor,
                borderBottomWidth: 1,
                marginTop: -13,
                paddingBottom: 4,
              }}
              readOnly
              cursorColor={appColors.appBlack}
              value={`${phone}`}
            />
          </View>
          <View>
            <Text
              style={{
                fontFamily: appFonts.Poppins,
                color: appColors.appGray,
                marginTop: 30,
              }}>
              Gender
            </Text>
            <TextInput
              style={{
                borderBottomColor: appColors.borderColor,
                borderBottomWidth: 1,
                marginTop: -13,
                paddingBottom: 4,
              }}
              readOnly
              cursorColor={appColors.appBlack}
              value={`${gender === '' ? 'Select gender' : gender}`}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
              alignSelf: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setGender('Male')}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: appColors.cardBg,
                paddingHorizontal: 50,
                paddingVertical: 10,
                borderRadius: 40,
              }}>
              <Icon2 name="male" size={100} />
              <Text
                style={{
                  fontFamily: appFonts.PoppinsMedium,
                  color: appColors.appGray,
                }}>
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setGender('Female')}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: appColors.cardBg,
                paddingHorizontal: 50,
                paddingVertical: 10,
                borderRadius: 40,
              }}>
              <Icon2 name="female" size={100} />
              <Text
                style={{
                  fontFamily: appFonts.PoppinsMedium,
                  color: appColors.appGray,
                }}>
                Female
              </Text>
            </TouchableOpacity>
          </View>
          <CustomButton
            loader={loader}
            title="Save"
            isEnable={true}
            style={{marginTop: 50}}
            onPress={() => saveUserDetails()}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
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
});

export default EditProfile;
