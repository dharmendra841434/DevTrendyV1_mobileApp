import axios from 'axios';
import {BASE_URL} from '../../utils/base_Url';

export const userAPI = {
  saveAddress: async values => {
    return await axios
      .post(`${BASE_URL}/user/save-address`, values)
      .then(res => res.data);
  },
  getUserAddresses: async userID => {
    console.log(userID, 'userID');
    return await axios
      .get(`${BASE_URL}/user/addresses/${userID}`)
      .then(res => res.data);
  },

  removeAddress: async addressId => {
    // console.log(userID, 'userID');
    return await axios
      .delete(`${BASE_URL}/user/delete-address/${addressId}`)
      .then(res => res.data);
  },

  getAllStates: async values => {
    // console.log(userID, 'userID');
    return await axios
      .post(`${BASE_URL}/user/get-states`, values)
      .then(res => res.data);
  },

  getAllCities: async values => {
    return await axios
      .post(`${BASE_URL}/user/get-cities`, values)
      .then(res => res?.data);
  },
  getProductList: async () => {
    return await axios
      .get(`${BASE_URL}/product/products-list`)
      .then(res => res?.data);
  },

  updateUser: async (id, data) => {
    console.log(id, data);
    await axios
      .post(`${BASE_URL}/user/update/${id}`, data)
      .then(res => res?.data);
  },
  getUserData: async token => {
    //console.log(token);
    return await axios.get(`${BASE_URL}/user/${token}`).then(res => res?.data);
  },
  getOrdersData: async id => {
    //console.log(token);
    return await axios
      .get(`${BASE_URL}/order/order-list/${id}`)
      .then(res => res?.data);
  },
};
