import { Component, OnInit } from '@angular/core';
import { AdminDataService } from '../../services/admin-data.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  
  public orders = [];

  constructor(
    private adminDataService: AdminDataService
  ) { }

  ngOnInit() {
    this.orders = this.adminDataService.model.orders;
  }

}
