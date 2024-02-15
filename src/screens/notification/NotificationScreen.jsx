import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import appColors from '../../utils/appColors';
import appFonts from '../../utils/appFonts';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [selectedType, setSelectedType] = useState('all');
  const type = ['all', 'read', 'unread'];
  return (
    <View
      style={{
        backgroundColor: appColors.appWhite,
        flex: 1,
      }}>
      <StatusBar
        backgroundColor={appColors.appWhite}
        barStyle="light-content"
      />
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back-outline"
            color={appColors.appBlack}
            size={25}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Notifications</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          columnGap: 10,
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}>
        {type?.map((item, index) => (
          <TouchableOpacity
            onPress={() => setSelectedType(item)}
            key={index}
            style={{
              ...styles.button,
              borderColor:
                item === selectedType
                  ? appColors.appRed
                  : appColors.borderColor,
            }}>
            <Text
              style={{
                fontFamily: appFonts.Poppins,
                textTransform: 'capitalize',
                color:
                  item === selectedType
                    ? appColors.appBlack
                    : appColors.appGray,
              }}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    backgroundColor: appColors.appWhite,
    paddingVertical: 10,
    paddingHorizontal: 10,
    columnGap: 16,
    elevation: 5,
  },
  header: {
    fontFamily: appFonts.PoppinsMedium,
    color: appColors.appBlack,
    fontSize: 17,
  },
  button: {
    borderWidth: 1,
    borderColor: appColors.borderColor,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default NotificationScreen;
