import {View, Text, Dimensions, Image} from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';

const Width = Dimensions.get('window').width;

const BannerCarousel = () => {
  const carouselItems = [
    {
      title: 'Item 1',
      img: require(`../../assets/images/img1.png`),
    },
    {
      title: 'Item 2',
      img: require(`../../assets/images/img2.png`),
    },
    {
      title: 'Item 3',
      img: require(`../../assets/images/img3.png`),
    },
    {
      title: 'Item 4',
      img: require(`../../assets/images/img4.png`),
    },
    {
      title: 'Item 5',
      img: require(`../../assets/images/img5.png`),
    },
    {
      title: 'Item 6',
      img: require(`../../assets/images/img6.png`),
    },
  ];
  return (
    <View>
      <Carousel
        //   ref={ref => this.carousel = ref}
        data={carouselItems}
        sliderWidth={Width}
        itemWidth={Width}
        loop={true}
        autoplay={true}
        autoplayDelay={1000}
        autoplayInterval={3000}
        onSnapToItem={index => console.log(index)}
        renderItem={({item, index}) => (
          <View key={index} style={{height: 200, width: Width}}>
            {index == 0 && (
              <Image
                source={require(`../../assets/images/img1.png`)}
                style={{height: '100%', width: '100%', borderRadius: 10}}
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
        )}
      />
    </View>
  );
};

export default BannerCarousel;
