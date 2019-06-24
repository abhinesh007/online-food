import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {

  @Output() paymentSelection = new EventEmitter();

  constructor() { }

  navigateToReviewOrder(paymentForm) {
    this.paymentSelection.emit(paymentForm.value);
  }

  ngOnInit() {
  }

}
