import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap, tap } from 'rxjs';
import { Nullable } from '@app/core/models/nullable';
import { User } from '@shared/models/user/user';
import { Select, Store } from '@ngxs/store';
import { AppState } from '@app/store/app/app.state';
import { GetUser, SetUser } from '@app/store/app/user.actions';
import { Product } from '@shared/models/product/product';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  @Select(AppState.getUser)
  user$: Observable<Nullable<User>>;

  constructor(private http: HttpClient, private store: Store) {}

  getCurrentUser(): Observable<Nullable<User>> {
    return this.store.dispatch(new GetUser()).pipe(switchMap(() => this.user$));
  }

  login(login: string, password: string): Observable<User> {
    return this.http
      .get<User>(`/auth/login/?login=${login}&password=${password}`)
      .pipe(
        tap((user) => {
          this.store.dispatch(new SetUser({ user }));
        })
      );
  }

  logout() {
    return this.http.get('/auth/logout').pipe(
      tap(() => {
        this.store.dispatch(new SetUser({ user: {} as User }));
      })
    );
  }

  addProductToFavourites(product: Product) {
    return this.store.dispatch(new GetUser()).pipe(
      map((store) => store.app.user),
      switchMap((user: User) => {
        const requestBody = user.favorites.includes(product.id)
          ? [...user?.favorites.filter((e) => e !== product.id)]
          : [...user?.favorites, product.id];

        return this.http
          .patch(`/auth/favorites/${user.id}`, requestBody)
          .pipe(map((favorites) => ({ favorites, user })));
      })
    );
  }
}
