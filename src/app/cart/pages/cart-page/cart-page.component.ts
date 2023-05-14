import { Component, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription, tap } from 'rxjs';
import { ProductOrder } from '@shared/models/product-order';
import { CartService } from '@core/services/cart.service';
import { AppState } from '@app/store/app/app.state';
import {
  DeleteAllCartProducts,
  DeleteCartProduct,
} from '@app/store/app/cart.actions';
import { DeliveryPoint } from '@shared/models/delivery-point';
import { Nullable } from '@core/models/nullable';
import { User } from '@shared/models/user/user';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnDestroy {
  @Select(AppState.getCartProducts)
  cartProducts$: Observable<ProductOrder[]>;

  @Select(AppState.getUser)
  user$: Observable<User>;

  constructor(private store: Store, private cartService: CartService) {}

  deliveryPoints$: Observable<DeliveryPoint[]>;
  selectedDeliveryPoint: Nullable<DeliveryPoint> = null;

  subscription = new Subscription();

  ngOnInit() {
    this.deliveryPoints$ = this.cartService.getAllDeliveryPoints();
    const subscription = this.user$.subscribe(
      (user) => (this.selectedDeliveryPoint = user?.deliveryPoint)
    );
    this.subscription.add(subscription);
  }

  deleteProductFromCart(cartProduct: ProductOrder): void {
    this.store.dispatch(new DeleteCartProduct(cartProduct));
  }

  createNewOrder(cartProducts: ProductOrder[]): void {
    const subscription = this.cartService
      .createNewOrder(cartProducts, this.selectedDeliveryPoint)
      .pipe(tap((res) => this.store.dispatch(new DeleteAllCartProducts())))
      .subscribe();

    this.subscription.add(subscription);
  }

  deliveryPointChanges(e: DeliveryPoint) {
    this.selectedDeliveryPoint = e;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
