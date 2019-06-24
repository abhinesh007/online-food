import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart-service/cart-service.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {
  
  public order;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.order = this.cartService.model.currentOrder;
  }

}
