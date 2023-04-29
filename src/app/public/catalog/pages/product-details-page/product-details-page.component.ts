import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@shared/models/product/product';
import {Observable, map} from "rxjs";

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.scss'],
})
export class ProductDetailsPageComponent implements OnInit {
  product$: Observable<Product>;

  constructor(private route: ActivatedRoute) {} // private route: ActivatedRoute

  ngOnInit(): void {
    // @ts-ignore
    this.product$ = this.route.data.pipe(map(({ product })  => product));
  }
}
