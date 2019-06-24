import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-order-card',
  templateUrl: './admin-order-card.component.html',
  styleUrls: ['./admin-order-card.component.scss']
})
export class AdminOrderCardComponent implements OnInit {

  @Input() orderData: any = {};

  constructor() { }

  ngOnInit() {
    console.log('orderData', this.orderData);
  }

}
