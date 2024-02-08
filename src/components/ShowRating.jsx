// ShowRating.js

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ShowRating = ({rating, styles}) => {
  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const iconName = i <= rating ? 'star' : 'star-o'; // Use 'star' or 'star-o' based on the current rating
      stars.push(
        <TouchableOpacity
          key={i}
          //onPress={() => onPress(i)}
        >
          <Icon name={iconName} size={15} color="#FFD700" />
        </TouchableOpacity>,
      );
    }

    return stars;
  };

  return (
    <View style={{flexDirection: 'row', alignItems: 'center', ...styles}}>
      <Text>Rating : </Text>
      {renderStars()}
      {/* <Text style={{marginLeft: 10}}>{rating}/5</Text> */}
    </View>
  );
};

export default ShowRating;
