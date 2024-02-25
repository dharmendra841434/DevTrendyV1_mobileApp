import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import appColors from '../../utils/appColors';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import appFonts from '../../utils/appFonts';
import {useDispatch, useSelector} from 'react-redux';
import {getUserOrders} from '../../reduxManagment/splice/appSlice';
import {sortString} from '../../utils/helper';
import CustomHeader from '../../components/CustomHeader';

const OrdersList = () => {
  const ordersList = useSelector(state => state?.app?.ordersList);
  const userData = useSelector(state => state?.app?.userData);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders(userData?._id));
  }, []);

  return (
    <View style={styles.screen}>
      <CustomHeader title="Orders" />
      <View style={{marginTop: 10}}>
        <FlatList
          data={ordersList}
          renderItem={({item, index}) => (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                navigation.navigate('orderDetails', {
                  productData: item?.productDetails,
                });
              }}
              key={index}
              style={{
                marginVertical: 5,
                backgroundColor: appColors.cardBg,
                elevation: 5,
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '30%'}}>
                  <Image
                    source={{uri: item?.productDetails?.selectedColor}}
                    style={{height: 80, width: '100%'}}
                  />
                </View>
                <View style={{width: '60%', paddingVertical: '4%'}}>
                  <Text style={styles.subHeader}>
                    Update expected delivery date soon
                  </Text>
                  <Text style={styles.productTitle}>
                    {sortString(
                      `${item?.productDetails?.product_name} ${item?.productDetails?.category}    ${item?.productDetails?.type}`,
                      25,
                    )}
                  </Text>
                </View>
                <View style={{width: '10%', justifyContent: 'center'}}>
                  <Icon
                    name="chevron-forward-outline"
                    color={appColors.appGray}
                    size={25}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: appColors.appWhite,
  },

  subHeader: {
    fontFamily: appFonts.Poppins,
    color: appColors.appBlack,
    fontSize: 15,
  },
  productTitle: {
    fontFamily: appFonts.Poppins,
    color: appColors.appGray,
    fontSize: 15,
    textTransform: 'capitalize',
  },
});

export default OrdersList;
