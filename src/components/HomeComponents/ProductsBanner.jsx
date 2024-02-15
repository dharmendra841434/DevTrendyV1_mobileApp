import {View, Text, Dimensions, Image} from 'react-native';
import React, {useState} from 'react';
import Carousel from 'react-native-reanimated-carousel';
import appColors from '../../utils/appColors';
const width = Dimensions.get('window').width;

const ProductsBanner = () => {
  const myData = [...new Array(6).keys()];
  const [active, setActive] = useState(0);
  return (
    <View>
      <Carousel
        loop
        width={width}
        height={width / 2}
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
                  source={require(`../../assets/images/img1.png`)}
                  style={{height: '100%', width: '100%'}}
                />
              )}
              {index == 1 && (
                <Image
                  source={require(`../../assets/images/img2.png`)}
                  style={{height: '100%', width: '100%', borderRadius: 10}}
                />
              )}
              {index == 2 && (
                <Image
                  source={require(`../../assets/images/img3.png`)}
                  style={{height: '100%', width: '100%', borderRadius: 10}}
                />
              )}
              {index == 3 && (
                <Image
                  source={require(`../../assets/images/img4.png`)}
                  style={{height: '100%', width: '100%', borderRadius: 10}}
                />
              )}
              {index == 4 && (
                <Image
                  source={require(`../../assets/images/img5.png`)}
                  style={{height: '100%', width: '100%', borderRadius: 10}}
                />
              )}
              {index == 5 && (
                <Image
                  source={require(`../../assets/images/img6.png`)}
                  style={{height: '100%', width: '100%', borderRadius: 10}}
                />
              )}
            </View>
          );
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '20%',
          alignSelf: 'center',
          marginTop: 5,
        }}>
        {myData?.map((item, index) => (
          <View
            style={{
              width: active === index ? 12 : 7,
              height: 7,
              backgroundColor: active === index ? appColors.appRed : '#d4d2d2',
              borderRadius: 50,
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default ProductsBanner;
