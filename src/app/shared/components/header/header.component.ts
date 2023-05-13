import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, switchMap } from 'rxjs';
import { User } from '@shared/models/user/user';
import { UserService } from '@app/core/services/user.service';
import { Actions, ofActionDispatched, Select, Store } from '@ngxs/store';
import { ProductOrder } from '@shared/models/product-order';
import { AddCartProduct, DeleteCartProduct } from '@app/store/app/cart.actions';
import { AppState } from '@app/store/app/app.state';
import { CatalogService } from '@core/services/catalog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  productCount$ = new BehaviorSubject(0);

  subscription = new Subscription();

  @ViewChild('input')
  input: ElementRef;

  @Select(AppState.getUser)
  user$: Observable<User>;

  @Select(AppState.getCartProducts)
  cartProducts$: Observable<ProductOrder[]>;

  constructor(
    protected route: ActivatedRoute,
    private authService: UserService,
    private catalogService: CatalogService,
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
          products.reduce((acc, currVal) => acc + currVal.countProduct, 0)
        );
      });

    this.subscription.add(productsSubscription);
  }

  searchProduct() {
    this.catalogService.searchText.next(this.input.nativeElement.value);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
