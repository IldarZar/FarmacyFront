import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  of,
  Subject,
  Subscription,
  switchAll,
  switchMap,
  tap,
} from 'rxjs';
import { User } from '@shared/models/user/user';
import { UserService } from '@app/core/services/user.service';
import { Actions, ofActionDispatched, Select, Store } from '@ngxs/store';
import { AddCartProduct, DeleteCartProduct } from '@app/app.actions';
import { AppState } from '@app/app.state';
import { CartProduct } from '@shared/models/product/cart-product';
import { Nullable } from '@app/core/models/nullable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  productCount$ = new BehaviorSubject(0);
  isUserLoggedIn$ = new BehaviorSubject(false);

  currentUser: User;

  subscription = new Subscription();

  @Select(AppState.getCartProducts)
  cartProducts$: Observable<CartProduct[]>;

  constructor(
    protected route: ActivatedRoute,
    private authService: UserService,
    private store: Store,
    private actions: Actions
  ) {}

  ngOnInit(): void {
    const productsSubscription = this.actions
      .pipe(
        ofActionDispatched(AddCartProduct, DeleteCartProduct),
        switchMap(() => this.cartProducts$)
      )
      .subscribe((products) => {
        // @ts-ignore
        this.productCount$.next(
          products.reduce((acc, currVal) => acc + currVal.count, 0)
        );
      });

    const userSubscription = this.authService
      .getCurrentUser()
      .subscribe((user: Nullable<User>) => {
        console.log(user);
        this.isUserLoggedIn$.next(!!user?.id);
      });

    this.subscription.add(productsSubscription);
    this.subscription.add(userSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
