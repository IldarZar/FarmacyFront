import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { UserOrder } from '@shared/models/user-order';
import { AppState } from '@app/store/app/app.state';
import { User } from '@shared/models/user/user';

@Injectable({
  providedIn: 'root',
})
export class OrderHistoryResolver implements Resolve<UserOrder[]> {
  @Select(AppState.getUser)
  user$: Observable<User>;

  constructor(private store: Store, private http: HttpClient) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserOrder[]> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) {
          return this.http.get<UserOrder[]>('/user-order/' + user.id);
        }

        return of([]);
      })
    );
  }
}
