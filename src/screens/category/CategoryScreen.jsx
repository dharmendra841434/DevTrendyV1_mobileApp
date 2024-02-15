import {View, Text, Image} from 'react-native';
import React from 'react';
import CardLoader from '../../components/loaders/cardLoader';
import appColors from '../../utils/appColors';
import appFonts from '../../utils/appFonts';

const CategoryScreen = () => {
  return (
    <View
      style={{
        backgroundColor: appColors.appWhite,
        flex: 1,
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontFamily: appFonts.PoppinsBold,
          color: appColors.appRed,
          alignSelf: 'center',
          fontSize: 18,
        }}>
        We add more category soon...
      </Text>
    </View>
  );
};

export default CategoryScreen;
