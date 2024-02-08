import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import appColors from '../../utils/appColors';
import appFonts from '../../utils/appFonts';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import LoginSection from '../../components/LoginSection/LoginSection';
import {useSelector, useDispatch} from 'react-redux';
import CustomButton from '../../components/CustomButton';
import {removeAccessToken} from '../../utils/helper';
import {
  setLoginStatus,
  setUserData,
} from '../../reduxManagment/splice/appSlice';
import {accountMenu} from '../../utils/dummyData';

const Height = Dimensions.get('window').height;

const AccountScreen = () => {
  const isLoggedIn = useSelector(state => state?.app?.isLoggedIn);
  const userData = useSelector(state => state?.app?.userData);
  const [modalVisible, setModalVisible] = useState(false);
  const cartItems = useSelector(state => state?.app?.cartItems);
  const navigation = useNavigation();
  const [clmn, setClmn] = useState(2);

  const dispatch = useDispatch();
  // console.log(isLoggedIn, 'user logged in');
  // console.log(userData, 'user ');

  const logoutUser = async () => {
    await removeAccessToken('accessToken').then(() => {
      dispatch(setUserData(null));
      dispatch(setLoginStatus(false));
      navigation.navigate('Home');
    });
  };
  return (
    <View style={Styles.screen}>
      <StatusBar backgroundColor={appColors.appWhite} barStyle="dark-content" />
      <View>
        {isLoggedIn ? (
          <View
            style={{
              ...Styles.topContainer,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/images/dp2.png')}
              style={{height: 100, width: 50}}
            />
            <View style={{marginLeft: 20}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontFamily: appFonts.PoppinsMedium,
                    color: appColors.appBlack,
                    textTransform: 'capitalize',
                    fontSize: 17,
                  }}>
                  Hey!{' '}
                </Text>
                <Text
                  style={{
                    fontFamily: appFonts.PoppinsMedium,
                    color: appColors.appBlack,
                    textTransform: 'capitalize',
                    fontSize: 17,
                  }}>
                  {userData?.firstName} {userData?.lastName}
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: appFonts.Poppins,
                  color: appColors.appGray,
                  textTransform: 'capitalize',
                  fontSize: 13,
                }}>
                {userData?.countryCode}
                {userData?.phone}
              </Text>
              <Text
                style={{
                  fontFamily: appFonts.Poppins,
                  color: appColors.appBlack,
                  textTransform: 'capitalize',
                  fontSize: 13,
                }}>
                Save addresses for quick buy
              </Text>
            </View>
          </View>
        ) : (
          <View style={Styles.topContainer}>
            <Text style={Styles.heading}>Account</Text>
            <View style={Styles.topBar}>
              <Text
                style={{
                  color: appColors.appGray,
                  fontFamily: appFonts.Poppins,
                  fontSize: 14,
                }}>
                Login and grab best offfers
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={Styles.logiButton}>
                <Text
                  style={{
                    color: appColors.appWhite,
                    fontFamily: appFonts.Poppins,
                    fontSize: 16,
                  }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <ScrollView>
          <View style={{height: '90%'}}>
            {isLoggedIn && (
              <View style={Styles.settingSection}>
                <FlatList
                  data={accountMenu}
                  numColumns={clmn}
                  renderItem={({item, index}) => (
                    <View style={{width: '45%', margin: 10}}>
                      <TouchableOpacity
                        activeOpacity={0.6}
                        key={index}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          borderColor: appColors.borderColor,
                          borderWidth: 1,
                          borderRadius: 4,
                          justifyContent: 'center',
                          columnGap: 10,
                          paddingVertical: 5,
                        }}>
                        {item.icon}
                        <Text>{item.title}</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            )}
            <View style={Styles.settingSection}>
              <Text style={Styles.heading}>Account Settings</Text>
              {isLoggedIn && (
                <View style={Styles.optionsContainer}>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name="person-outline"
                      size={25}
                      color={appColors.appRed}
                    />
                    <Text
                      style={{
                        color: appColors.appBlack,
                        fontFamily: appFonts.Poppins,
                        marginStart: 4,
                      }}>
                      Edit profile
                    </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() =>
                      navigation.navigate('edit_profile', {
                        userData: userData,
                      })
                    }>
                    <Icon
                      name="chevron-forward-outline"
                      size={20}
                      color={appColors.appBlack}
                    />
                  </TouchableOpacity>
                </View>
              )}
              {isLoggedIn && (
                <View style={Styles.optionsContainer}>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name="location-outline"
                      size={27}
                      color={appColors.appRed}
                    />
                    <Text
                      style={{
                        color: appColors.appBlack,
                        fontFamily: appFonts.Poppins,
                        marginStart: 4,
                      }}>
                      Saved addresses
                    </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('savedAddress')}>
                    <Icon
                      name="chevron-forward-outline"
                      size={20}
                      color={appColors.appBlack}
                    />
                  </TouchableOpacity>
                </View>
              )}
              {isLoggedIn && (
                <View style={Styles.optionsContainer}>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name="wallet-outline"
                      size={25}
                      color={appColors.appRed}
                    />
                    <Text
                      style={{
                        color: appColors.appBlack,
                        fontFamily: appFonts.Poppins,
                        marginStart: 4,
                      }}>
                      Saved Cards and Wallets
                    </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    //  onPress={() =>
                    //   navigation.navigate('edit_profile', {
                    //     userData: userData,
                    //   })
                    // }
                  >
                    <Icon
                      name="chevron-forward-outline"
                      size={20}
                      color={appColors.appBlack}
                    />
                  </TouchableOpacity>
                </View>
              )}
              <View style={Styles.optionsContainer}>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    name="language-outline"
                    size={27}
                    color={appColors.appRed}
                  />
                  <Text
                    style={{
                      color: appColors.appBlack,
                      fontFamily: appFonts.Poppins,
                      marginStart: 4,
                    }}>
                    Select language
                  </Text>
                </View>
                <TouchableOpacity>
                  <Icon
                    name="chevron-forward-outline"
                    size={20}
                    color={appColors.appBlack}
                  />
                </TouchableOpacity>
              </View>
              <View style={Styles.optionsContainer}>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    name="notifications-circle-outline"
                    size={27}
                    color={appColors.appRed}
                  />
                  <Text
                    style={{
                      color: appColors.appBlack,
                      fontFamily: appFonts.Poppins,
                      marginStart: 4,
                    }}>
                    Notification settings
                  </Text>
                </View>
                <TouchableOpacity>
                  <Icon
                    name="chevron-forward-outline"
                    size={20}
                    color={appColors.appBlack}
                  />
                </TouchableOpacity>
              </View>
              <View style={Styles.optionsContainer}>
                <View style={{flexDirection: 'row'}}>
                  <Icon2 name="headset" size={24} color={appColors.appRed} />
                  <Text
                    style={{
                      color: appColors.appBlack,
                      fontFamily: appFonts.Poppins,
                      marginStart: 8,
                    }}>
                    Help center
                  </Text>
                </View>
                <TouchableOpacity>
                  <Icon
                    name="chevron-forward-outline"
                    size={20}
                    color={appColors.appBlack}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={Styles.settingSection}>
              <Text style={Styles.heading}>Feedback & Information</Text>
              <View style={Styles.optionsContainer}>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    name="document-text-outline"
                    size={27}
                    color={appColors.appRed}
                  />
                  <Text
                    style={{
                      color: appColors.appBlack,
                      fontFamily: appFonts.Poppins,
                      marginStart: 4,
                    }}>
                    Terms, Policies and Licenses
                  </Text>
                </View>
                <TouchableOpacity>
                  <Icon
                    name="chevron-forward-outline"
                    size={20}
                    color={appColors.appBlack}
                  />
                </TouchableOpacity>
              </View>
              <View style={Styles.optionsContainer}>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    name="information-circle-outline"
                    size={27}
                    color={appColors.appRed}
                  />
                  <Text
                    style={{
                      color: appColors.appBlack,
                      fontFamily: appFonts.Poppins,
                      marginStart: 4,
                    }}>
                    Browse FAQ's
                  </Text>
                </View>
                <TouchableOpacity>
                  <Icon
                    name="chevron-forward-outline"
                    size={20}
                    color={appColors.appBlack}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <LoginSection
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      {isLoggedIn && (
        <CustomButton
          title="Logout"
          onPress={() => logoutUser()}
          isEnable={true}
          style={Styles.logout}
          titleStyle={{color: appColors.appBlack}}
        />
      )}
    </View>
  );
};

const Styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: appColors.cardBg,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: appColors.appWhite,
  },
  topContainer: {
    backgroundColor: appColors.appWhite,
    paddingVertical: 14,
    elevation: 5,
    paddingHorizontal: '4%',
  },
  logiButton: {
    backgroundColor: appColors.appRed,
    paddingHorizontal: 20,
    paddingVertical: 2,
    marginStart: 7,
    borderRadius: 4,
  },
  settingSection: {
    backgroundColor: appColors.appWhite,
    marginVertical: 5,
    // borderTopColor: appColors.borderColor,
    // borderTopWidth: 1,
    paddingHorizontal: '4%',
    paddingVertical: 7,
    elevation: 5,
  },
  heading: {
    color: appColors.appBlack,
    fontFamily: appFonts.PoppinsMedium,
    fontSize: 16,
  },
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
  logout: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10,
    elevation: 5,
    backgroundColor: appColors.borderColor,
    borderWidth: 1,
    borderColor: appColors.borderColor,
  },
});

export default AccountScreen;
