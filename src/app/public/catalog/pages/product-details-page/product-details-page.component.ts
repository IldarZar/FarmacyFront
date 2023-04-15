import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable, switchAll, switchMap} from "rxjs";
import {Product} from "../../models/product";

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.scss'],
})
export class ProductDetailsPageComponent implements OnInit {

  product!: Product;

  constructor(private route: ActivatedRoute) {} // private route: ActivatedRoute

  ngOnInit(): void {
    this.route.data.subscribe(res => {
      this.product = res[0];
    });
  }
}
