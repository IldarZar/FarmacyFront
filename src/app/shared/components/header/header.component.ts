import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  Subject,
  switchAll,
  switchMap,
  tap,
} from 'rxjs';
import {CartProduct} from "../../models/product/cart-product";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  productCount = new BehaviorSubject(0);

  // @Select(AppState.getCartProducts)
  // cartProducts$: Observable<CartProduct[]>;

  constructor(
    protected router: Router,
    // private store: Store,
    // private actions: Actions
  ) {}

  ngOnInit(): void {
    // Каждый раз при вызове AddCartProduct
    // this.actions
    //   .pipe(
    //     ofActionDispatched(AddCartProduct, DeleteCartProduct),
    //     switchMap(() => this.cartProducts$)
    //   )
    //   .subscribe((products) => {
    //     // @ts-ignore
    //     this.productCount.next(
    //       products.reduce((acc, currVal) => acc + currVal.count, 0)
    //     );
    //   });
  }
}
