import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import appColors from '../../utils/appColors';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import appFonts from '../../utils/appFonts';
import PriceTag from '../../components/PriceTag';
import ShowRating from '../../components/ShowRating';
import {BASE_URL} from '../../utils/base_Url';
import CardLoader from '../../components/loaders/cardLoader';

const SelectedCategory = props => {
  const categoryType = props?.route?.params?.categoryType;
  const navigation = useNavigation();
  const [categoryData, setCategoryData] = useState([]);
  const [clm, setClm] = useState(2);
  const [loader, setLoader] = useState(false);

  const getCategoryData = async () => {
    setLoader(true);
    await axios
      .get(`${BASE_URL}/product/all-products?category=${categoryType}`)
      .then(res => {
        // console.log(res.data);
        setCategoryData(res?.data?.data);
      })
      .catch(err => {
        // console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  //console.log(categoryType, 'this is ');
  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor={appColors.appWhite} barStyle="dark-content" />
      <View style={styles.topBar}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back-outline"
            size={22}
            color={appColors.appBlack}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: appColors.textBlack,
            fontFamily: appFonts.Poppins,
            textTransform: 'capitalize',
            fontSize: 18,
            marginStart: 10,
          }}>
          {categoryType}
        </Text>
      </View>
      {loader ? (
        <CardLoader />
      ) : (
        <View style={{marginBottom: '18%', paddingBottom: 7}}>
          <FlatList
            data={categoryData}
            numColumns={clm}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{
                  width: '50%',
                  borderColor: appColors.borderColor,
                  borderWidth: 1,
                  padding: 10,
                }}
                onPress={() => {
                  navigation.navigate('product_details', {
                    details: item,
                  });
                }}
                key={index}>
                <View style={{padding: 7}}>
                  <Image
                    source={{uri: item.coverImage}}
                    style={{height: 180, width: 160}}
                    resizeMethod="resize"
                  />
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      fontFamily: appFonts.Poppins,
                      textTransform: 'capitalize',
                      color: appColors.appGray,
                      fontSize: 11,
                    }}>
                    {item.category}
                  </Text>
                  <Text
                    style={{
                      fontFamily: appFonts.Poppins,
                      textTransform: 'capitalize',
                      color: appColors.textBlack,
                      fontSize: 16,
                      marginTop: -6,
                    }}>
                    {item.product_name} || {item?.type}
                  </Text>
                  <ShowRating rating={3} styles={{marginTop: -3}} />
                  <PriceTag item={item} />
                </View>
              </TouchableOpacity>
            )}
          />
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
    paddingVertical: '5%',
  },
});

export default SelectedCategory;
