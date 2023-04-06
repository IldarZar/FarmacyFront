import {Product} from "@app/public/catalog/models/product";

export class AddProductToCart {
  static readonly type = '[Add] Product To Cart';
  constructor(public payload: { product: Product, count: number }) {}


}
