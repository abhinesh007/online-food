import { CartService } from './../../../cart-module/services/cart-service/cart-service.service';
import { Component, OnInit, Input } from '@angular/core';
import { ShopDataService } from './../../services/shop-data/shop-data.service';

@Component({
  selector: 'app-food-item-card',
  templateUrl: './food-item-card.component.html',
  styleUrls: ['./food-item-card.component.scss']
})
export class FoodItemCardComponent implements OnInit {

  @Input() item: any;
  private quantity = 0;
  
  public itemCountInCart = 0;
  public itemData: any = {};
  public title;
 // public itemToCart: { menu_item_id: String, quantity: number } = { menu_item_id: '', quantity: this.quantity };

  constructor(
    private shopDataService: ShopDataService,
    private cartService: CartService
  ) { }

  public incrementItemQty() {
    this.cartService.incrementItemQtyInCart(this.itemData);
    this.itemCountInCart = this.getThisItemCount();
  }

  public decrementItemQty() {
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
