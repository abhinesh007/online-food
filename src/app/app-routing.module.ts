
import { UserLayoutComponent } from './core-module/components/user-layout/user-layout.component';
import { AdminLayoutComponent } from './core-module/components/admin-layout/admin-layout.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NotFound404Component } from './shared-module/components/404/not-found-404.component';
import { CheckoutContainerComponent } from './cart-module/component/checkout-container/checkout-container.component';
import { LoginComponent } from './core-module/components/login/login.component';
import { OrderConfirmationComponent } from './cart-module/component/order-confirmation/order-confirmation.component';
import { PaymentFormComponent } from './cart-module/component/payment-form/payment-form.component';

import { AuthGuard } from './core-module/services/auth-guard/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      // { path: 'checkout', component: CheckoutContainerComponent, data: { animation: 'checkout' }},
      { path: 'payment', component: PaymentFormComponent, data: { animation: 'payment' } },
      { path: 'confirmation', component: OrderConfirmationComponent, data: { animation: 'confirmation' } },

      { path: 'checkout', component: CheckoutContainerComponent, canActivate: [AuthGuard]  },
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: 'admin-dashboard',
    redirectTo: '/admin-dashboard'
  },
  // {
  //   path: 'admin-dashboard/user-list',
  //   component: UserListComponent,
  // },
  {
    path: '**',
    component: NotFound404Component
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
