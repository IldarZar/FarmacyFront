import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
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
  favouritesCount$ = new BehaviorSubject(0);
  subscription = new Subscription();

  @ViewChild('input')
  input: ElementRef;

  @Select(AppState.getUser)
  user$: Observable<User>;

  @Select(AppState.getCartProducts)
  cartProducts$: Observable<ProductOrder[]>;

  showSearch = true;

  constructor(
    protected router: Router,
    private authService: UserService,
    private catalogService: CatalogService,
    private store: Store,
    private actions: Actions
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((e) => {
      if(e instanceof NavigationEnd) {
        this.showSearch = !e.url.includes('dashboard');
      }
    });

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

    const favouritesSubscription = this.authService.user$.subscribe(user => {
      this.favouritesCount$.next(
        user.favorites.length
      );
    })

    this.subscription.add(productsSubscription);
    this.subscription.add(favouritesSubscription);
  }

  searchProduct() {
    this.catalogService.searchText.next(this.input.nativeElement.value);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
