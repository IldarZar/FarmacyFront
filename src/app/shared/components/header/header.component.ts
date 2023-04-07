import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Actions, ofActionDispatched, Select, Store} from "@ngxs/store";
import {Observable, Subject, switchAll, switchMap, tap} from "rxjs";
import {AddCartProduct, DeleteCartProduct} from "@app/app.actions";
import {AppState} from "@app/app.state";
import {Product} from "@app/public/catalog/models/product";
import {CartProduct} from "@app/public/catalog/models/cart-product";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  productCount = new Subject();

  @Select(AppState.getCartProducts)
  cartProducts$: Observable<CartProduct[]>

  constructor(
    protected router: Router,
    private store: Store,
    private actions: Actions,
  ) { }

  ngOnInit(): void {

    // Каждый раз при вызове AddCartProduct
    this.actions.pipe(
      ofActionDispatched(AddCartProduct, DeleteCartProduct),
      switchMap( () => this.cartProducts$)
    ).subscribe((products) => {
      // @ts-ignore
      this.productCount.next(products.reduce((acc, currVal) =>  acc + currVal.productCount, 0))
    });
  }

}
