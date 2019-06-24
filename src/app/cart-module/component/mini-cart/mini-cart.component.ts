import { Component, OnInit, Input } from '@angular/core';

import { CartService } from '../../services/cart-service/cart-service.service';

@Component({
  selector: 'app-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.scss']
})
export class MiniCartComponent implements OnInit {

  public cartItems: any = [];
  public cartTotal: any = {};
  public isCartEmpty = false;

  @Input() checkoutBtn: any;

  constructor(
    private cartService: CartService,
  ) { }

  public calculateCartValue() {
    this.cartTotal = this.cartService.calculateCartTotal();
    this.isCartEmpty = 1 > this.cartItems ;
  }


  ngOnInit() {
    this.cartItems = this.cartService.returnCartItems();
    this.cartService.cartItemChangeSubject.subscribe((items) => {
      this.cartItems = items;
      this.calculateCartValue();
    });
    this.calculateCartValue();
    this.isCartEmpty = 1 > this.cartItems ;
  }

}
