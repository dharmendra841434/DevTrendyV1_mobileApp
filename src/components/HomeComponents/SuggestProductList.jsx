import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProductCard from '../ProductCard';
import CardLoader from '../loaders/cardLoader';
import {BASE_URL} from '../../utils/base_Url';
import axios from 'axios';
import CustomButton from '../CustomButton';
import appColors from '../../utils/appColors';
import appFonts from '../../utils/appFonts';
import {useNavigation} from '@react-navigation/native';

const Height = Dimensions.get('window').height;

const SuggestProductList = () => {
  const [pageNumber, setPageNumber] = useState(1);
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
      })
      .catch(error => {
        console.log(error);
        setDataLoader(false);
      });
  };

  useEffect(() => {
    getSuggestProducts();
  }, []);

  return (
    <View>
      {dataLoader ? (
        <View>
          <CardLoader />
        </View>
      ) : (
        <View>
          {suggestProducts?.length !== 0 && (
            <View style={{alignItems: 'center'}}>
              <FlatList
                data={suggestProducts}
                scrollEnabled={false}
                numColumns={clmn}
                renderItem={({item, index}) => (
                  <ProductCard style={styles.cardContainer} item={item} />
                )}
              />
            </View>
          )}
        </View>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate('allSuggested')}
        style={styles.loadButton}>
        <Text style={{fontFamily: appFonts.Poppins, color: appColors.appBlack}}>
          Load all...
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  loadButton: {
    borderWidth: 1,
    borderColor: appColors.borderColor,
    alignSelf: 'center',
    padding: 3,
    paddingHorizontal: 10,
    marginTop: 8,
    borderRadius: 5,
  },
});

export default SuggestProductList;
