import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$;
  // shoppingCartItemCount: number;
  // totalPrice: number;

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    // this.cart$.subscribe(cart => {
    //   this.shoppingCartItemCount = 0;
    //   this.totalPrice = 0;
    //   try {
    //     for (let productId in cart.items) {
    //       this.shoppingCartItemCount += cart.items[productId].quantity;
    //       this.totalPrice += cart.items[productId].quantity * cart.items[productId].product.price;
    //     }
    //   } catch (e) {
    //     this.shoppingCartItemCount = 0;
    //   }
    // });
  }
  clearCart(){
    this.shoppingCartService.clearCart();
  }
}
