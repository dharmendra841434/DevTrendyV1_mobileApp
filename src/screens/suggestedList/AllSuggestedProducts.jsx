import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import appColors from '../../utils/appColors';
import Icon from 'react-native-vector-icons/Ionicons';
import appFonts from '../../utils/appFonts';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL} from '../../utils/base_Url';
import ProductCard from '../../components/ProductCard';
import CardLoader from '../../components/loaders/cardLoader';

const Height = Dimensions.get('window').height;

const AllSuggestedProducts = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [reachedLoader, setReachedLoader] = useState(false);
  const [clmn, setClmn] = useState(2);
  const [suggestProducts, setsuggestProducts] = useState([]);
  const [dataLoader, setDataLoader] = useState(false);
  const navigation = useNavigation();

  const getSuggestProducts = async () => {
    setDataLoader(true);
    await axios
      .get(`${BASE_URL}/product/products?page=${pageNumber}`)
      .then(res => {
        // console.log(res?.data, 'dslio');
        setsuggestProducts(res?.data?.data);
        setDataLoader(false);
        setPageNumber(2);
      })
      .catch(error => {
        console.log(error);
        setDataLoader(false);
      });
  };

  const handleOnEndReached = async () => {
    setReachedLoader(true);
    setPageNumber(prev => prev + 1);
    // console.log(pageNumber, 'page');
    await axios
      .get(`${BASE_URL}/product/products?page=${pageNumber}`)
      .then(res => {
        if (res?.data?.data?.length === 0) {
          ToastAndroid.showWithGravityAndOffset(
            'No more data...',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
        setsuggestProducts(suggestProducts?.concat(res?.data?.data));
        setReachedLoader(false);
      })
      .catch(error => {
        console.log(error);
        setReachedLoader(false);
      });
  };

  useEffect(() => {
    getSuggestProducts();
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back-outline"
            color={appColors.appWhite}
            size={25}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Suggested products</Text>
      </View>
      <View>
        {dataLoader ? (
          <View>
            <CardLoader />
          </View>
        ) : (
          <View style={{height: '95%'}}>
            <FlatList
              data={suggestProducts}
              numColumns={clmn}
              scrollEnabled={true}
              onEndReached={() => {
                handleOnEndReached();
              }}
              onEndReachedThreshold={0.5}
              renderItem={({item, index}) => (
                <ProductCard style={styles.cardContainer} item={item} />
              )}
            />

            <View>
              {reachedLoader && (
                <ActivityIndicator color={appColors.appRed} size={30} />
              )}
            </View>
          </View>
        )}
      </View>
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
    backgroundColor: appColors.appBlack,
    paddingVertical: 20,
    paddingHorizontal: 6,
    columnGap: 16,
  },
  header: {
    fontFamily: appFonts.PoppinsMedium,
    color: appColors.appWhite,
    fontSize: 17,
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
    paddingTop: 15,
  },
});

export default AllSuggestedProducts;
