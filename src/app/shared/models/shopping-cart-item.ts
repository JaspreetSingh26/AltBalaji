import { Product } from './product';

export class ShoppingCartItem {
  $key: string;
  product: Product;
  quantity: number;

  constructor(init?: Partial<ShoppingCartItem>) {
    Object.assign(this, init);
  }

  get totalPrice() { return this.product.price * this.quantity; }
}
