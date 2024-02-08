import {
  View,
  Text,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Width = Dimensions.get('window').width;

const CardLoader = () => {
  const [clmn, setClmn] = useState(2);
  return (
    <View style={{alignItems: 'center', paddingHorizontal: '2%'}}>
      <FlatList
        numColumns={clmn}
        data={[1, 2, 3, 4, 5, 6]}
        renderItem={({item, index}) => (
          <View style={{marginVertical: 6, marginHorizontal: 4}}>
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item
                width={Width / 2.2}
                borderRadius={15}
                height={Width / 1.8}></SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          </View>
        )}
      />
    </View>
  );
};

export default CardLoader;
