import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import {AddCartProduct, DeleteCartProduct, UpdateCartProduct} from "@app/app.actions";
import {Product} from "@app/public/catalog/models/product";
import {Observable} from "rxjs";
import {CartProduct} from "@app/public/catalog/models/cart-product";

export class AppStateModel {
  // TODO: заменить все типы на CartProduct
  products: CartProduct[];
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
          { product: { id: payload.product.id }, count: 1 }
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
          productCount: ctx.getState().products.find(({ product }) => product.id === payload.product.id)!.productCount + payload.count,
        }
      ]
    })
  }

  @Action(DeleteCartProduct)
  deleteProduct(ctx: StateContext<AppStateModel>, { payload }: DeleteCartProduct) {

    if (payload.productCount === 1) {
      ctx.patchState({
        products: [
          ...ctx.getState().products.filter(({ product }) => product.id !== payload.product.id),
        ]
      })
    } else {
      ctx.patchState({
        products: [
          ...ctx.getState().products.filter(({ product }) => product.id !== payload.product.id),
          {
            product: {
              id: payload.product.id
            },
            productCount: ctx.getState().products.find(({ product }) => product.id === payload.product.id)!.productCount - 1,
          }
        ]
      })
    }
  }

  @Selector([AppState])
  static getCartProducts(state: AppStateModel): { product: { id: number }, productCount: number }[] {
    return state.products;
  }
}
