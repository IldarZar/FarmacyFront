import {Product} from "@app/public/catalog/models/product";

export class AddCartProduct {
  static readonly type = '[Add] Product To Cart';
  constructor(public payload: { product: Product, count: number }) {}
}

export class UpdateCartProduct {
  static readonly type = '[Update] Product in Cart';
  constructor(public payload: { product: Product, count: number }) {}
}
