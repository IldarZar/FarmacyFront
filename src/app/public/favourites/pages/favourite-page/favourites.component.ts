import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { AppState } from '@app/store/app/app.state';
import { Observable, switchMap, tap } from 'rxjs';
import { User } from '@shared/models/user/user';
import { FavoriteService } from '@public/favourites/services/favorite.service';
import { Product } from '@shared/models/product/product';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit {
  constructor(private favoriteService: FavoriteService) {}

  @Select(AppState.getUser)
  user$: Observable<User>;

  products$: Observable<Product[]>;

  ngOnInit(): void {
    this.products$ = this.user$.pipe(
      switchMap((user) =>
        this.favoriteService.getFavouriteProducts(user.favorites)
      ),
      tap((res) => console.log(res))
    );
  }
}
