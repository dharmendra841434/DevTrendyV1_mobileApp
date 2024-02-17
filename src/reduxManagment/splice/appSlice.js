import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {userAPI} from './api';
import {calculateTotalPrice} from '../../utils/helper';

export const saveUserAddress = createAsyncThunk(
  'address',
  async (values, {dispatch, rejectWithValue}) => {
    try {
      dispatch(setSaveAddressLoader(true));
      const response = await userAPI.saveAddress(values);
      // console.log(response, 'saved address response');
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
      // console.log(response, 'all address response');
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
      // console.log(response, 'all address response');
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
      //console.log(response, 'all states response');
      dispatch(setAllCities(response?.data));
    } catch (error) {
      if (error.response) {
        return rejectWithValue({hasError: error.response.data.message});
      }
    }
  },
);
export const getListOfProducts = createAsyncThunk(
  'products',
  async (values, {dispatch, rejectWithValue}) => {
    try {
      dispatch(setProductListLoader(true));
      const response = await userAPI.getProductList();
      // console.log(response, 'all states response');
      dispatch(setProductListData(response?.data));
      dispatch(setProductListLoader(false));
    } catch (error) {
      dispatch(setProductListLoader(false));
      if (error.response) {
        return rejectWithValue({hasError: error.response.data.message});
      }
    }
  },
);

export const updateUserCartItems = createAsyncThunk(
  'user',
  async (values, {dispatch, rejectWithValue}) => {
    try {
      const {userId, cartItems} = values;
      //console.log(userId, cartItems, 'skudis');
      const response = await userAPI.updateUser(userId, {
        cartItems: cartItems,
      });
      // console.log(response, 'update response response');
    } catch (error) {
      if (error.response) {
        return rejectWithValue({hasError: error.response.data.message});
      }
    }
  },
);

export const getUserDetails = createAsyncThunk(
  'user',
  async (values, {dispatch, rejectWithValue}) => {
    try {
      console.log(values, 'token');
      const resData = await userAPI.getUserData(values);
      //console.log(resData, 'user response');
      dispatch(setUserData(resData?.user));
      dispatch(setLoginStatus(true));
      dispatch(setCartItemsData(resData?.user?.cartItems));
      dispatch(setTotalPrice(calculateTotalPrice(resData?.user?.cartItems)));
    } catch (error) {
      console.log(error);
      if (error.response) {
        return rejectWithValue({hasError: error.response.data.message});
      }
    }
  },
);
export const getUserOrders = createAsyncThunk(
  'user',
  async (values, {dispatch, rejectWithValue}) => {
    try {
      const resData = await userAPI.getOrdersData(values);
      //console.log(resData, 'user response');
      dispatch(setOrdersListData(resData?.orders));
    } catch (error) {
      console.log(error);
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
  productListLoader: false,
  ordersList: [],
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
    setProductListLoader: (state, action) => {
      state.productListLoader = action.payload;
    },
    setOrdersListData: (state, action) => {
      state.ordersList = action.payload;
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
  setProductListLoader,
  setOrdersListData,
} = appSlice.actions;

export default appSlice.reducer;
