import { Component, OnInit } from '@angular/core';
import { AdminDataService } from '../../services/admin-data.service';
@Component({
  selector: 'app-food-items-list',
  templateUrl: './food-items-list.component.html',
  styleUrls: ['./food-items-list.component.scss']
})

export class FoodItemsListComponent implements OnInit {

  model: any = {};

  constructor(
    private adminDataService: AdminDataService,
  ) { }

  ngOnInit() {
    this.model = this.adminDataService.model;
    console.log('this.model.foodItemList', this.model.foodItemList);
  }

}
