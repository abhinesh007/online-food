import { CartService } from './../../services/cart-service/cart-service.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mini-cart-inine-item',
  templateUrl: './mini-cart-inine-item.component.html',
  styleUrls: ['./mini-cart-inine-item.component.scss']
})
export class MiniCartInineItemComponent implements OnInit {

  @Input() item: any;
  @Input() showBtns: boolean;

  public cartItems: any;
  public itemData: any = {};
  // private foodItemMasterList: any;

  constructor(
    private cartService: CartService
  ) { }


  public incrementItemQty() {
    this.cartService.incrementItemQtyInCart(this.item);
  }

  public decrementItemQty() {
    this.cartService.decrementItemQtyInCart(this.item);
  }

  ngOnInit() {
    // this.foodItemMasterList = this.cartService.model.foodItemMasterList;
   // this.cartItems = this.cartService.returnCartItems();
    // this.item.name = this.cartService.model.foodItemMasterList[this.item.menu_item_id].name;
    // this.item.price = this.cartService.model.foodItemMasterList[this.item.menu_item_id].price;
   
      this.item.quantity =  this.item.quantity || this.cartService.getParticularItemsQuantity(this.item);
    
  }

}
