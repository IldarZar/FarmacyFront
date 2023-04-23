import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CartProduct } from '@shared/models/product/cart-product';
import { AppState } from '@app/app.state';
import { DeleteCartProduct } from '@app/app.actions';
import { CartService } from '@public/cart/services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  constructor(private store: Store, private cartService: CartService) {}

  @Select(AppState.getCartProducts)
  cartProducts$!: Observable<CartProduct[]>;

  ngOnInit(): void {
    this.cartProducts$.subscribe((res) => console.log(res));
  }

  deleteProductFromCart(cartProduct: CartProduct): void {
    this.store.dispatch(new DeleteCartProduct(cartProduct));
  }

  createNewOrder(): void {
    this.store
      .select((res) => res.app.products)
      .subscribe((cartProducts: CartProduct[]) => {
        this.cartService
          .createNewOrder(1, cartProducts[0])
          .subscribe((res) => console.log(res));
      });
  }
}
