import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import {AddCartProduct, UpdateCartProduct} from "@app/app.actions";

export class AppStateModel {
  products: { product: { id: number }, countProduct: number }[];
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    products: [],
  }
})
@Injectable()
export class AppState {
  @Action(AddCartProduct)
  addProduct(ctx: StateContext<AppStateModel>, { payload }: AddCartProduct) {

    const product = ctx.getState().products.find(({ product }) => product.id === payload.product.id);

    if (product) {
      this.updateProduct(ctx, new UpdateCartProduct({ product: payload.product, count: payload.count }));
    } else {
      ctx.patchState({
        products: [
          ...ctx.getState().products.filter(({ product }) => product.id !== payload.product.id ),
          { product: { id: payload.product.id }, countProduct: 1 }
        ]
      })
    }
  }


  @Action(UpdateCartProduct)
  updateProduct(ctx: StateContext<AppStateModel>, { payload }: UpdateCartProduct) {

    ctx.patchState({
      products: [
        ...ctx.getState().products.filter(({ product }) => product.id !== payload.product.id),
        {
          product: {
            id: payload.product.id
          },
          countProduct: ctx.getState().products.find(({ product }) => product.id === payload.product.id)!.countProduct + payload.count,
        }
      ]
    })
  }



  @Selector([AppState])
  static getCartProducts(state: AppStateModel) {
    return state.products;
  }
}
