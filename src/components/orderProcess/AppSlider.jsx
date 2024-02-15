import {View, Text, Dimensions, Image} from 'react-native';
import React, {useState} from 'react';
import Carousel from 'react-native-reanimated-carousel';
const width = Dimensions.get('window').width;

const AppSlider = () => {
  const myData = [...new Array(3).keys()];
  const [active, setActive] = useState(0);
  return (
    <View>
      <Carousel
        loop
        width={35}
        height={35}
        autoPlay={true}
        data={myData}
        scrollAnimationDuration={1000}
        onSnapToItem={index => setActive(index)}
        renderItem={({index}) => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                padding: 5,
                borderRadius: 10,
                overflow: 'hidden',
              }}
              key={index}

              //key={generateTwoDigitNumber()}
            >
              {index == 0 && (
                <Image
                  source={require(`../../assets/images/phonePay.png`)}
                  style={{height: '100%', width: '100%'}}
                />
              )}
              {index == 1 && (
                <Image
                  source={require(`../../assets/images/gpay.png`)}
                  style={{height: '100%', width: '100%', borderRadius: 10}}
                />
              )}
              {index == 2 && (
                <Image
                  source={require(`../../assets/images/ptm2.png`)}
                  style={{height: '100%', width: '100%', borderRadius: 10}}
                />
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export default AppSlider;
