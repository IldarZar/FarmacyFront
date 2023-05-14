import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription, switchMap } from 'rxjs';
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
    private userService: UserService,
    private catalogService: CatalogService,
    private store: Store,
    private router: Router
  ) {}

  subscription = new Subscription();

  products$: Observable<Product[]>;
  categories$: Observable<Category[]>;
  subcategories$: Observable<Nullable<Subcategory[]>>;

  params: SearchFilter = {
    name: '',
    minPrice: 0,
    maxPrice: 5000,
    controlled: false,
    categoryId: null,
    subCategoryId: null,
  };

  ngOnInit(): void {
    this.products$ = this.catalogService.getCatalog();
    this.categories$ = this.catalogService.getCategories();
    this.subcategories$ = this.catalogService.getSubcategories();

    this.catalogService.searchText.subscribe((searchText: string) => {
      this.params = { ...this.params, name: searchText };
      this.products$ = this.catalogService.getCatalog(this.params);
    });
  }

  categorySelected(categoryId: Nullable<number>): void {
    this.params = { ...this.params, subCategoryId: null, categoryId };

    if (categoryId) {
      this.products$ = this.catalogService.getCatalog(this.params);
      this.subcategories$ = this.catalogService
        .getSubcategories()
        .pipe(
          map((subcats: Subcategory[]) =>
            subcats.filter(({ parentCategory: { id } }) => id === categoryId)
          )
        );
    } else {
      this.products$ = this.catalogService.getCatalog(this.params);
      this.subcategories$ = this.catalogService.getSubcategories();
    }
  }

  addProductToCart(product: Product): void {
    this.store.dispatch(new AddCartProduct({ product, countProduct: 1 }));
  }

  openProductDetails(productId: number): void {
    this.router.navigate(['catalog', productId]);
  }

  applyFilters({ maxPrice, minPrice, subCategoryId }: SearchFilter): void {
    this.params = {
      ...this.params,
      subCategoryId,
      maxPrice,
      minPrice,
    };

    if (subCategoryId) {
      this.products$ = this.catalogService
        .getSubcategoryId(subCategoryId!)
        .pipe(
          switchMap((subCategory: Subcategory) => {
            this.params = {
              ...this.params,
              categoryId: subCategory.parentCategory.id,
            };
            return this.catalogService.getCatalog(this.params);
          })
        );
    } else {
      this.products$ = this.catalogService.getCatalog(this.params);
    }
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

  isUserAdmin(): Observable<boolean> {
    return this.user$.pipe(
      map((user) => user.roles.map((role) => role.id).includes(2))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
