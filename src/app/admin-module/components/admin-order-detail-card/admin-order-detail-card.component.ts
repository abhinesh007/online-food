import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AdminDataService } from '../../services/admin-data.service';
import { ORDER_STATUS } from '../../model/order.model';
import { WindowService } from 'src/app/shared-module/services/window/window.service';

@Component({
  selector: 'app-admin-order-detail-card',
  templateUrl: './admin-order-detail-card.component.html',
  styleUrls: ['./admin-order-detail-card.component.scss']
})
export class AdminOrderDetailCardComponent implements OnInit {
  
  public currOrderId
  public order;
  public orderStatus = ORDER_STATUS;
  public editModeCart = false;
  public currentOrderStatus = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminDataService: AdminDataService,
    private windowService: WindowService
  ) { }

  
  changeOrderStatus(event) {
    this.order.orderStatus = event.orderStatus;
  }
  
  back() {
    this.windowService.history.back();
  }
  
  acceptOrder() {
    this.currentOrderStatus = this.orderStatus[1];
    this.updateOrderStatus();
  }

  deleteOrder() {
    this.adminDataService.deleteSingleOrder(this.currOrderId)
    .subscribe((res: any) => {
      if (res.orders) {
        this.adminDataService.model.orders = res.orders;
        this.back();
      }
    });
  }

  updateOrderStatus() {
    this.order.orderStatus = this.currentOrderStatus;
    this.adminDataService.updateSingleOrder(this.order)
    .subscribe((res: any) => {
      if (res.order) {
        this.order = res.order;
        this.adminDataService.model
        .orders[this.adminDataService.findOrderIndex(this.currOrderId)] = res.order;
        this.back();
      }
    })
  }

  editCart() {
    this.editModeCart = true;
  }

  ngOnInit() {
    this.currOrderId = this.activatedRoute.snapshot.params['id'];
    this.order = this.adminDataService.findOrder(this.currOrderId);
    this.currentOrderStatus = this.order.orderStatus;

    this.adminDataService.fetchSingleOrder(this.currOrderId)
    .subscribe((res: any) => {
      if (res.order) {
        this.order = res.order;
        this.adminDataService.model
        .orders[this.adminDataService.findOrderIndex(this.currOrderId)] = res.order;
      }
    });
  }

}
