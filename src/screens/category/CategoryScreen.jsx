import {View, Text} from 'react-native';
import React from 'react';
import CardLoader from '../../components/loaders/cardLoader';
import appColors from '../../utils/appColors';

const CategoryScreen = () => {
  return (
    <View style={{backgroundColor: appColors.appWhite, flex: 1}}>
      <Text>CategoryScreen</Text>
      {/* <CardLoader /> */}
    </View>
  );
};

export default CategoryScreen;
