import { environment } from './../../environments/environment';

export const API_URLS = {
  // API URLs ending with / require params, don't forget to append parmas
  // before sending the request

  users: environment.baseUrl + '/users',
  deleteUser: environment.baseUrl + '/user/delete',
  updateUser: environment.baseUrl + '/user/update',
  login: environment.baseUrl + '/login',

  shop: environment.baseUrl + '/shop',
  getShopItems: environment.baseUrl + '/shop/items',
  getShopItemsCategorywise: environment.baseUrl + '/shop/items/categorywise',
  updateShopItem: environment.baseUrl + '/shop/update',
  deleteShopItem: environment.baseUrl + '/shop/delete',

  createOrder: environment.baseUrl + '/create/order',
  getSingleOrder: environment.baseUrl + '/get/order/',
  deleteSingleOrder: environment.baseUrl + '/delete/order/',
  getUsersOrder: environment.baseUrl + '/get/userorder/',
  getAllOrders: environment.baseUrl + '/get/all/orders',
  updateOrder: environment.baseUrl + '/update/order',

  cart: environment.baseUrl + '/cart',

  createAddress: environment.baseUrl + '/create/address',
  getAddress: environment.baseUrl + '/get/address/',
};

