import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap, take } from 'rxjs';
import { ProductOrder } from '@shared/models/product-order';
import { User } from '@shared/models/user/user';
import { Select, Store } from '@ngxs/store';
import { AppState } from '@app/store/app/app.state';
import { DeliveryPoint } from '@shared/models/delivery-point';
import { Nullable } from '@core/models/nullable';
import { UserOrder } from '@shared/models/user-order';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  @Select(AppState.getUser)
  user$: Observable<User>;

  constructor(private http: HttpClient, private store: Store) {}

  private getContent(body: any) {
    return body.content;
  }

  createNewOrder(
    productOrders: ProductOrder[],
    deliveryPoint: Nullable<DeliveryPoint> = null
  ): Observable<UserOrder> {
    return this.user$.pipe(
      // TODO: для прерывания бесконечного цикла можно попробовать везде влепить take по юзеру
      take(1),
      switchMap((user) =>
        this.http.post<UserOrder>('/user-order/' + user.id, {
          productOrder: productOrders,
          deliveryPoint: deliveryPoint ? deliveryPoint : user.deliveryPoint,
        })
      )
    );
  }

  getAllDeliveryPoints() {
    return this.http.get('/delivery-point').pipe(map(this.getContent));
  }
}
