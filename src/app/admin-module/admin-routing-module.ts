import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodItemResolver } from './resolves/food-items/food-items.resolve';
import { FoodItemsListComponent } from './components/food-items-list/food-items-list.component';
import { AdminLayoutComponent } from '../core-module/components/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from '../core-module/services/auth-guard/auth-guard.service';
import { AddFoodItemFormComponent } from './components/add-food-item-form/add-food-item-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { NotFound404Component } from './../shared-module/components/404/not-found-404.component';
import { UserDataResolver } from './resolves/user-data/user-data.resolve';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrdersResolver } from './resolves/orders/orders.resolve';
import { AdminOrderDetailCardComponent } from './components/admin-order-detail-card/admin-order-detail-card.component';

const routes: Routes = [
  {
    path: 'admin-dashboard',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'add-food-items', component: AddFoodItemFormComponent, resolve: { foodItemList: FoodItemResolver } },
      { path: 'add-food-items/:id', component: AddFoodItemFormComponent },
      { path: 'user-list', component: UserListComponent, resolve: { userList: UserDataResolver } },
      { path: 'food-items-list', component: FoodItemsListComponent, resolve: { foodItemList: FoodItemResolver} },
      { path: 'orders-list', component: OrderListComponent, resolve: { orders: OrdersResolver} },
      { path: 'orders-list/:id', component: AdminOrderDetailCardComponent },
      { path: '**', component: NotFound404Component },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class AdminRoutingModule { }
