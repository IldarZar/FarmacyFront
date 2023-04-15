import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {

  @Input()
  product!: Product;

  @Output()
  productSelected = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  addProductToCart(e: Event) {
    e.stopPropagation();
    this.productSelected.emit(this.product);
  }
}
