import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';

import {
  AddCartProduct,
  DeleteCartProduct,
  UpdateCartProduct,
} from './app.actions';
import { CartProduct } from '@shared/models/product/cart-product';
import { Product } from '@shared/models/product/product';

export class AppStateModel {
  products!: CartProduct[];
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    products: [],
  },
})
@Injectable()
export class AppState {
  @Action(AddCartProduct)
  addProduct(ctx: StateContext<AppStateModel>, { payload }: AddCartProduct) {
    const product = ctx
      .getState()
      .products.find(({ product }) => product.id === payload.product.id);

    if (product) {
      this.updateProduct(
        ctx,
        new UpdateCartProduct({
          product: payload.product,
          count: payload.count,
        })
      );
    } else {
      ctx.patchState({
        products: [
          ...ctx
            .getState()
            .products.filter(
              ({ product }) => product.id !== payload.product.id
            ),
          <CartProduct>{ product: payload.product, count: 1 },
        ],
      });
    }
  }

  @Action(UpdateCartProduct)
  updateProduct(
    ctx: StateContext<AppStateModel>,
    { payload }: UpdateCartProduct
  ) {
    ctx.patchState({
      products: [
        ...ctx
          .getState()
          .products.filter(({ product }) => product.id !== payload.product.id),
        {
          product: payload.product,
          count:
            ctx
              .getState()
              .products.find(
                ({ product }) => product.id === payload.product.id
              )!.count + payload.count,
        },
      ],
    });
  }

  @Action(DeleteCartProduct)
  deleteProduct(
    ctx: StateContext<AppStateModel>,
    { payload }: DeleteCartProduct
  ) {
    if (payload.count === 1) {
      ctx.patchState({
        products: [
          ...ctx
            .getState()
            .products.filter(
              ({ product }) => product.id !== payload.product.id
            ),
        ],
      });
    } else {
      ctx.patchState({
        products: [
          ...ctx
            .getState()
            .products.filter(
              ({ product }) => product.id !== payload.product.id
            ),
          {
            product: payload.product,
            count:
              ctx
                ?.getState()
                ?.products.find(
                  ({ product }) => product.id === payload.product.id
                )!.count - 1,
          },
        ],
      });
    }
  }

  @Selector([AppState])
  static getCartProducts(state: AppStateModel): CartProduct[] {
    return state?.products;
  }
}
