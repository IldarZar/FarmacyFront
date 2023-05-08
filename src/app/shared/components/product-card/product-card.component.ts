import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@shared/models/product/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input()
  product: Product;

  @Input()
  isFavourite: boolean;

  @Input()
  showFavouriteButton: boolean;

  @Input()
  showBuyButton: boolean = true;

  @Output()
  productSelected = new EventEmitter();

  @Output()
  addedToFavourites = new EventEmitter();

  constructor() {}

  addProductToCart(e: Event) {
    e.stopPropagation();
    this.productSelected.emit(this.product);
  }

  addProductToFavourites(e: Event) {
    e.stopPropagation();
    this.addedToFavourites.emit(this.product);
  }
}
