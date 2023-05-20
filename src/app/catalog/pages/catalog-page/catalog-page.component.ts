import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, tap} from 'rxjs';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { UserService } from '@core/services/user.service';
import { Product } from '@shared/models/product/product';
import { Subcategory } from '@shared/models/product/subcategory';
import { Category } from '@shared/models/product/category';
import { CatalogService } from '@core/services/catalog.service';
import { User } from '@shared/models/user/user';
import { Nullable } from '@core/models/nullable';
import { AddCartProduct } from '@app/store/app/cart.actions';
import { AppState } from '@app/store/app/app.state';
import { SearchFilter } from '@shared/models/search-filter';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss'],
})
export class CatalogPageComponent implements OnInit, OnDestroy {
  @Select(AppState.getUser)
  user$: Observable<User>;

  constructor(
    protected userService: UserService,
    private catalogService: CatalogService,
    private store: Store,
    private router: Router
  ) {}

  subscription = new Subscription();

  products$: Observable<Nullable<Product[]>>;
  categories$: Observable<Nullable<Category[]>>;
  subcategories$: Observable<Nullable<Subcategory[]>>;

  activeCategory: Nullable<Category>;
  activeSubcategory: Nullable<Subcategory>;

  productFilter: SearchFilter = {
    name: '',
    minPrice: 0,
    maxPrice: 20000,
    controlled: null,
    categoryId: null,
    subCategoryId: null,
  };

  ngOnInit(): void {
    this.categories$ = this.catalogService.getCategories().pipe(
      tap(categories => {
        this.activeCategory = categories[0] ?? null;
        this.productFilter.categoryId = this.activeCategory.id;
      })
    );
    this.subcategories$ = this.catalogService.getSubcategories(this.activeCategory);
    this.products$ = this.catalogService.getCatalog(this.productFilter);

    this.catalogService.searchText.subscribe((searchText: string) => {
      this.productFilter = { ...this.productFilter, name: searchText };
      this.products$ = this.catalogService.getCatalog(this.productFilter);
    });
  }

  categorySelected(category: Category): void {
    this.productFilter.categoryId = category.id;
    this.activeCategory = category;
    this.subcategories$ = this.catalogService.getSubcategories(this.activeCategory);
    this.products$ = this.catalogService.getCatalog(this.productFilter);
  }

  addProductToCart(product: Product): void {
    this.store.dispatch(new AddCartProduct({ product, countProduct: 1 }));
  }

  openProductDetails(productId: number): void {
    this.router.navigate(['catalog', productId]);
  }

  applyFilters({ minPrice, maxPrice, subCategoryId }: SearchFilter): void {
    this.productFilter = {
      ...this.productFilter,
      minPrice,
      maxPrice,
      subCategoryId,
    };

    this.products$ = this.catalogService.getCatalog(this.productFilter);
  }

  updateFavourites(product: Product, user: User) {
    const subscription = this.userService
      .updateFavourites(product, user)
      .subscribe();
    this.subscription.add(subscription);
  }

  create() {
    this.router.navigate(['/catalog/create']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
