import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/home/HomeScreen';
import NotificationScreen from '../screens/notification/NotificationScreen';
import AccountScreen from '../screens/accounts/AccountScreen';
import CartScreen from '../screens/cart/CartScreen';
import CategoryScreen from '../screens/category/CategoryScreen';
import ItemList from '../screens/category/ItemList';
import SearchScreen from '../screens/searchScreen/SearchScreen';
import ProductDetails from '../screens/productDetails/ProductDetails';
import SelectedCategory from '../screens/slectedCategory/SelectedCategory';
import OtpVerification from '../screens/OtpVerification/OtpVerification';
import NoInternet from '../screens/NoInternet';
import EditProfile from '../screens/editProfile/EditProfile';
import SavedAddress from '../screens/savedAddress/SavedAddress';
import AddNewAddress from '../screens/savedAddress/AddNewAddress';
import EditAddress from '../screens/savedAddress/EditAddress';
import BottomNavigation from './bottomNavigation';
import AllSuggestedProducts from '../screens/suggestedList/AllSuggestedProducts';
import ProccessOrder from '../screens/placeOrderProcess/ProccessOrder';
import Payments from '../screens/placeOrderProcess/Payments';
import OrderSuccessScreen from '../screens/placeOrderProcess/OrderSuccessScreen';
import OrdersList from '../screens/orders/OrdersList';
import OrderDetails from '../screens/orders/OrderDetails';

const Stack = createNativeStackNavigator();
const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="splash"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="home" component={BottomNavigation} />
        <Stack.Screen name="list" component={ItemList} />
        <Stack.Screen name="search" component={SearchScreen} />
        <Stack.Screen name="product_details" component={ProductDetails} />
        <Stack.Screen name="cart" component={CartScreen} />
        <Stack.Screen name="otp_verification" component={OtpVerification} />
        <Stack.Screen name="not_internet" component={NoInternet} />
        <Stack.Screen name="allSuggested" component={AllSuggestedProducts} />
        <Stack.Screen name="selectAddress" component={SavedAddress} />
        <Stack.Screen name="proccessOrder" component={ProccessOrder} />
        <Stack.Screen name="paymentPage" component={Payments} />
        <Stack.Screen name="orderSuccess" component={OrderSuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="selectedcategory" component={SelectedCategory} />
    </Stack.Navigator>
  );
};
const NotificationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="notification" component={NotificationScreen} />
    </Stack.Navigator>
  );
};

const AccountStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="account" component={AccountScreen} />
      <Stack.Screen name="edit_profile" component={EditProfile} />
      <Stack.Screen name="savedAddress" component={SavedAddress} />
      <Stack.Screen name="newAddress" component={AddNewAddress} />
      <Stack.Screen name="editAddress" component={EditAddress} />
      <Stack.Screen name="orders" component={OrdersList} />
      <Stack.Screen name="orderDetails" component={OrderDetails} />
    </Stack.Navigator>
  );
};

const CartStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

const CategoryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="category" component={CategoryScreen} />
    </Stack.Navigator>
  );
};

export {HomeStack, NotificationStack, CategoryStack, AccountStack, CartStack};

export default RootNavigation;
