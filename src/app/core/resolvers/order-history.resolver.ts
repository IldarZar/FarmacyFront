import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Store } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { UserOder } from '@shared/models/user-order';
import { GetUser } from '@app/store/app/user.actions';

@Injectable({
  providedIn: 'root',
})
export class OrderHistoryResolver implements Resolve<UserOder[]> {
  constructor(private store: Store, private http: HttpClient) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserOder[]> {
    return this.store.dispatch(new GetUser()).pipe(
      switchMap((store) => {
        console.log(store.app.user.id);
        return this.http.get<UserOder[]>('/user-order/' + store.app.user.id);
      })
    );
  }
}
