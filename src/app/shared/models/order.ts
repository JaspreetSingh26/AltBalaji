import { ShoppingCart } from './shopping-cart';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

export class Order {
  datePlaced: number;
  items: any[];

  constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
    this.datePlaced = new Date().getTime();

    this.items = shoppingCart.items.map(i => {
      return {
        product: {
          title: i.product.title,
          imageUrl: i.product.imageUrl,
          price: i.product.price
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice
      }
    })    

    // shoppingCart.pipe(map(s => {
    //   this.items = s.items.map(i => {
    //     return {
    //       product: {
    //         title: i.product.title,
    //         imageUrl: i.product.imageUrl,
    //         price: i.product.price
    //       },
    //       quantity: i.quantity,
    //       totalPrice: i.totalPrice
    //     };
    //   });
    // }));
  }
}
