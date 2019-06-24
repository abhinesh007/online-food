import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CartModule } from '../cart-module/cart.module';

import { FoodCategoryListComponent } from './components/food-category-list/food-category-list.component';
import { FoodItemListComponent } from './components/food-item-list-elem/food-item-list-elem.component';
import { FoodItemCardComponent } from './components/food-item-card/food-item-card.component';
import { FoodShopContainerComponent } from './components/food-shop-container/food-shop-container.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NbMenuModule } from '@nebular/theme';



@NgModule({
  imports: [
    CommonModule,
    CartModule,
    RouterModule,
    NgbModule,
    NbMenuModule
  ],
  declarations: [
    FoodCategoryListComponent,
    FoodItemListComponent,
    FoodItemCardComponent,
    FoodShopContainerComponent
  ],
  exports: [
    FoodCategoryListComponent,
    FoodItemListComponent,
    FoodItemCardComponent,
    FoodShopContainerComponent
  ]
})
export class ShopFoodModule { }
