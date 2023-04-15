import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { Observable, Subscription, tap } from 'rxjs';
import { Product } from '../../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import {Store} from "@ngxs/store";
import {AddCartProduct} from "../../../../app.actions";

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss'],
})
export class CatalogPageComponent implements OnInit {
  constructor(
    private catalogService: CatalogService,
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  products$?: Observable<Product[]>;

  ngOnInit(): void {
    this.products$ = this.catalogService.getCatalog();
  }

  categorySelected(categoryId: number): void {
    this.products$ = this.catalogService.getCatalogByCategoryId(categoryId);
  }

  addProductToCart(product: Product): void {
    this.store.dispatch(new AddCartProduct({ product, count: 1 })).subscribe();
  }

  openProductDetails(productId: number): void {
    this.router.navigate([productId], { relativeTo: this.activatedRoute });
  }
}
