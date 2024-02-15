import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import appColors from '../../utils/appColors';
import Icon from 'react-native-vector-icons/Ionicons';
import appFonts from '../../utils/appFonts';
import * as Animatable from 'react-native-animatable';
import {catData} from '../../utils/dummyData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Disclaimer from '../../components/Desclimer';
import {setAccessToken} from '../../utils/helper';
import SuggestProductList from '../../components/HomeComponents/SuggestProductList';
import ProductsBanner from '../../components/HomeComponents/ProductsBanner';
const width = Dimensions.get('window').width;

const HomeScreen = () => {
  const navigation = useNavigation();
  const [disclaimerModel, setDisclaimerModel] = useState(false);

  const checkDis = async () => {
    const isFirstTime = await AsyncStorage.getItem('check_first');
    // console.log(isFirstTime, 'first');
    if (isFirstTime === null) {
      setDisclaimerModel(true);
    } else {
      setDisclaimerModel(false);
    }
  };

  useEffect(() => {
    checkDis();
  }, []);

  // console.log(suggestProducts);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar
        backgroundColor={appColors.appBlack}
        barStyle="light-content"
      />
      <View style={styles.topBar}>
        <Image
          source={require('../../assets/images/logo2.png')}
          style={{width: 60, height: 60}}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('search');
          }}
          style={styles.searchButton}>
          <Icon name="search-outline" size={22} color={appColors.appGray} />
          <Animatable.Text
            style={{
              color: appColors.appGray,
              marginStart: 4,
              fontFamily: appFonts.Poppins,
            }}>
            Search for products
          </Animatable.Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <ProductsBanner />
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 8,
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontFamily: appFonts.PoppinsBold,
                color: appColors.appBlack,
                fontSize: 20,
              }}>
              Categories
            </Text>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: appFonts.Poppins,
                  color: appColors.appRed,
                }}>
                See all
              </Text>
              <Icon
                name="arrow-forward-outline"
                size={18}
                color={appColors.appRed}
              />
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center'}}>
            <FlatList
              data={catData}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('selectedcategory', {
                      categoryType: item.title,
                    });
                  }}
                  activeOpacity={0.6}
                  style={{
                    height: 100,
                    width: 80,
                    marginHorizontal: 5,
                    alignItems: 'center',
                  }}
                  key={item.title}>
                  <View
                    style={{
                      borderWidth: 2,
                      borderColor: appColors.borderColor,
                      padding: 2,
                      borderRadius: 50,
                    }}>
                    <Image
                      source={item.imgage}
                      style={{
                        height: 60,
                        width: 60,
                        borderRadius: 50,
                        borderWidth: 1,
                        borderColor: appColors.borderColor,
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      color: appColors.appBlack,
                      fontFamily: appFonts.Poppins,
                      marginTop: 2,
                      textTransform: 'capitalize',
                      fontSize: 13,
                    }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        <View style={{paddingVertical: '5%', marginTop: -20}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 8,
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontFamily: appFonts.PoppinsBold,
                color: appColors.appBlack,
                fontSize: 20,
              }}>
              Suggest for you
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('allSuggested')}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: appFonts.Poppins,
                  color: appColors.appRed,
                }}>
                See all
              </Text>
              <Icon
                name="arrow-forward-outline"
                size={18}
                color={appColors.appRed}
              />
            </TouchableOpacity>
          </View>
          <SuggestProductList />
        </View>
      </ScrollView>
      <Disclaimer
        onPress={() => {
          setAccessToken('check_first', 'jxsiodkwjewou');
          setDisclaimerModel(false);
        }}
        isOpen={disclaimerModel}
        setIsOpen={setDisclaimerModel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appColors.appBlack,
    height: '12%',
    paddingHorizontal: '3%',
    paddingVertical: '2%',
  },
  searchButton: {
    width: '80%',
    height: 45,
    marginStart: '4%',
    borderRadius: 5,
    borderColor: '#2b2a2a',
    borderWidth: 1,
    paddingStart: 5,
    backgroundColor: appColors.secoundryBlack,
    color: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HomeScreen;
