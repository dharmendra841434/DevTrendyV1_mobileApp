import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import appColors from '../../utils/appColors';
import appFonts from '../../utils/appFonts';
const Height = Dimensions.get('window').height;
const Modal_Loader = ({modalVisible, setModalVisible, children}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.conatiner}>
          <ActivityIndicator size={100} color={appColors.appRed} />
          <Text
            style={{
              fontFamily: appFonts.Poppins,
              color: appColors.textBlack,
              fontSize: 16,
              marginTop: '10%',
            }}>
            Please wait...
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  conatiner: {
    backgroundColor: appColors.appWhite,
    padding: 100,
    borderRadius: 10,
  },
});

export default Modal_Loader;
