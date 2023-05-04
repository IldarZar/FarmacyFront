import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { ProductOrder } from '@shared/models/product-order';
import { User } from '@shared/models/user/user';
import { Select, Store } from '@ngxs/store';
import { AppState } from '@app/store/app/app.state';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  @Select(AppState.getUser)
  user$: Observable<User>;

  constructor(private http: HttpClient, private store: Store) {}

  createNewOrder(productOrders: ProductOrder[]): Observable<any> {
    return this.user$.pipe(
      switchMap((user) =>
        this.http.post('/user-order/' + user.id, {
          productOrder: productOrders,
          deliveryPoint: user.deliveryPoint,
        })
      )
    );
  }
}
