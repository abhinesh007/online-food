import { CATEGORY_LIST } from './../../../admin-module/model/food-item.model';
import { ShopDataService } from './../../services/shop-data/shop-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-food-category-list',
  templateUrl: './food-category-list.component.html',
  styleUrls: ['./food-category-list.component.scss']
})
export class FoodCategoryListComponent implements OnInit {
  prevEl;
  list = this.shopDataService.model;
  isCollapsed = true;
  categories = CATEGORY_LIST;

  constructor(
    private shopDataService: ShopDataService
  ) { }


  scroll(id) {
    const el = document.getElementById(id);
    if (this.prevEl) {
      this.prevEl.style.marginTop = '0px';
    }
    el.scrollIntoView({ behavior: 'smooth' });
    el.style.marginTop = '85px';
    this.prevEl = el;

  }

  ngOnInit() {
  }

}
