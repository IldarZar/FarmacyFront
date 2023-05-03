import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@shared/models/user/user';
import { Observable, switchMap, tap } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { SetUser } from '@app/store/app/user.actions';
import { AppState } from '@app/store/app/app.state';
import { UserOrder } from '@shared/models/user-order';
import { OrderStatus } from '@shared/models/enums/order-status';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  @Select(AppState.getUser)
  user$: Observable<User>;

  constructor(private http: HttpClient, private store: Store) {}

  updateUserData(user: User): Observable<User> {
    return this.http
      .put<User>(`/auth/${user.id}`, { ...user })
      .pipe(tap(() => this.store.dispatch(new SetUser({ user }))));
  }

  getOrderHistoryByUser(): Observable<UserOrder[]> {
    return this.user$.pipe(
      switchMap((user) => this.http.get<UserOrder[]>(`/user-order/${user.id}`))
    );
  }

  /**
   * [Access: Pharmacist]
   */
  getOrderHistoryByDeliveryPoint(): Observable<UserOrder[]> {
    return this.user$.pipe(
      switchMap((user) =>
        this.http.get<UserOrder[]>(
          `/user-order/delivery-point/${user.deliveryPoint.id}`
        )
      )
    );
  }

  /**
   * [Access: Pharmacist]
   */
  setOrderStatus(userOrder: UserOrder): Observable<string> {
    return this.http.patch<string>(
      `/user-order/${userOrder.user.id}/order/${userOrder.id}`,
      OrderStatus.IN_PROGRESS
    );
  }
}
