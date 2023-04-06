import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { Product } from "@app/public/catalog/models/product";
import {AddProductToCart} from "@app/app.actions";

export class ProductStateModel {
  productsId: number[];
}

@State<ProductStateModel>({
  name: 'Add',
  defaults: {
    productsId: [],
  }
})
@Injectable()
export class CartState {
  @Action(AddProductToCart)
  addProduct(ctx: StateContext<ProductStateModel>, { id }: AddProductToCart) {
    ctx.patchState({ productsId: [ ...ctx.getState().productsId, id ] });
  }
}
