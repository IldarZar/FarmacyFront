import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of, switchMap, tap } from 'rxjs';
import { User } from '@shared/models/user/user';
import { Select, Store } from '@ngxs/store';
import { AppState } from '@app/store/app/app.state';
import { ClearUser, SetUser } from '@app/store/app/user.actions';
import { Product } from '@shared/models/product/product';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  @Select(AppState.getUser)
  user$: Observable<User>;

  constructor(private http: HttpClient, private store: Store) {}

  login(login: string, password: string): Observable<User> {
    return this.http
      .get<User>(`/auth/login?login=${login}&password=${password}`)
      .pipe(
        tap((user) => {
          this.store.dispatch(new SetUser({ user }));
        })
      );
  }

  logout() {
    return this.http.get('/auth/logout').pipe(
      tap(() => {
        this.store.dispatch(new ClearUser());
      })
    );
  }

  // берём юзера из параметра, а не из селекта, дабы избежать бесконечного цикла
  updateFavourites(product: Product, user: User): Observable<User> {
    const requestBody = user.favorites.includes(product.id)
      ? [...user?.favorites.filter((e) => e !== product.id)]
      : [...user?.favorites, product.id];

    return this.http.patch(`/auth/favorites/${user.id}`, requestBody).pipe(
      switchMap(() =>
        this.http.get<User>(
          `/auth/login?login=${user.login}&password=${user.password}`
        )
      ),
      tap((user) => this.store.dispatch(new SetUser({ user })))
    );
  }

  getFavouriteProducts(favouriteProductIds: number[]): Observable<Product[]> {
    const sources = favouriteProductIds.map((favProdId) =>
      this.http.get<Product>(`/products/${favProdId}`)
    );

    return sources.length ? forkJoin(sources) : of([]);
  }
}
