import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@shared/models/product/product';
import { Nullable } from '@core/models/nullable';

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
  showDeleteButton: Nullable<boolean>;

  @Input()
  showFavouriteButton: boolean;

  @Input()
  showBuyButton: boolean = true;

  @Output()
  productSelected = new EventEmitter();

  @Output()
  addedToFavourites = new EventEmitter();

  @Output()
  visibilityChanged = new EventEmitter();

  constructor() {}

  addProductToCart(e: Event) {
    e.stopPropagation();
    this.productSelected.emit(this.product);
  }

  addProductToFavourites(e: Event) {
    e.stopPropagation();
    this.addedToFavourites.emit(this.product);
  }

  setProductVisibility(e: Event) {
    e.stopPropagation();
    this.visibilityChanged.emit(this.product);
  }
}
