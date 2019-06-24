import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../../services/cart-service/cart-service.service';
import { UserLoginHandlerService } from 'src/app/core-module/services/user-login-handler/user-login-handler.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  @Input() userSavedAddress: any;
  @Output() showShippingForm = new EventEmitter();
  @Output() addressSelection = new EventEmitter();
  

  constructor(
    private cartService: CartService,
    private userLoginHandlerService: UserLoginHandlerService
  ) { }
  
  enableShippingFormStatus() {
    this.showShippingForm.emit(true);
  }

  navigateToPayment() {
    this.addressSelection.emit(this.userSavedAddress);
  }

  ngOnInit() {
  }

}
