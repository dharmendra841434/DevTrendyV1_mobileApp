import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {userAPI} from './api';

export const saveUserAddress = createAsyncThunk(
  'address',
  async (values, {dispatch, rejectWithValue}) => {
    try {
      dispatch(setSaveAddressLoader(true));
      const response = await userAPI.saveAddress(values);
      console.log(response, 'saved address response');
      dispatch(setSaveAddressLoader(false));
    } catch (error) {
      if (error.response) {
        return rejectWithValue({hasError: error.response.data.message});
      }
    }
  },
);

export const getUserAddresses = createAsyncThunk(
  'address',
  async (values, {dispatch, rejectWithValue}) => {
    try {
      const response = await userAPI.getUserAddresses(values);
      console.log(response, 'all address response');
      dispatch(setUserAddresses(response?.addresses));
      dispatch(setUserSelectedAddress(response?.addresses[0]));
    } catch (error) {
      if (error.response) {
        return rejectWithValue({hasError: error.response.data.message});
      }
    }
  },
);

export const removeSingleAddress = createAsyncThunk(
  'address',
  async (values, {dispatch, rejectWithValue}) => {
    try {
      // console.log(values, ' this is from splice id');
      const response = await userAPI.removeAddress(values);
      console.log(response, 'all address response');
    } catch (error) {
      if (error.response) {
        return rejectWithValue({hasError: error.response.data.message});
      }
    }
  },
);
export const getStatesList = createAsyncThunk(
  'states',
  async (values, {dispatch, rejectWithValue}) => {
    try {
      const response = await userAPI.getAllStates(values);
      console.log(response, 'all states response');
      dispatch(setAllStates(response?.data));
    } catch (error) {
      if (error.response) {
        return rejectWithValue({hasError: error.response.data.message});
      }
    }
  },
);

export const getCitiesList = createAsyncThunk(
  'cities',
  async (values, {dispatch, rejectWithValue}) => {
    try {
      const response = await userAPI.getAllCities(values);
      console.log(response, 'all states response');
      dispatch(setAllCities(response?.data));
    } catch (error) {
      if (error.response) {
        return rejectWithValue({hasError: error.response.data.message});
      }
    }
  },
);

const initialState = {
  isLoading: false,
  adminDetails: null,
  productList: null,
  cartItems: [],
  totalPrice: 0,
  isLoggedIn: false,
  userData: null,
  userAddresses: [],
  addressesLoader: true,
  saveAddressLoader: false,
  allStatesList: [],
  allCitiesList: [],
  userSelectedAddress: null,
};
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    appLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setAdminDetails: (state, action) => {
      state.adminDetails = action.payload;
    },
    setProductListData: (state, action) => {
      state.productList = action.payload;
    },
    setCartItemsData: (state, action) => {
      state.cartItems = action.payload;
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    setLoginStatus: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setUserAddresses: (state, action) => {
      state.userAddresses = action.payload;
    },
    setSaveAddressLoader: (state, action) => {
      state.saveAddressLoader = action.payload;
    },
    setAddressesLoader: (state, action) => {
      state.addressesLoader = action.payload;
    },
    setUserSelectedAddress: (state, action) => {
      state.userSelectedAddress = action.payload;
    },
    setAllStates: (state, action) => {
      state.allStatesList = action.payload;
    },
    setAllCities: (state, action) => {
      state.allCitiesList = action.payload;
    },
  },
});
export const {
  setAdminDetails,
  appLoading,
  setProductListData,
  setCartItemsData,
  setTotalPrice,
  setLoginStatus,
  setUserData,
  setUserAddresses,
  setSaveAddressLoader,
  setAddressesLoader,
  setAllStates,
  setAllCities,
  setUserSelectedAddress,
} = appSlice.actions;

export default appSlice.reducer;
