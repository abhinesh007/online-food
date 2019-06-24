import { Component, OnInit, Input } from '@angular/core';
import { ShopDataService } from '../../services/shop-data/shop-data.service';
import { CartService } from 'src/app/cart-module/services/cart-service/cart-service.service';

@Component({
  selector: 'app-food-item-list',
  templateUrl: './food-item-list-elem.component.html',
  styleUrls: ['./food-item-list-elem.component.scss']
})

export class FoodItemListComponent implements OnInit {

  @Input() item: any;
  private quantity = 0;

  public itemCountInCart = 0;
  public itemData: any = {};
  public title;

  constructor(
    private shopDataService: ShopDataService,
    private cartService: CartService
  ) { }

  public incrementItemQty() {
    // this.quantity++;
    this.cartService.incrementItemQtyInCart(this.itemData);
    this.itemCountInCart = this.getThisItemCount();
  }

  public decrementItemQty() {
    // this.quantity--;
    this.cartService.decrementItemQtyInCart(this.itemData);
    this.itemCountInCart = this.getThisItemCount();
  }

  public addToCart() {

    if (this.itemData && Object.keys(this.itemData).length > 0) {
      this.itemData.quantity++;
      this.cartService.setItemInCart(this.itemData);
    }
    this.itemCountInCart = this.getThisItemCount();
  }

  private getThisItemCount() {
    return this.cartService.getParticularItemsQuantity(this.itemData);
  }

  ngOnInit() {
    this.itemData = this.item;
    this.title = (!this.itemData.inStock || !this.itemData.enabled) ? 'Currently out of Stock': this.itemData.name
    this.itemCountInCart = this.cartService.getParticularItemsQuantity(this.itemData);
    this.cartService.cartItemChangeSubject.subscribe((items) => {
      this.itemCountInCart = this.getThisItemCount();
    });
  }
}
