import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiniCartComponent } from './component/mini-cart/mini-cart.component';
import { MiniCartInineItemComponent } from './component/mini-cart-inine-item/mini-cart-inine-item.component';
import { CheckoutContainerComponent } from './component/checkout-container/checkout-container.component';
import { RouterModule } from '@angular/router';
import { ShippingFormComponent } from './component/shipping-form/shipping-form.component';
import { PaymentFormComponent } from './component/payment-form/payment-form.component';
import { OrderConfirmationComponent } from './component/order-confirmation/order-confirmation.component';
import { FormsModule } from '@angular/forms';
import { AddressComponent } from './component/address/address.component';
import { ReviewOrderComponent } from './component/review-order/review-order.component';
import { AdminNbStyleModule } from '../admin-module/admin-nb-style.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AdminNbStyleModule
  ],
  declarations: [
    MiniCartComponent,
    MiniCartInineItemComponent,
    CheckoutContainerComponent,
    ShippingFormComponent,
    PaymentFormComponent,
    OrderConfirmationComponent,
    AddressComponent,
    ReviewOrderComponent
  ],
  exports: [
    MiniCartComponent,
    MiniCartInineItemComponent,
    CheckoutContainerComponent,
    ShippingFormComponent,
    PaymentFormComponent,
    OrderConfirmationComponent,
    AddressComponent,
    ReviewOrderComponent
  ]
})
export class CartModule { }
