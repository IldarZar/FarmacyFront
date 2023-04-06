import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "@app/public/catalog/models/product";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  constructor() { }

  @Input()
  product: Product;

  @Output()
  productSelected = new EventEmitter();

  ngOnInit(): void {}

  addProductToCart() {
    this.productSelected.emit(this.product);
  }
}
