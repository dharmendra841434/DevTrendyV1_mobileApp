import React, {useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import appFonts from '../utils/appFonts';
import {Text, PermissionsAndroid, Platform} from 'react-native';
import axios from 'axios';
import appColors from '../utils/appColors';

const CheckDeliveryAdress = () => {
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [currentLatitude, setCurrentLatitude] = useState('');
  const [locationStatus, setLocationStatus] = useState('');
  const [loader, setLoader] = useState(false);
  const [pincodeInput, setPincodeInput] = useState('');
  const [dataLoader, setDataLoader] = useState(false);
  const [pincodeAddress, setPincodeAddress] = useState(null);
  const [showStatus, setShowStatus] = useState(false);
  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      getCurrentPosition();
    } else {
      try {
        console.log('ijughug');
        setLoader(true);
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        console.log(PermissionsAndroid.RESULTS.GRANTED);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          console.log('askhfd');
          getCurrentPosition();
        } else {
          setLocationStatus('Permission Denied');
        }
      } catch (err) {
        setLoader(false);
        console.warn(err);
        console.log(err);
      }
    }
  };
  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const checkPinCode = async () => {
    setDataLoader(true);
    await axios
      .get(`https://api.postalpincode.in/pincode/${pincodeInput}`)
      .then(res => {
        //setRecomData(res.data?.data);
        console.log(res.data[0]?.PostOffice[0]?.Block);
        setShowStatus(true);
        setPincodeAddress(
          res.data[0]?.PostOffice[0]?.Block + ' is avaliable for delivery',
        );
      })
      .catch(error => {
        // console.log(error, 'eeror');
        setShowStatus(true);
        setPincodeAddress('Not deliverable address');
      })
      .finally(() => {
        setDataLoader(false);
      });
  };
  //   useEffect(() => {
  //     requestLocationPermission();
  //   }, []);

  //console.log(currentLongitude, currentLatitude);
  return (
    <>
      <View style={{marginBottom: 10, paddingHorizontal: '5%'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            style={styles.pincodeInput}
            keyboardType="numeric"
            placeholder="Enter pincode"
            onChangeText={e => {
              if (e.length === 0) {
                setShowStatus(false);
              }
              setPincodeInput(e);
            }}
          />
          <TouchableOpacity
            onPress={() => checkPinCode()}
            style={styles.submit}>
            <Text
              style={{fontFamily: appFonts.Poppins, color: appColors.appWhite}}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
        {dataLoader ? (
          <Text>Checking...</Text>
        ) : (
          <>
            {showStatus && (
              <Text
                style={{
                  backgroundColor:
                    pincodeAddress === 'Not deliverable address'
                      ? '#fab4b9'
                      : '#d1e3ff',
                  fontFamily: appFonts.Poppins,
                  color:
                    pincodeAddress === 'Not deliverable address'
                      ? appColors.appRed
                      : appColors.appBlack,
                  marginVertical: 10,
                  paddingVertical: 4,
                  paddingHorizontal: 8,
                  borderRadius: 5,
                }}>
                {pincodeAddress}
              </Text>
            )}
          </>
        )}
        <TouchableOpacity
          onPress={() => {
            requestLocationPermission();
            // getCurrentPosition();
          }}
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 12}}>
          <Icon name="location-outline" size={20} color="#0249bd" />
          <Text style={{fontFamily: appFonts.Poppins, color: '#0249bd'}}>
            Use my current location
          </Text>
        </TouchableOpacity>
        {/* <Text>lat:{currentLatitude}</Text>
        <Text>lan:{currentLongitude}</Text> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  pincodeInput: {
    borderBottomWidth: 1,
    borderBottomColor: appColors.borderColor,
    width: '70%',
    paddingVertical: 3,
  },
  submit: {
    backgroundColor: appColors.appRed,
    marginStart: '3%',
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 3,
  },
});

export default CheckDeliveryAdress;
