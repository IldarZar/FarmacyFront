import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import {
  AddCartProduct,
  DeleteCartProduct,
  UpdateCartProduct,
} from './cart.actions';
import { ProductOrder } from '@shared/models/product-order';
import { User } from '@shared/models/user/user';
import { Nullable } from '@core/models/nullable';
import { GetUser, SetUser } from './user.actions';

export class AppStateModel {
  products!: ProductOrder[];
  user!: Nullable<User>;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    products: [],
    user: null,
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
          countProduct: payload.countProduct,
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
          <ProductOrder>{ product: payload.product, countProduct: 1 },
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
          countProduct:
            ctx
              .getState()
              .products.find(
                ({ product }) => product.id === payload.product.id
              )!.countProduct + payload.countProduct,
        },
      ],
    });
  }

  @Action(DeleteCartProduct)
  deleteProduct(
    ctx: StateContext<AppStateModel>,
    { payload }: DeleteCartProduct
  ) {
    if (payload.countProduct === 1) {
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
            countProduct:
              ctx
                ?.getState()
                ?.products.find(
                  ({ product }) => product.id === payload.product.id
                )!.countProduct - 1,
          },
        ],
      });
    }
  }

  @Action(GetUser)
  GetUser(ctx: StateContext<AppStateModel>) {
    console.log(localStorage.getItem('user'));
    if (localStorage.getItem('user')) {
      // @ts-ignore
      const user = JSON.parse(localStorage.getItem('user')) as User;
      ctx.patchState({ user });
    } else {
      ctx.patchState({ user: null });
    }
  }

  @Action(SetUser)
  SetUser(ctx: StateContext<AppStateModel>, { payload: { user } }: SetUser) {
    localStorage.setItem('user', JSON.stringify(user));
    ctx.patchState({ user });
  }

  @Selector([AppState])
  static getUser(state: AppStateModel): Nullable<User> {
    return state?.user;
  }

  @Selector([AppState])
  static getCartProducts(state: AppStateModel): ProductOrder[] {
    return state?.products;
  }
}