import { Component, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { ProductOrder } from '@shared/models/product-order';
import { CartService } from '@core/services/cart.service';
import { AppState } from '@app/store/app/app.state';
import {
  DeleteAllCartProducts,
  DeleteCartProduct,
} from '@app/store/app/cart.actions';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnDestroy {
  subscription = new Subscription();

  constructor(private store: Store, private cartService: CartService) {}

  @Select(AppState.getCartProducts)
  cartProducts$: Observable<ProductOrder[]>;

  deleteProductFromCart(cartProduct: ProductOrder): void {
    this.store.dispatch(new DeleteCartProduct(cartProduct));
  }

  createNewOrder(cartProducts: ProductOrder[]): void {
    this.store.dispatch(new DeleteAllCartProducts());

    const subscription = this.cartService
      .createNewOrder(cartProducts)
      .subscribe();

    this.subscription.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
