import { Component, OnInit } from '@angular/core';
import {Select, Store} from "@ngxs/store";
import { Observable } from "rxjs";
import {CartProduct} from "../../../catalog/models/cart-product";
import {AppState} from "../../../../app.state";
import {DeleteCartProduct} from "../../../../app.actions";

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
