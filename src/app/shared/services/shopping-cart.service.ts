import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Product } from 'shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async addToCart(product) {
    this.updateItemQuantity(product, +1);
  }
  async removeFromCart(product) {
    this.updateItemQuantity(product, -1);
  }
  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }
  async getCarttry(): Promise<Observable<any>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges();
  }
  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges()
      .pipe(map(x => new ShoppingCart((x as any).items)));
  }
  async getItemsList() {
    let cartId = await this.getOrCreateCartId();
    return this.db.list('/shopping-carts/' + cartId + '/items').snapshotChanges();
  }
  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }
  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    } else {
      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }
  }
  private async updateItemQuantity(product, change: number) {

    await this.getOrCreateCartId().then(async resintern => {
      let itemref$ = this.getItem(resintern, product.key);
      let item$: Observable<any> = itemref$.snapshotChanges();
      item$.pipe(take(1)).subscribe(item => {
        let quantity = (item.payload.exists() ? item.payload.val().quantity : 0) + change;
        if (quantity === 0) {
          itemref$.remove();
        } else {
          let productObj = {
            product:
            {
              title: product.payload.val().title,
              price: product.payload.val().price,
              category: product.payload.val().category,
              imageUrl: product.payload.val().imageUrl
            },
            quantity
          };
          itemref$.update(productObj);
        }
      });
    });
  }

  //   private async updateItemQuantity(product: Product, change: number) {
  //     await this.getOrCreateCartId().then(async resintern => {
  //     let item$ = this.getItem(resintern, product.$key);
  //     item$.valueChanges().pipe(take(1)).subscribe(item => {
  //       let quantity = ((item as any).quantity || 0) + change;
  //       if (quantity === 0) { item$.remove(); } else { item$.update({ 
  //         title: product.title,
  //         imageUrl: product.imageUrl,
  //         price: product.price,
  //         quantity
  //       });
  //       }
  //     });
  //   });
  // }

}
