import { Component, OnInit } from '@angular/core';
import { AppState } from "@app/app.state";
import {Select, Store} from "@ngxs/store";
import { Observable } from "rxjs";
import { CartProduct } from "@app/public/catalog/models/cart-product";
import {DeleteCartProduct} from "@app/app.actions";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  constructor(
    private store: Store,
  ) { }

  @Select(AppState.getCartProducts)
  cartProducts$!: Observable<CartProduct[]>;


  ngOnInit(): void {
  }

  deleteProductFromCart(cartProduct: CartProduct): void {
    this.store.dispatch(new DeleteCartProduct(cartProduct));
  }
}
