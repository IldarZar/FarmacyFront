import { ProductOrder } from '@shared/models/product-order';

export class AddCartProduct {
  static readonly type = '[Cart] Add Product To Cart';
  constructor(public payload: ProductOrder) {}
}

export class UpdateCartProduct {
  static readonly type = '[Cart] Update Product in Cart';
  constructor(public payload: ProductOrder) {}
}

export class DeleteCartProduct {
  static readonly type = '[Cart] Delete Product from Cart';
  constructor(public payload: ProductOrder) {}
}
