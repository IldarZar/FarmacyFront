import {Component, HostBinding, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import { AppState } from '@app/store/app/app.state';
import {Observable, Subscription, switchMap, tap} from 'rxjs';
import { User } from '@shared/models/user/user';
import { FavoriteService } from '@public/favourites/services/favorite.service';
import { Product } from '@shared/models/product/product';
import {AddCartProduct} from "@app/store/app/cart.actions";
import {SetUser} from "@app/store/app/user.actions";
import {UserService} from "@core/services/user.service";
import {Nullable} from "@core/models/nullable";
import {Router} from "@angular/router";

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
    private favoriteService: FavoriteService,
    private userService: UserService,

    private store: Store,
    private router: Router,
  ) {}


  subscription = new Subscription();
  products$: Observable<Product[]>;

  ngOnInit(): void {
    this.products$ = this.user$.pipe(
      switchMap((user) =>
        this.favoriteService.getFavouriteProducts(user.favorites)
      ),
      tap((res) => console.log(res))
    );
  }

  addProductToCart(product: Product): void {
    this.store
      .dispatch(new AddCartProduct({ product, countProduct: 1 }));
  }

  addProductToFavourites(product: Product) {
    const subscription = this.userService.addProductToFavourites(product).subscribe((res) => {
      this.store.dispatch(
        // @ts-ignore
        new SetUser({ user: { ...res.user, favorites: res.favorites } })
      );
    });

    this.subscription.add(subscription);
  }

  openProductDetails(productId: number): void {
    const subscription = this.userService.getCurrentUser().subscribe((user: Nullable<User>) => {
      if (user?.roles.map((role) => role.id).includes(1)) {
        this.router.navigate(['catalog', 'admin', productId]);
      } else {
        this.router.navigate(['catalog', productId]);
      }
    });
    this.subscription.add(subscription);
  }
}
