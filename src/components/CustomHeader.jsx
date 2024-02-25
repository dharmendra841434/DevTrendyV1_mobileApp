import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';
import appColors from '../utils/appColors';
import appFonts from '../utils/appFonts';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomHeader = ({title}) => {
  const navigation = useNavigation();
  return (
    <>
      <StatusBar
        backgroundColor={appColors.appBlack}
        barStyle="light-content"
      />
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back-outline"
            color={appColors.appWhite}
            size={25}
          />
        </TouchableOpacity>
        <Text style={styles.header}>{title}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    backgroundColor: appColors.appWhite,
    paddingVertical: 20,
    paddingHorizontal: 10,
    columnGap: 16,
    backgroundColor: appColors.appBlack,
  },
  header: {
    fontFamily: appFonts.PoppinsMedium,
    color: appColors.appWhite,
    fontSize: 17,
    textTransform: 'capitalize',
  },
});

export default CustomHeader;
