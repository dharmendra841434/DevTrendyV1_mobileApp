import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import {sizeChart} from '../utils/dummyData';
import appColors from '../utils/appColors';
import Icon from 'react-native-vector-icons/Ionicons';

const SizeDropDown = ({selected, onSelect}) => {
  return (
    <View>
      <FlatList
        data={sizeChart}
        horizontal
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => onSelect(item)}
            style={{
              marginHorizontal: 5,
              borderWidth: 1,
              borderColor:
                selected?.size === item.size
                  ? appColors.appRed
                  : appColors.borderColor,
              paddingVertical: 2,
              paddingHorizontal: 8,
              borderRadius: 3,
            }}>
            <Text>{item.size}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SizeDropDown;
