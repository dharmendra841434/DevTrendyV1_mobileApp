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
  //   getAllGames: async () => {
  //     return await axios.get(`${BASE_URL}/games`).then(res => res.data);
  //   },
  //   getGameRates: async () => {
  //     return await axios.get(`${BASE_URL}/game-rates`).then(res => res.data);
  //   },
  //   getBidHistory: async values => {
  //     const {fromDate, toDate} = values;
  //     return await axios
  //       .get(`${BASE_URL}/bid-history?fromDate=${fromDate}&toDate=${toDate}`)
  //       .then(res => res.data);
  //   },
  //   getDepositeHistory: async () => {
  //     return await axios.get(`${BASE_URL}/deposit-history`).then(res => res.data);
  //   },
  //   getWithdrawlHistory: async () => {
  //     return await axios
  //       .get(`${BASE_URL}/withdrawl-history`)
  //       .then(res => res.data);
  //   },
  //   getWinHistory: async () => {
  //     return await axios.get(`${BASE_URL}/win-history`).then(res => res.data);
  //   },
  //   getAllGamesRate: async () => {
  //     return await axios
  //       .get(`${BASE_URL}/get-all-games-jodi-harup-rate `)
  //       .then(res => res.data);
  //   },
  //   get24HoursBidHistory: async () => {
  //     return await axios.get(`${BASE_URL}/bid-history`).then(res => res.data);
  //   },

  //   todayBidRecords: async gameName => {
  //     return await axios
  //       .get(`${BASE_URL}/user-bid-records-today?game=${gameName}`)
  //       .then(res => res.data);
  //   },
  //   cancelBid: async bid_Id => {
  //     //alert(bid_Id);
  //     return await axios
  //       .delete(`${BASE_URL}/cancel-bid/${bid_Id}`)
  //       .then(res => res.data);
  //   },
  //   bidResult: async () => {
  //     //alert(bid_Id);
  //     return await axios.get(`${BASE_URL}/results`).then(res => res.data);
  //   },
  //   getNotifications: async () => {
  //     return await axios
  //       .get(`${BASE_URL}/my-notifications-list `)
  //       .then(res => res.data);
  //   },
};
