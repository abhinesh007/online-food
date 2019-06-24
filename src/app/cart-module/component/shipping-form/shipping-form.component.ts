import { CartService } from './../../services/cart-service/cart-service.service';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations'
import { NgForm } from '@angular/forms';
import { UserLoginHandlerService } from 'src/app/core-module/services/user-login-handler/user-login-handler.service';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss'],
  // animations: [
  //   trigger('slideInOut', [
  //     transition(':enter', [
  //       style({transform: 'translateY(-100%)'}),
  //       animate('200ms ease-in', style({transform: 'translateY(0%)'}))
  //     ]),
  //     transition(':leave', [
  //       animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
  //     ])
  //   ])
  // ]
})
export class ShippingFormComponent implements OnInit {

public userSavedAddress;

  constructor(
    private cartService: CartService,
    private userLoginHandlerService: UserLoginHandlerService
  ) { }

  saveShippingDetails(shippingForm: NgForm) {
    console.log('form submitted shipping ', shippingForm);
  }

  submitCart() {
    this.cartService.validateCartOnBackend()
      .subscribe((cartRes: any) => {
        if (cartRes) {
          console.log('cartRes', cartRes.cartResponse);
        }
      });

  }

  saveUserAddress(addressData) {
    this.cartService.saveUserShippingAddress(addressData)
    .subscribe((res: any) => {
      if (res) {
        this.userSavedAddress = res.address;
      }
    });
  }

  ngOnInit() {
    this.cartService.getUserShippingAddress(this.userLoginHandlerService.model.loggedInUserData.uuid)
      .subscribe((res: any) => {
        if (res) {
          this.userSavedAddress = res.address;
        }
      });
  }

}
