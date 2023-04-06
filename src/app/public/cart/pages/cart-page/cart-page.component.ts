import { Component, OnInit } from '@angular/core';
import {CartState} from "@app/app.state";
import {Select} from "@ngxs/store";
import {Observable} from "rxjs";
import {Product} from "@app/public/catalog/models/product";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  constructor() { }

  @Select(CartState.getCartProducts)
  cartProducts: Observable<{ product: Product, count: number }>;


  ngOnInit(): void {

    this.cartProducts.subscribe(res => console.log(res));
  }

}
