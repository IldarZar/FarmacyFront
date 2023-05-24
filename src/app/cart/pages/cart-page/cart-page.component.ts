import { Component, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { map, Observable, Subscription, switchMap, tap } from 'rxjs';
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

  get totalPrice(): Observable<number> {
    return this.cartProducts$.pipe(
      map((cartProducts) =>
        cartProducts.reduce(
          (acc, { product, countProduct }) =>
            acc + product.price * countProduct,
          0
        )
      )
    );
  }

  get totalDiscountPrice(): Observable<number> {
    return this.cartProducts$.pipe(
      map((cartProducts) =>
        cartProducts.reduce(
          (acc, { product, countProduct }) =>
            acc + product.price * countProduct,
          0
        )
      ),
      switchMap((totalPrice) =>
        this.user$.pipe(
          map(({ userRoom: { bonusPoints } }) =>
            bonusPoints < totalPrice ? totalPrice - bonusPoints : 0
          )
        )
      )
    );
  }

  changeProductCount(cartProduct: ProductOrder, count: number): void {
    cartProduct.countProduct = count;
  }

  deleteProductFromCart(cartProduct: ProductOrder): void {
    this.store.dispatch(new DeleteCartProduct(cartProduct));
  }

  createNewOrder(e: Event, cartProducts: ProductOrder[]): void {
    e.preventDefault();
    const subscription = this.cartService
      .createNewOrder(cartProducts, this.selectedDeliveryPoint)
      .pipe(tap(() => this.store.dispatch(new DeleteAllCartProducts())))
      .subscribe();

    this.subscription.add(subscription);
  }

  createNewOrderUsingBonusPoints(e: Event, cartProducts: ProductOrder[]): void {
    e.preventDefault();

    const subscription = this.cartService
      .createNewOrderUsingBonusPoints(cartProducts, this.selectedDeliveryPoint)
      .pipe(tap(() => this.store.dispatch(new DeleteAllCartProducts())))

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
