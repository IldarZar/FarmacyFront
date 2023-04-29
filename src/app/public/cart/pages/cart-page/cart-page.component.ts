import { Component, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription, switchMap } from 'rxjs';
import { ProductOrder } from '@shared/models/product-order';
import { CartService } from '@public/cart/services/cart.service';
import { AppState } from '@app/store/app/app.state';
import { DeleteCartProduct } from '@app/store/app/cart.actions';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnDestroy {
  subscription = new Subscription();

  constructor(private store: Store, private cartService: CartService) {}

  @Select(AppState.getCartProducts)
  cartProducts$!: Observable<ProductOrder[]>;

  deleteProductFromCart(cartProduct: ProductOrder): void {
    this.store.dispatch(new DeleteCartProduct(cartProduct));
  }

  createNewOrder(): void {
    const subscription = this.cartProducts$
      .pipe(
        switchMap((cartProducts) =>
          this.cartService.createNewOrder(cartProducts)
        )
      )
      .subscribe();

    this.subscription.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
