import { Injectable } from '@angular/core';
import {State, Action, StateContext, Selector} from '@ngxs/store';
import {AddProductToCart} from "@app/app.actions";

export class ProductStateModel {
  products: { product: { id: number }, countProduct: number }[];
}

@State<ProductStateModel>({
  name: 'app',
  defaults: {
    products: [],
  }
})
@Injectable()
export class CartState {
  @Action(AddProductToCart)
  addProduct(ctx: StateContext<ProductStateModel>, { payload }: AddProductToCart) {
    ctx.patchState({ products: [ ...ctx.getState().products, { countProduct: payload.count, product: payload.product } ] });
  }

  @Selector([CartState])
  static getCartProducts(state: ProductStateModel) {
    return state.products;
  }
}
