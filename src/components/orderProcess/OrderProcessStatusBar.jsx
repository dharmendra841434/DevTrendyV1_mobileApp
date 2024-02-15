import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import appColors from '../../utils/appColors';
import Icon from 'react-native-vector-icons/Ionicons';
import appFonts from '../../utils/appFonts';

const OrderProcessStatusBar = ({data}) => {
  console.log(data, 'tyduyy');
  return (
    <View style={styles.main}>
      <View>
        <View
          style={{
            height: 1.8,
            backgroundColor: appColors.appBlue,
            width: '100%',
          }}
        />
        <View style={styles.conatiner}>
          {data?.map((item, index) => (
            <View
              key={index}
              style={{alignItems: 'center', justifyContent: 'center'}}>
              {item?.isComplete ? (
                <View style={styles.box}>
                  <Icon
                    name="checkmark-circle-outline"
                    size={35}
                    color={appColors.appBlue}
                  />
                </View>
              ) : (
                <View style={styles.box}>
                  <View style={styles.p}>
                    <Text style={{color: appColors.appWhite}}>{index + 1}</Text>
                  </View>
                </View>
              )}
              <Text
                style={{
                  color: appColors.appBlack,
                  fontFamily: appFonts.Poppins,
                  fontSize: 12,
                }}>
                {item.title}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    paddingHorizontal: '10%',
    paddingVertical: 20,
  },
  conatiner: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    left: -10,
    right: -15,
    top: -20,
  },
  box: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.appWhite,
    borderRadius: 30,
  },
  p: {
    borderWidth: 1,
    borderColor: appColors.borderColor,
    height: 30,
    width: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.appBlue,
  },
});

export default OrderProcessStatusBar;
