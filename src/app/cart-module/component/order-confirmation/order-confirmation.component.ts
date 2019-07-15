import { CartService } from './../../services/cart-service/cart-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NbStepperComponent } from '@nebular/theme';
import { Observable, interval } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {

  public order;
  public orderSub;
  public orderStatus = '';

  @ViewChild('stepper') stepper: NbStepperComponent;

  constructor(
    private cartService: CartService
  ) { }

  next() {
    this.stepper.next();
  }

  updateOrderStatus(status) {
    switch (status) {
      case 'pending': {
        this.orderStatus = 'Confirming';
        break;
      }
      case 'preparing': {
        if (this.orderStatus !== 'Preparing') { this.next(); }
        this.orderStatus = 'Preparing';
        break;
      }
      case 'oneTheWay': {
        if (this.orderStatus !== 'On the way') { this.next(); }
        this.orderStatus = 'On the way';
        this.next();
        break;
      }
      case 'delivered': {
        if (this.orderStatus !== 'Delivered') { this.next(); }
        this.orderStatus = 'Delivered';
        this.next();
        this.orderSub.unsubscribe();
        break;
      }
      case 'returned': {
        this.orderStatus = 'Returned';
        break;
      }
      default: {
        break;
      }
    }
  }

  ngOnInit() {
    this.order = this.cartService.model.currentOrder;
    const orderSub = interval(3000)
      .pipe(
        switchMap(() => this.cartService.fetchSingleOrder())
      )
      .subscribe((response: any) => {
        if (response.order) {
          this.cartService.model.currentOrder = response.order;
          this.updateOrderStatus(response.order.orderStatus);
          console.log('response.order', response.order);
        }
      });
  }

  ngOnDestroy() {
   // this.orderSub.unsubscribe();
  }


}
