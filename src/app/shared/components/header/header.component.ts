import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  BehaviorSubject,
  Observable, of,
  Subject,
  switchAll,
  switchMap,
  tap,
} from 'rxjs';
import {User} from "../../models/user/user";
import {AuthService} from "../../../public/auth/services/auth.service";
import {Actions, ofActionDispatched, Select, Store} from "@ngxs/store";
import {AddCartProduct, DeleteCartProduct} from "../../../app.actions";
import {AppState} from "../../../app.state";
import {CartProduct} from "../../models/product/cart-product";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  productCount = new BehaviorSubject(0);

  currentUser: User;

  isUserLoggedIn: boolean = false;

  @Select(AppState.getCartProducts)
  cartProducts$: Observable<CartProduct[]>;

  constructor(
    protected route: ActivatedRoute,
    private authService: AuthService,
    private store: Store,
    private actions: Actions
  ) {}

  ngOnInit(): void {
    this.actions
      .pipe(
        ofActionDispatched(AddCartProduct, DeleteCartProduct),
        switchMap(() => this.cartProducts$)
      )
      .subscribe((products) => {
        // @ts-ignore
        this.productCount.next(
          products.reduce((acc, currVal) => acc + currVal.count, 0)
        );
      });

    this.authService.getCurrentUser().subscribe({
      next: (user: User) => {
        console.log(user);

        this.isUserLoggedIn = !!user?.id;
      }
    });
  }
}
