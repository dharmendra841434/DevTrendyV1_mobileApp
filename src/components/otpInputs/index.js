import {View, TextInput, StyleSheet} from 'react-native';
import React, {useState, useRef} from 'react';
import appColors from '../../utils/appColors';

const OtpInputs = ({
  setPin1,
  setPin2,
  setPin3,
  setPin4,
  setPin5,
  setPin6,
  setOtpStatus,
}) => {
  const [pin1Status, setPin1Status] = useState(false);
  const [pin2Status, setPin2Status] = useState(false);
  const [pin3Status, setPin3Status] = useState(false);
  const [pin4Status, setPin4Status] = useState(false);
  const [pin5Status, setPin5Status] = useState(false);
  const [pin6Status, setPin6Status] = useState(false);
  const pin1Ref = useRef();
  const pin2Ref = useRef();
  const pin3Ref = useRef();
  const pin4Ref = useRef();
  const pin5Ref = useRef();
  const pin6Ref = useRef();

  return (
    <View style={Styles.Container}>
      <TextInput
        maxLength={1}
        ref={pin1Ref}
        autoFocus={true}
        cursorColor={appColors.appBlack}
        keyboardType="number-pad"
        onFocus={() => setPin1Status(true)}
        onBlur={() => setPin1Status(false)}
        style={[
          Styles.input,
          {borderBottomColor: pin1Status ? 'orange' : appColors.appGray},
        ]}
        onChangeText={p1 => {
          setPin1(p1);
          setOtpStatus('');
          if (p1 !== '') {
            pin2Ref.current.focus();
          }
        }}
      />
      <TextInput
        style={[
          Styles.input,
          {borderBottomColor: pin2Status ? 'orange' : appColors.appGray},
        ]}
        maxLength={1}
        ref={pin2Ref}
        cursorColor={appColors.appBlack}
        onFocus={() => setPin2Status(true)}
        onBlur={() => setPin2Status(false)}
        keyboardType="number-pad"
        onChangeText={p2 => {
          setPin2(p2);
          setOtpStatus('');
          if (p2 !== '') {
            pin3Ref.current.focus();
          }
        }}
        onKeyPress={function (e) {
          if (e.nativeEvent.key === 'Backspace') {
            pin1Ref.current.focus();
          }
        }}
      />
      <TextInput
        style={[
          Styles.input,
          {borderBottomColor: pin3Status ? 'orange' : appColors.appGray},
        ]}
        maxLength={1}
        ref={pin3Ref}
        cursorColor={appColors.appBlack}
        onFocus={() => setPin3Status(true)}
        onBlur={() => setPin3Status(false)}
        keyboardType="number-pad"
        onChangeText={p3 => {
          setPin3(p3);
          setOtpStatus('');
          if (p3 !== '') {
            pin4Ref.current.focus();
          }
        }}
        onKeyPress={function (e) {
          if (e.nativeEvent.key === 'Backspace') {
            pin2Ref.current.focus();
          }
        }}
      />
      <TextInput
        style={[
          Styles.input,
          {borderBottomColor: pin4Status ? 'orange' : appColors.appGray},
        ]}
        maxLength={1}
        ref={pin4Ref}
        cursorColor={appColors.appBlack}
        onFocus={() => setPin4Status(true)}
        onBlur={() => setPin4Status(false)}
        keyboardType="number-pad"
        onChangeText={p4 => {
          setPin4(p4);
          setOtpStatus('');
          if (p4 !== '') {
            pin5Ref.current.focus();
          }
        }}
        onKeyPress={function (e) {
          if (e.nativeEvent.key === 'Backspace') {
            pin3Ref.current.focus();
          }
        }}
      />
      <TextInput
        style={[
          Styles.input,
          {borderBottomColor: pin5Status ? 'orange' : appColors.appGray},
        ]}
        maxLength={1}
        ref={pin5Ref}
        cursorColor={appColors.appBlack}
        onFocus={() => setPin5Status(true)}
        onBlur={() => setPin5Status(false)}
        keyboardType="number-pad"
        onChangeText={p5 => {
          setPin5(p5);
          setOtpStatus('');
          if (p5 !== '') {
            pin6Ref.current.focus();
          }
        }}
        onKeyPress={function (e) {
          if (e.nativeEvent.key === 'Backspace') {
            pin4Ref.current.focus();
          }
        }}
      />
      <TextInput
        style={[
          Styles.input,
          {borderBottomColor: pin6Status ? 'orange' : appColors.appGray},
        ]}
        maxLength={1}
        ref={pin6Ref}
        cursorColor={appColors.appBlack}
        onFocus={() => setPin6Status(true)}
        onBlur={() => setPin6Status(false)}
        keyboardType="number-pad"
        onChangeText={p6 => {
          setPin6(p6);
          setOtpStatus('');
        }}
        onKeyPress={function (e) {
          if (e.nativeEvent.key === 'Backspace') {
            pin5Ref.current.focus();
          }
        }}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '8%',
  },
  input: {
    borderBottomColor: appColors.appGray,
    borderBottomWidth: 1,
    borderRadius: 5,
    width: '15%',
    paddingVertical: 6,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default OtpInputs;
