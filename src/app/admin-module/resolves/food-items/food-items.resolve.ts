import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AdminDataService } from '../../services/admin-data.service';

@Injectable()
export class FoodItemResolver implements Resolve<any> {

  constructor(
   private adminDataService: AdminDataService
  ) { }

  resolve() {
    return this.adminDataService.getFoodItems();
  }
}
