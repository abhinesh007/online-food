import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart-service/cart-service.service';
import { UserLoginHandlerService } from 'src/app/core-module/services/user-login-handler/user-login-handler.service';

@Component({
  selector: 'app-checkout-container',
  templateUrl: './checkout-container.component.html',
  styleUrls: ['./checkout-container.component.scss']
})
export class CheckoutContainerComponent implements OnInit {

  public userSavedAddress: any;
  public showShippingForm = true;
  public showPaymentSection = false;
  public showReviewOrder = false;
  public showConfirmation = false;
  public isCartEmpty = true;
  public checkoutData = {
    shippingData: {},
    paymentData: {}
  };
  public model: any = {};

  constructor(
    private cartService: CartService,
    private userLoginHandlerService: UserLoginHandlerService
  ) {
    this.model = this.cartService.model;
  }


  shippingFormStatus($event) {
    this.showShippingForm = true;
  }

  addressSelectionHandler($event) {
    if ($event) {
      this.showPaymentSection = true;
      this.checkoutData.shippingData = $event;
      this.cartService.model.shippingData = this.checkoutData.shippingData;
    }
  }

  // newAddressSelectionHandler($event) {
  //   if ($event) {
  //     this.showPaymentSection = true;
  //     this.checkoutData.shippingData = $event;
  //     this.cartService.model.shippingData = this.checkoutData.shippingData;
  //   }
  // }

  paymentSelectionHandler($event) {
    if ($event) {
      this.showReviewOrder = true;
      this.checkoutData.paymentData = $event;
      this.cartService.model.paymentData = this.checkoutData.paymentData;

    }
  }

  editPaymentHandler($event) {
    this.showPaymentSection = true;
    this.showReviewOrder = false;
  }

  editAddressHandler($event) {
    this.showShippingForm = true;
    this.showPaymentSection = false;
    this.showReviewOrder = false;
  }

  submitOrder() {
    this.cartService.SubmitOrderToBackend()
      .subscribe((orderRes: any) => {
        if (orderRes.orderConfirmation) {
          this.cartService.model.currentOrder = orderRes.orderConfirmation;
          this.showShippingForm = false;
          this.showPaymentSection = false;
          this.showReviewOrder = false;
          this.showConfirmation = true;
          console.log('orderRes.orderConfirmation', orderRes.orderConfirmation);
        }
      });
  }

  ngOnInit() {
    this.model = this.cartService.model;
    this.cartService.getUserShippingAddress(this.userLoginHandlerService.model.loggedInUserData.uuid)
      .subscribe((res: any) => {
        if (res.address) {
          this.userSavedAddress = res.address;
          this.showShippingForm = false;
        }
      });

    this.isCartEmpty = (this.cartService.getCartItemsCount() < 1);
  }

}
