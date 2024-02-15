import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React from 'react';
import appColors from '../utils/appColors';
const Height = Dimensions.get('window').height;
const BottomSlide = ({modalVisible, setModalVisible, children}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={Styles.centeredView}>{children}</View>
    </Modal>
  );
};

const Styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
});

export default BottomSlide;
