import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { HttpService } from './../../shared-module/services/http/http.service';
import { UserLoginHandlerService } from './../../core-module/services/user-login-handler/user-login-handler.service';
import { IFoodItem } from './../model/food-item.model';
import { NbToastrService } from '@nebular/theme';
import { AdminUtilService } from './admin-util.service';

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
    selectedOrder:{}
  };

  public header: any = {
    'Content-Type': 'application/json'
  };

  constructor(
    private httpService: HttpService,
    private userLoginHandlerService: UserLoginHandlerService,
    private adminUtilService: AdminUtilService
  ) { }


  public getShopData(): Observable<{}> {
    const loginApiUrl = 'http://localhost:5000/api/v1/users';
    const header = {
      authorization: `Bearer ${this.userLoginHandlerService.model.loggedInUserData.token}`
    };
    return this.httpService.get<{}>(loginApiUrl, header, null, null)
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
    const url = 'http://localhost:5000/api/v1/shop/data';
    // const header = {
    //   authorization: `Bearer ${this.userLoginHandlerService.model.loggedInUserData.token}`
    // };
    return this.httpService.get<{}>(url, null, null, null)
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
    const url = 'http://localhost:5000/api/v1/shop';
    return this.httpService.post<{}>(url, this.header, null, itemsData);
  }

  public updateFoodItem(itemData: IFoodItem | any): Observable<{}> {
    const url = 'http://localhost:5000/api/v1/shop/update';
    return this.httpService.post<{}>(url, this.header, null, itemData);
  }

  public deleteFoodItem(itemData: IFoodItem | any): Observable<{}> {
    const url = 'http://localhost:5000/api/v1/shop/delete';
    return this.httpService.post<{}>(url, this.header, null, itemData);
  }


  public fetchAllOrders() {
    const url = 'http://localhost:5000/api/v1/get/all/orders';
    const header = {
      authorization: `Bearer ${this.userLoginHandlerService.model.loggedInUserData.token}`,
      'Content-Type': 'application/json'
    };
    return this.httpService.get<{}>(url, header, null, null)
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
    const url = `http://localhost:5000/api/v1/get/order/${orderId}`;
    const header = {
      authorization: `Bearer ${this.userLoginHandlerService.model.loggedInUserData.token}`,
      'Content-Type': 'application/json'
    };
    return this.httpService.get<{}>(url, header, null, null)
    .pipe(
      map((res: any) => {
        if (res) {
          this.model.selectedOrder = res.order;
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
    const url = `http://localhost:5000/api/v1/delete/order/${orderId}`;
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
    const url = `http://localhost:5000/api/v1/update/order`;
    const header = {
      authorization: `Bearer ${this.userLoginHandlerService.model.loggedInUserData.token}`,
      'Content-Type': 'application/json'
    };
    return this.httpService.post<{}>(url, header, null, orderData)
    .pipe(
      map((res: any) => {
        if (res.order) {
          this.model.selectedOrder = res.order;
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