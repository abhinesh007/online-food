import { Injectable } from '@angular/core';
import { Subject, of } from 'rxjs';
import { v1 as uuid } from 'uuid';

import { ShopDataService } from 'src/app/shop-food-module/services/shop-data/shop-data.service';
import { UserLoginHandlerService } from './../../../core-module/services/user-login-handler/user-login-handler.service';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from './../../../shared-module/services/http/http.service';
import { API_URLS } from './../../../core-module/apiUrls';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  private cartItems: any = [];
  public cartItemCount: any;
  public cartItemChangeSubject = new Subject();
  public userData;
  public cartId = uuid();
  public model: any = {
    shippingData: {},
    paymentData: {},
    currentOrder: {}
  };

  constructor(
    private shopDataService: ShopDataService,
    private userLoginHandlerService: UserLoginHandlerService,
    private httpService: HttpService
  ) {
    this.model = this.shopDataService.model;
    this.userData = this.userLoginHandlerService.model.loggedInUserData;
  }

  public setItemInCart(item): void {
    if (!this.cartItems.includes(item)) {
      item.quantity = 1;
      this.cartItems.push(item);
      this.cartItemChangeSubject.next(this.cartItems);
      this.validateCartOnBackend()
        .subscribe((cartRes: any) => {
          if (cartRes) {
            console.log('cartRes', cartRes.cartResponse);
          }
        });
    } else {

    }
  }

  public returnCartItems(): any {
    return this.cartItems;
  }

  public getCartItemsCount(): any {
    return this.cartItems.length;
  }

  public getParticularItemsQuantity(queryItem): any {
    const indexOfSearchedElem = this.cartItems.findIndex(function (elem) {
      return elem.id === queryItem.id;
    });
    return indexOfSearchedElem === -1 ? 0 : this.cartItems[indexOfSearchedElem].quantity;
  }

  public incrementItemQtyInCart(item): void {
    const indexOfSearchedElem = this.cartItems.findIndex(function (elem) {
      return elem.id === item.id;
    });
    this.cartItems[indexOfSearchedElem].quantity++;
    this.cartItemChangeSubject.next(this.cartItems);
    this.validateCartOnBackend()
      .subscribe((cartRes: any) => {
        if (cartRes) {
          console.log('cartRes', cartRes.cartResponse);
        }
      });
  }

  public decrementItemQtyInCart(item): void {
    const indexOfSearchedElem = this.cartItems.findIndex(function (elem) {
      return elem.id === item.id;
    });
    this.cartItems[indexOfSearchedElem].quantity--;
    if (this.cartItems[indexOfSearchedElem].quantity === 0) {
      this.cartItems.splice(indexOfSearchedElem, 1);
    }
    this.cartItemChangeSubject.next(this.cartItems);
    this.validateCartOnBackend()
      .subscribe((cartRes: any) => {
        if (cartRes) {
          console.log('cartRes', cartRes.cartResponse);
        }
      });
  }

  public calculateCartTotal(): any {
    let cartPrice = 0, cartQuantity = 0;
    this.cartItems.forEach(item => {
      cartQuantity = cartQuantity + item.quantity;
      cartPrice = cartPrice + (item.quantity * item.price);
    });
    this.model.cartPrice = cartPrice;
    return { 'cartTotalPrice': cartPrice, 'cartTotalQuantity': cartQuantity };
  }

  public createCartMetaObject() {
    const cartMeta: any = {};
    cartMeta.isUserLoggedIn = this.userLoginHandlerService.model.isUserLoggedIn;
    cartMeta.userName = this.userLoginHandlerService.model.loggedInUserData.name;
    cartMeta.userUUID = this.userLoginHandlerService.model.loggedInUserData.uuid;
    cartMeta.cartItems = this.cartItems;
    cartMeta.promoCode = 'this.promoCode';  // Dummy for now
    cartMeta.storeId = 'this.storeId';
    cartMeta.storeName = 'this.storeId';
    cartMeta.cartId = this.cartId;
    return cartMeta;
  }

  public validateCartOnBackend() {
    // const loginApiUrl = 'http://localhost:5000/api/v1/cart';
    const userAvailableHeader = {
      authorization: `Bearer ${this.userLoginHandlerService.model.loggedInUserData.token}`
    };
    const noUserHeader = {
      authorization: `Bearer no user data available`
    };

    const header = (this.userLoginHandlerService.model.loggedInUserData.token) ? userAvailableHeader : noUserHeader;

    return this.httpService.post<{}>(API_URLS.cart, header, null, this.createCartMetaObject())
      .pipe(
        map((submitOrderResponse: any) => {
          if (submitOrderResponse) {
            console.log('submitOrderResponse', submitOrderResponse);
            this.model.finalCart = submitOrderResponse;
            return submitOrderResponse;
          }
        }),
        catchError((error: any) => {
          console.log('Something went wrong! Here\'s the error: ', error);
          return of();
        })
      );
  }

  public getUserShippingAddress(userUUID) {
    // const url = `http://localhost:5000/api/v1/get/address/${userUUID}`;
    const url = `${API_URLS.getAddress}${userUUID}`;
    const header = {
      authorization: `Bearer ${this.userLoginHandlerService.model.loggedInUserData.token}`
    };
    return this.httpService.get<{}>(url, header, null, null);

  }

  public saveUserShippingAddress(addressData) {
   // const url = `http://localhost:5000/api/v1//create/address`;

    const header = {
      authorization: `Bearer ${this.userLoginHandlerService.model.loggedInUserData.token}`,
      'Content-Type': 'application/json'
    };
    return this.httpService.post<{}>(API_URLS.createAddress, header, null, addressData);
  }

  public createSubmitOrderMetaObject() {
    const SubmitOrderMeta: any = {};
    SubmitOrderMeta.cartData = this.model.finalCart.cartResponse;
    SubmitOrderMeta.paymentData = this.model.paymentData;
    SubmitOrderMeta.shippingData = this.model.shippingData;
    // SubmitOrderMeta.orderId = uuid();
    SubmitOrderMeta.orderTime = Date.now();
    return SubmitOrderMeta;
  }

  public SubmitOrderToBackend() {
    // const loginApiUrl = 'http://localhost:5000/api/v1/create/order';
    const header = {
      authorization: `Bearer ${this.userLoginHandlerService.model.loggedInUserData.token}`,
      'Content-Type': 'application/json'
    };
    return this.httpService.post<{}>(API_URLS.createOrder, header, null, this.createSubmitOrderMetaObject())
      .pipe(
        map((submitOrderRes: any) => {
          if (submitOrderRes) {
            console.log('submitOrderRes', submitOrderRes.submitOrderResponse);
            this.model.currentOrder = submitOrderRes;
            return submitOrderRes;
          }
        }),
        catchError((error: any) => {
          console.log('Something went wrong! Here\'s the error: ', error);
          return of();
        })
      );
  }

  public fetchSingleOrder(orderId?) {
    orderId = orderId || this.model.currentOrder.orderId;
    // const url = `http://localhost:5000/api/v1/get/order/${orderId}`;
    const url = `${API_URLS.getSingleOrder}${orderId}`;
    const header = {
      authorization: `Bearer ${this.userLoginHandlerService.model.loggedInUserData.token}`,
      'Content-Type': 'application/json'
    };
    return this.httpService.get<{}>(url, header, null, null)
    .pipe(
      map((res: any) => {
        if (res) {
          this.model.currentOrder = res.order;
          return res;
        }
      }),
      catchError((error: any) => {
        console.log('Something went wrong! Here\'s the error: ', error);
        return of();
      })
    );
  }
}
