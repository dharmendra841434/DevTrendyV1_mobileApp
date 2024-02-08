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
import axios from 'axios';
import ProductCard from '../../components/ProductCard';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSlide from '../../components/BottomSlide';
import Disclaimer from '../../components/Desclimer';
import {setAccessToken} from '../../utils/helper';
import CardLoader from '../../components/loaders/cardLoader';
import Carousel from 'react-native-reanimated-carousel';
const width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const HomeScreen = () => {
  const myData = [...new Array(6).keys()];
  const cartItems = useSelector(state => state?.app?.cartItems);
  const [active, setActive] = useState(0);
  const [clmn, setClmn] = useState(2);
  const [recomData, setRecomData] = useState([]);
  const [dataLoader, setDataLoader] = useState(false);
  const navigation = useNavigation();
  const [disclaimerModel, setDisclaimerModel] = useState(false);

  const getRecommendedProducts = async () => {
    setDataLoader(true);
    await axios
      .get('https://dev-shop-api.vercel.app/api/v1/product/products-list')
      .then(res => {
        setRecomData(res.data?.data);
        // console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setDataLoader(false);
      });
  };

  const checkDis = async () => {
    const isFirstTime = await AsyncStorage.getItem('check_first');
    console.log(isFirstTime, 'first');
    if (isFirstTime === null) {
      setDisclaimerModel(true);
    } else {
      setDisclaimerModel(false);
    }
  };

  useEffect(() => {
    getRecommendedProducts();
    checkDis();
  }, []);

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
        <View>
          <Carousel
            loop
            width={width}
            height={width / 2}
            autoPlay={true}
            data={myData}
            scrollAnimationDuration={1000}
            onSnapToItem={index => setActive(index)}
            renderItem={({index}) => {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    padding: 5,
                    borderRadius: 10,
                    overflow: 'hidden',
                  }}
                  key={index}

                  //key={generateTwoDigitNumber()}
                >
                  {index == 0 && (
                    <Image
                      source={require(`../../assets/images/img1.png`)}
                      style={{height: '100%', width: '100%'}}
                    />
                  )}
                  {index == 1 && (
                    <Image
                      source={require(`../../assets/images/img2.png`)}
                      style={{height: '100%', width: '100%', borderRadius: 10}}
                    />
                  )}
                  {index == 2 && (
                    <Image
                      source={require(`../../assets/images/img3.png`)}
                      style={{height: '100%', width: '100%', borderRadius: 10}}
                    />
                  )}
                  {index == 3 && (
                    <Image
                      source={require(`../../assets/images/img4.png`)}
                      style={{height: '100%', width: '100%', borderRadius: 10}}
                    />
                  )}
                  {index == 4 && (
                    <Image
                      source={require(`../../assets/images/img5.png`)}
                      style={{height: '100%', width: '100%', borderRadius: 10}}
                    />
                  )}
                  {index == 5 && (
                    <Image
                      source={require(`../../assets/images/img6.png`)}
                      style={{height: '100%', width: '100%', borderRadius: 10}}
                    />
                  )}
                </View>
              );
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '20%',
              alignSelf: 'center',
              marginTop: 5,
            }}>
            {myData?.map((item, index) => (
              <View
                style={{
                  width: active === index ? 12 : 7,
                  height: 7,
                  backgroundColor:
                    active === index ? appColors.appRed : '#d4d2d2',
                  borderRadius: 50,
                }}
              />
            ))}
          </View>
        </View>
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
              Recommended
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
          <View>
            {dataLoader ? (
              <View>
                <CardLoader />
              </View>
            ) : (
              <View>
                <View style={{alignItems: 'center'}}>
                  <FlatList
                    data={recomData}
                    numColumns={clmn}
                    scrollEnabled={false}
                    renderItem={({item, index}) => (
                      <ProductCard style={styles.cardContainer} item={item} />
                      // <TouchableOpacity
                      //   onPress={() => {
                      //     navigation.navigate('product_details', {
                      //       details: item,
                      //     });
                      //   }}
                      //   activeOpacity={0.6}
                      //   style={styles.cardContainer}
                      //   key={item._id}>
                      //   <Image
                      //     source={{
                      //       uri: item?.coverImage,
                      //     }}
                      //     style={{
                      //       height: '60%',
                      //       width: '60%',
                      //     }}
                      //   />
                      //   <Text
                      //     style={{
                      //       color: appColors.appGray,
                      //       fontFamily: appFonts.Poppins,
                      //       marginTop: 2,
                      //       textTransform: 'capitalize',
                      //       fontSize: 12,
                      //     }}>
                      //     {item?.category}
                      //   </Text>
                      //   <Text
                      //     style={{
                      //       color: appColors.appBlack,
                      //       fontFamily: appFonts.PoppinsBold,
                      //       textTransform: 'capitalize',
                      //       fontSize: 16,
                      //       marginTop: -5,
                      //     }}>
                      //     {item?.product_name}
                      //   </Text>
                      //   <View
                      //     style={{
                      //       flexDirection: 'row',
                      //       alignItems: 'center',
                      //     }}>
                      //     <View
                      //       style={{
                      //         flexDirection: 'row',
                      //         alignItems: 'center',
                      //       }}>
                      //       <Image
                      //         source={require('../../assets/images/rp.png')}
                      //         style={{height: 15, width: 15}}
                      //       />
                      //       <Text
                      //         style={{
                      //           color: appColors.appBlack,
                      //           fontFamily: appFonts.Poppins,

                      //           fontSize: 16,
                      //         }}>
                      //         {calculateDiscountedPrice(
                      //           item?.price,
                      //           item?.discount,
                      //         )}
                      //       </Text>
                      //     </View>
                      //     <View
                      //       style={{
                      //         flexDirection: 'row',
                      //         alignItems: 'center',
                      //         marginHorizontal: 1,
                      //       }}>
                      //       <Image
                      //         source={require('../../assets/images/rp.png')}
                      //         style={{
                      //           height: 10,
                      //           width: 10,
                      //           tintColor: appColors.appGray,
                      //         }}
                      //       />
                      //       <Text
                      //         style={{
                      //           color: appColors.appGray,
                      //           fontFamily: appFonts.Poppins,
                      //           fontSize: 13,
                      //           textDecorationLine: 'line-through',
                      //         }}>
                      //         {item?.price}
                      //       </Text>
                      //     </View>
                      //   </View>
                      //   <View style={styles.offTag}>
                      //     <Text
                      //       style={{color: appColors.appWhite, fontSize: 12}}>
                      //       {item?.discount}% off
                      //     </Text>
                      //   </View>
                      // </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            )}
          </View>
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
  cardContainer: {
    height: Height / 2.8,
    width: '45%',
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#ededeb',
    borderWidth: 1,
    borderColor: '#cacccb',
    borderRadius: 15,
    position: 'relative',
    paddingTop: 10,
  },
});

export default HomeScreen;
