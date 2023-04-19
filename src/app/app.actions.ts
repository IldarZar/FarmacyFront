import { CartProduct } from '@shared/models/product/cart-product';

export class AddCartProduct {
  static readonly type = '[Add] Product To Cart';
  constructor(public payload: CartProduct) {}
}

export class UpdateCartProduct {
  static readonly type = '[Update] Product in Cart';
  constructor(public payload: CartProduct) {}
}

export class DeleteCartProduct {
  static readonly type = '[Delete] Product from Cart';
  constructor(public payload: CartProduct) {}
}
