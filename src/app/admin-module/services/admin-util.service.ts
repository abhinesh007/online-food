import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { WindowService } from 'src/app/shared-module';

@Injectable({
  providedIn: 'root'
})

export class AdminUtilService {

  vegItemIdArr;
  nonVegItemIdArr;
  foodItemIdArr;
  STORE_ID = 11;

  constructor(
    private nbToastrService: NbToastrService,
    private windowService: WindowService,
  ) { }

  public showToast(message, itemId?, position?) {
    let msg;
    let includeItemId;

    if (!position) {
      position = 'top-end';
    }
    if (itemId) {
      includeItemId = `${itemId}`;
    } else {
      includeItemId = '';
    }
    switch (message) {
      case 'updated': {
        msg = `Update Successfully for Id: ${includeItemId} !`;
        break;
      }
      case 'created': {
        msg = `Created Successfully with Id: ${includeItemId} !`;
        break;
      }
      case 'deleted': {
        msg = `Deleted Successfully Id: ${includeItemId} !`;
        break;
      }
      case 'error': {
        msg = `Something went wrong!`;
        break;
      }
      default: {
        break;
      }
    }
    this.nbToastrService.show(
      '',
      msg,
      { position });
  }

  public generateRestId() {
    const letters = 'ABCDEFGHJKMNPQRSTUXY';
    let text = '';
    for (let i = 0; i < 5; i++) {
      text += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return '011-' + text;
  }

  public calcLargestVegId(foodItemList) {
    if (!foodItemList) {
      return;
    } else {
      this.getfoodItemsId(foodItemList);
      this.vegItemIdArr = this.foodItemIdArr.filter((elem) => {
        return elem > 1000 && elem < 2000;
      });
      return this.vegItemIdArr.reduce((id, item) => {
        return Math.max(id, item);
      });
    }
  }

  public calcLargestNonVegId(foodItemList) {
    if (!foodItemList) {
      return;
    } else {
      if (this.foodItemIdArr) {
        this.nonVegItemIdArr = this.foodItemIdArr.filter((elem) => {
          return elem > 2000;
        });
        return this.nonVegItemIdArr.reduce((id, item) => {
          return Math.max(id, item);
        });
      } else {
        this.getfoodItemsId(foodItemList);
      }

    }
  }

  public getfoodItemsId(foodItemList) {
    this.foodItemIdArr = foodItemList.map((item) => {
      return item.id - this.STORE_ID * 10000;
    });
  }

  public back(): void {
    this.windowService.history.back();
    this.windowService.document.gotoTop();
  }
}
