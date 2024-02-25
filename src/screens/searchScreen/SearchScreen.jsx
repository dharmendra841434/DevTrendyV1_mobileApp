import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import appColors from '../../utils/appColors';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [focus, setFocus] = useState(true);
  return (
    <View style={styles.screen}>
      <StatusBar
        backgroundColor={appColors.appBlack}
        barStyle="light-content"
      />
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon
            name="arrow-back-outline"
            size={26}
            color={appColors.appWhite}
          />
        </TouchableOpacity>
        <View
          style={{
            ...styles.inputContainer,
            borderColor: focus ? appColors.appRed : appColors.appGray,
          }}>
          <Icon name="search-outline" size={22} color={appColors.appGray} />
          <TextInput
            style={{
              paddingVertical: 8,
              paddingStart: 5,
              color: appColors.appWhite,
            }}
            cursorColor={appColors.appGray}
            autoFocus={focus}
            onBlur={() => {
              setFocus(false);
            }}
            onFocus={() => setFocus(true)}
            placeholder="Search for products"
            placeholderTextColor={appColors.appGray}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: appColors.appWhite,
  },
  topBar: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appColors.appBlack,
    paddingVertical: '4%',
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 50,
    width: '85%',
    marginStart: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: 10,
  },
});

export default SearchScreen;
