import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { Order } from 'shared/models/order';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('cart') cart: Observable<ShoppingCart>;
  cartObj:ShoppingCart;
  shipping: any = {};
  userSubscription: Subscription;
  userId: string;
  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() { 
    this.userSubscription.unsubscribe();
  }
  logob(p){ 
    console.log(p);
  }

  log(){
    this.cart.subscribe(cart => this.cartObj = cart);
    console.log(this.cartObj);
  }
  async placeOrder(cart) {
    let order = new Order(this.userId, this.shipping, cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

}
