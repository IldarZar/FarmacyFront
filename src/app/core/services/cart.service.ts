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
        this.http.post<UserOrder>(`/user-order/${user.id}`, {
          productOrder: productOrders,
          deliveryPoint: deliveryPoint ? deliveryPoint : user.deliveryPoint,
        })
      )
    );
  }

  // TODO: писал ночью, надо рефакторить
  createNewOrderUsingBonusPoints(
    productOrders: ProductOrder[],
    deliveryPoint: Nullable<DeliveryPoint> = null
  ) {
    return this.user$.pipe(
      take(1),
      switchMap((user) => {
        const sum = productOrders.reduce(
          (curr, { countProduct, product }) =>
            curr + countProduct * product.price,
          0
        );

        return this.http.post<UserOrder>(
          `/user-order/${user.id}?remainingBonusPoints=${
            sum > user.userRoom.bonusPoints
              ? 0
              : user.userRoom.bonusPoints - sum
          }`,
          {
            productOrder: productOrders,
            deliveryPoint: deliveryPoint ? deliveryPoint : user.deliveryPoint,
            sum:
              sum > user.userRoom.bonusPoints
                ? sum - user.userRoom.bonusPoints
                : 0,
          }
        );
      })
    );
  }

  getAllDeliveryPoints(): Observable<DeliveryPoint[]> {
    return this.http
      .get<DeliveryPoint[]>('/delivery-point')
      .pipe(map(this.getContent));
  }
}
