import { Component, HostBinding, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AppState } from '@app/store/app/app.state';
import { Observable, Subscription, switchMap, take } from 'rxjs';
import { User } from '@shared/models/user/user';
import { Product } from '@shared/models/product/product';
import { AddCartProduct } from '@app/store/app/cart.actions';
import { UserService } from '@core/services/user.service';
import { Nullable } from '@core/models/nullable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit {
  @HostBinding('class.container')
  container: boolean = true;

  @Select(AppState.getUser)
  user$: Observable<User>;

  constructor(
    private userService: UserService,

    private store: Store,
    private router: Router
  ) {}

  subscription = new Subscription();
  products$: Observable<Product[]>;

  ngOnInit(): void {
    this.products$ = this.user$.pipe(
      take(1),
      switchMap((user) => this.userService.getFavouriteProducts(user.favorites))
    );
  }

  addProductToCart(product: Product): void {
    this.store.dispatch(new AddCartProduct({ product, countProduct: 1 }));
  }

  updateFavourites(product: Product, user: User) {
    const subscription = this.userService
      .updateFavourites(product, user)
      .subscribe();
    this.subscription.add(subscription);
  }

  openProductDetails(productId: number): void {
    const subscription = this.user$.subscribe((user: Nullable<User>) => {
      if (user?.roles.map((role) => role.id)?.includes(2)) {
        this.router.navigate(['catalog', 'admin', productId]);
      } else {
        this.router.navigate(['catalog', productId]);
      }
    });
    this.subscription.add(subscription);
  }
}
