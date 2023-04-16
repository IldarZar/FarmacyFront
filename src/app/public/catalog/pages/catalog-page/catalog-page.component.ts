import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import {Observable, of, Subscription, switchMap, tap} from 'rxjs';
import { Product } from '../../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import {Store} from "@ngxs/store";
import {AddCartProduct} from "../../../../app.actions";
import {Category} from "../../models/category";
import {Subcategory} from "../../models/Subcategory";

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
  categories$: Observable<Category[]>;
  subcategories$: Observable<Subcategory[]>;

  activeCategoryId: number;
  activeSubcategoryId: number;

  ngOnInit(): void {
    this.products$ = this.catalogService.getCatalog();
    this.categories$ = this.catalogService.getCategories()
    this.subcategories$ = this.catalogService.getSubcategories()
  }

  categorySelected(categoryId: number): void {
    this.activeCategoryId = categoryId;

    if (categoryId) {
      this.products$ = this.catalogService.getCatalogByCategoryId(categoryId);
      this.subcategories$ = this.catalogService
        .getSubcategories()
        .pipe(
          switchMap(
            (subcategories) => of(subcategories.filter(subcategory => subcategory.parentCategory.id === categoryId)),
          ),
        );
    } else {
      this.products$ = this.catalogService.getCatalog();
      this.subcategories$ = this.catalogService.getSubcategories();
    }
  }

  addProductToCart(product: Product): void {
    this.store.dispatch(new AddCartProduct({ product, count: 1 })).subscribe();
  }

  openProductDetails(productId: number): void {
    this.router.navigate([productId], { relativeTo: this.activatedRoute });
  }

  subcategorySelected(subcategoryId: number): void {
    this.activeSubcategoryId = subcategoryId;
    if (subcategoryId)
      this.products$ = this.catalogService.getCatalogBySubcategoryId(subcategoryId);
    else
      this.products$ = this.catalogService.getCatalogByCategoryId(this.activeCategoryId);
  }
}
