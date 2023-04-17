import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CartProduct} from "../../../shared/models/product/cart-product";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient,
  ) { }

  createNewOrder(userId: number, cartProduct: CartProduct): Observable<any> {
    return this.http.post('/user-order/' + userId, {
      productOrder: [
        {
          product: cartProduct.product,
          countProduct: cartProduct.count
        },
      ],
    })
  }

}
