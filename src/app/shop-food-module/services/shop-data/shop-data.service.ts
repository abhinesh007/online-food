import { API_URLS } from './../../../core-module/apiUrls';
import { CATEGORY_LIST } from './../../../admin-module/model/food-item.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpService } from './../../../shared-module/services/http/http.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShopDataService {

  public menuData = {
    items:
      [
        {
          id: 1001,
          name: 'Veg Fried Rice',
          category: 'Main Course',
          description: 'Veg Fried Rice',
          recommended: 0,
          inStock: 1,
          isVeg: 1,
          price: 70
        },
        {
          id: 1002,
          name: 'Singapore Rice',
          category: 'Main Course',
          description: 'Singapore Rice',
          recommended: 0,
          inStock: 1,
          isVeg: 1,
          price: 80
        },
        {
          id: 1003,
          name: 'Chicken Schezwan Rice',
          category: 'Main Course',
          description: 'Chicken Schezwan Rice',
          recommended: 0,
          inStock: 1,
          isVeg: 0,
          price: 90
        },
        {
          id: 1004,
          name: 'Veg Hakka Noodles',
          category: 'Main Course',
          description: 'Veg Hakka Noodles',
          recommended: 0,
          inStock: 1,
          isVeg: 1,
          price: 100
        }
      ]
  };

  public model: any = {
    shopData: {},
    shopRealData: {},
    foodCategoryList: CATEGORY_LIST,
    foodCatalog: [],
    foodItemMasterList: {}
  };

  constructor(
    private httpService: HttpService
  ) { }

  public getDummyShopData(): any {
    // const url = 'http://localhost:5000/api/v1/shop';
    return this.httpService.get<{}>(API_URLS.shop, null, null, null)
      .pipe(
        map((shopData: any) => {
          if (shopData) {
            console.log(shopData);
            this.model.shopData = shopData;
            return shopData;
          }
        }),
        catchError((error: any) => {
          console.log('Something went wrong! Here\'s the error: ', error);
          return of();
        })
      );
  }

  public getRealShopData(): any {
    // const url = 'http://localhost:5000/api/v1/shop/data/categorywise';
    return this.httpService.get<{}>(API_URLS.getShopItemsCategorywise, null, null, null)
      .pipe(
        map((shopRealData: any) => {
          if (shopRealData) {
            console.log('shopRealData', shopRealData);
            this.model.shopRealData = shopRealData.shopFormattedData;
            return shopRealData;
          }
        }),
        catchError((error: any) => {
          console.log('Something went wrong! Here\'s the error: ', error);
          return of();
        })
      );
  }

  public extractFoodCategories(): Array<any> {
    if (!this.model.shopData && Object.keys(this.model.shopData).length < 1) { return []; }
    this.model.foodCategoryList = this.model.shopData.menu.widgets;
    return this.model.foodCategoryList;
  }

  public extractFoodItemList(): Array<any> {
    if (!this.model.shopData && Object.keys(this.model.shopData).length < 1) { return []; }
    this.model.foodItemMasterList = this.model.shopData.menu.items;
    return this.model.foodItemMasterList;
  }

  // https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_366,h_240,c_fill/ddf5abhu4qenokirw6yk

}
