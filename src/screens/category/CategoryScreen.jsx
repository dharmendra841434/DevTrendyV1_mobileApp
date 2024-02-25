import {View, Text, Image} from 'react-native';
import React from 'react';
import CardLoader from '../../components/loaders/cardLoader';
import appColors from '../../utils/appColors';
import appFonts from '../../utils/appFonts';
import CustomHeader from '../../components/CustomHeader';

const CategoryScreen = () => {
  return (
    <View
      style={{
        backgroundColor: appColors.appWhite,
        flex: 1,
      }}>
      <CustomHeader title="Categories" />
      <Text
        style={{
          fontFamily: appFonts.PoppinsBold,
          color: appColors.appRed,
          alignSelf: 'center',
          fontSize: 18,
          marginTop: '40%',
        }}>
        We add more category soon...
      </Text>
    </View>
  );
};

export default CategoryScreen;
