import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing-module';
import { AdminNbStyleModule } from './admin-nb-style.module';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { AdminSidenavComponent } from './components/admin-sidenav/admin-sidenav.component';
import { AddAdminUserFormComponent } from './components/add-admin-user-form/add-admin-user-form.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddFoodItemFormComponent } from './components/add-food-item-form/add-food-item-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDataResolver } from './resolves/user-data/user-data.resolve';
import { FoodItemsListComponent } from './components/food-items-list/food-items-list.component';
import { FoodItemResolver } from './resolves/food-items/food-items.resolve';
import { OrdersResolver } from './resolves/orders/orders.resolve';
import { OrderListComponent } from './components/order-list/order-list.component';
import { AdminOrderCardComponent } from './components/admin-order-card/admin-order-card.component';
import { CartModule } from '../cart-module/cart.module';
import { AdminOrderDetailCardComponent } from './components/admin-order-detail-card/admin-order-detail-card.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AdminRoutingModule,
    AdminNbStyleModule,
    CartModule,
  ],
  declarations: [
    AdminDashboardComponent,
    AddFoodItemFormComponent,
    AddAdminUserFormComponent,
    AdminSidenavComponent,
    UserListComponent,
    FoodItemsListComponent,
    AdminNavbarComponent,
    OrderListComponent,
    AdminOrderCardComponent,
    AdminOrderDetailCardComponent
  ],
  providers: [
    UserDataResolver,
    FoodItemResolver,
    OrdersResolver
  ],
  exports: [
    AdminDashboardComponent,
    AddFoodItemFormComponent,
    AddAdminUserFormComponent,
    AdminSidenavComponent,
    AdminNavbarComponent,
    UserListComponent,
    FoodItemsListComponent,
    AdminRoutingModule,
    OrderListComponent,
    AdminOrderCardComponent,
    AdminOrderDetailCardComponent
  ]
})
export class AdminModule { }
