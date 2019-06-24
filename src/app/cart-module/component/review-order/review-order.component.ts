import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-review-order',
  templateUrl: './review-order.component.html',
  styleUrls: ['./review-order.component.scss']
})
export class ReviewOrderComponent implements OnInit {

  @Input() shippingInfo: any;
  @Input() paymentInfo: any;

  @Output() editPayment = new EventEmitter();
  @Output() editAddress = new EventEmitter();


  constructor() { }

  
  navigateToPayment() {
    this.editPayment.emit('');
  }

  navigateToAddress() {
    this.editAddress.emit('');
  }

  ngOnInit() {
  }

}
