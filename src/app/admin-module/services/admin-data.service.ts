import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { HttpService } from './../../shared-module/services/http/http.service';
import { UserLoginHandlerService } from './../../core-module/services/user-login-handler/user-login-handler.service';
import { IFoodItem } from './../model/food-item.model';
import { NbToastrService } from '@nebular/theme';
import { AdminUtilService } from './admin-util.service';
import { API_URLS } from './../../core-module/apiUrls';

@Injectable({
  providedIn: 'root'
})

export class AdminDataService {

  public model: any = {
    userList: [],
    foodItemList: [],
    largestVegId: 0,
    largestNonVegId: 0,
    orders: [],
    currentOrder:{}
  };

  public header: any = {
    'Content-Type': 'application/json'
  };

  public tokenHeader = {
    authorization: `Bearer ${this.userLoginHandlerService.model.loggedInUserData.token}`,
    'Content-Type': 'application/json'
  };

  constructor(
    private httpService: HttpService,
    private userLoginHandlerService: UserLoginHandlerService,
    private adminUtilService: AdminUtilService
  ) { }


  public getUsers(): Observable<{}> {

    const header = {
      authorization: `Bearer ${this.userLoginHandlerService.model.loggedInUserData.token}`
    };
    return this.httpService.get<{}>(API_URLS.users, header, null, null)
      .pipe(
        map((userData: any) => {
          if (userData) {
            console.log(userData);
            this.model.userList = userData.userList;
            return userData;
          }
        }),
        catchError((error: any) => {
          console.log('Something went wrong! Here\'s the error: ', error);
          return of();
        })
      );
  }

  public getFoodItems(): Observable<{}> {
   // const url = 'http://localhost:5000/api/v1/shop/data';
    // const header = {
    //   authorization: `Bearer ${this.userLoginHandlerService.model.loggedInUserData.token}`
    // };
    return this.httpService.get<{}>(API_URLS.getShopItems, null, null, null)
      .pipe(
        map((foodItems: any) => {
          if (foodItems) {
            console.log(foodItems);
            this.model.foodItemList = foodItems.shopItems;
            this.model.largestVegId = this.adminUtilService.calcLargestVegId(this.model.foodItemList);
            this.model.largestNonVegId = this.adminUtilService.calcLargestNonVegId(this.model.foodItemList);
            return this.model.foodItemList;
          }
        }),
        catchError((error: any) => {
          console.log('Something went wrong! Here\'s the error: ', error);
          return of();
        })
      );
  }

  public createFoodItems(itemsData: IFoodItem[] | any): Observable<{}> {
    // const url = 'http://localhost:5000/api/v1/shop';

    return this.httpService.post<{}>(API_URLS.shop, this.header, null, itemsData);
  }

  public updateFoodItem(itemData: IFoodItem | any): Observable<{}> {
    // const url = 'http://localhost:5000/api/v1/shop/update';
    return this.httpService.post<{}>(API_URLS.updateShopItem, this.tokenHeader, null, itemData);
  }

  public deleteFoodItem(itemData: IFoodItem | any): Observable<{}> {
    // const url = 'http://localhost:5000/api/v1/shop/delete';
    return this.httpService.post<{}>(API_URLS.deleteShopItem, this.tokenHeader, null, itemData);
  }


  public fetchAllOrders() {
    // const url = 'http://localhost:5000/api/v1/get/all/orders';
    const header = {
      authorization: `Bearer ${this.userLoginHandlerService.model.loggedInUserData.token}`,
      'Content-Type': 'application/json'
    };
    return this.httpService.get<{}>(API_URLS.getAllOrders, header, null, null)
    .pipe(
      map((res: any) => {
        if (res) {
          console.log('res.orders', res.orders);
          this.model.orders = res.orders;
          return res;
        }
      }),
      catchError((error: any) => {
        console.log('Something went wrong! Here\'s the error: ', error);
        return of();
      })
    );
  }

  public findOrder(id) {
    return this.model.orders.find((elem) => {
      return elem.orderId === id;
    });
  }
  public findOrderIndex(id) {
    return this.model.orders.findIndex((elem) => {
      return elem.orderId === id;
    });
  }

  public fetchSingleOrder(orderId) {
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

  public deleteSingleOrder(orderId) {
    // const url = `http://localhost:5000/api/v1/delete/order/${orderId}`;
    const url = `${API_URLS.deleteSingleOrder}${orderId}`;
    const header = {
      authorization: `Bearer ${this.userLoginHandlerService.model.loggedInUserData.token}`,
      'Content-Type': 'application/json'
    };
    return this.httpService.get<{}>(url, header, null, null)
    .pipe(
      map((res: any) => {
        if (res.orders) {
          this.model.orders = res.orders;
          return res;
        }
      }),
      catchError((error: any) => {
        console.log('Something went wrong! Here\'s the error: ', error);
        return of();
      })
    );
  }

  public updateSingleOrder(orderData) {
    // const url = `http://localhost:5000/api/v1/update/order`;
    return this.httpService.post<{}>(API_URLS.updateOrder, this.tokenHeader, null, orderData)
    .pipe(
      map((res: any) => {
        if (res.order) {
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
