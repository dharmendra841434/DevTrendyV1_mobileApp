import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome6Pro';
import {
  AccountStack,
  CartStack,
  CategoryStack,
  HomeStack,
  NotificationStack,
} from './stackNavigation';
import appColors from '../utils/appColors';
import CartScreen from '../screens/cart/CartScreen';
import appFonts from '../utils/appFonts';
import {useDispatch, useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const cartItems = useSelector(state => state?.app?.cartItems);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 1,
          // borderTopColor: theme == 'dark' ? 'gray' : AppColors.notification,
          // backgroundColor:
          //   theme == 'dark' ? AppColors.darkbg : AppColors.primary,
          height: 60,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          paddingBottom: 5,
          fontFamily: appFonts.Poppins,
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: appColors.appRed,
        tabBarInactiveTintColor: appColors.appGray,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="home-outline"
              size={25}
              color={focused ? appColors.appRed : appColors.appGray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={CategoryStack}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="grid-outline"
              size={25}
              color={focused ? appColors.appRed : appColors.appGray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationStack}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="notifications-outline"
              size={25}
              color={focused ? appColors.appRed : appColors.appGray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountStack}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="person-outline"
              size={25}
              color={focused ? appColors.appRed : appColors.appGray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Icon
                name="cart-outline"
                size={25}
                color={focused ? appColors.appRed : appColors.appGray}
              />
              {cartItems?.length > 0 && (
                <View
                  style={{
                    backgroundColor: appColors.appRed,
                    position: 'absolute',
                    height: 20,
                    width: 20,
                    borderRadius: 20,
                    right: -15,
                    top: -5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: appColors.appWhite,
                      fontFamily: appFonts.Poppins,
                    }}>
                    {cartItems?.length}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
