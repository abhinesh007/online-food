import { ShopDataService } from './../../services/shop-data/shop-data.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-food-shop-container',
  templateUrl: './food-shop-container.component.html',
  styleUrls: ['./food-shop-container.component.scss']
})
export class FoodShopContainerComponent implements OnInit {

  @Input() index: any;
  filteredObjectKeys = (object) => { if (object) { return Object.keys(object).filter(key => key !== 'items'); } };
  objectKeys = (object) => { if (object) { return Object.keys(object); } };
  public model: any;

  constructor(
    private shopDataService: ShopDataService
  ) { this.model = this.shopDataService.model; }



  private getShopData(): void {
    this.shopDataService.getShopData().subscribe((shopData: any) => {
      if (shopData) {
        console.log(shopData);
        // this.shopDataService.extractFoodCategories();
        // this.shopDataService.extractFoodItemList();
      }
    }, (error: any) => {
      console.log('Something went wrong! Here\'s the error: ', error);
    });
  }

  private getRealShopData(): void {
    this.shopDataService.getRealShopData().subscribe((shopData: any) => {
      if (shopData) {
        console.log(shopData);
        // this.shopDataService.createFoodCatalog();
      }
    }, (error: any) => {
      console.log('Something went wrong! Here\'s the error: ', error);
    });
  }

  ngOnInit() {
    this.model = this.shopDataService.model;
    this.getShopData();
    this.getRealShopData();
  }

}
