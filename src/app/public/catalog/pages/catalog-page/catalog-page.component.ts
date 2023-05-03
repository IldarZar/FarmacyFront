import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, Subscription, switchMap} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, Select, Store } from '@ngxs/store';
import { UserService } from '@app/core/services/user.service';
import { Product } from '@shared/models/product/product';
import { Subcategory } from '@shared/models/product/subcategory';
import { Category } from '@shared/models/product/category';
import { CatalogService } from '@public/catalog/services/catalog.service';
import { User } from '@shared/models/user/user';
import { Nullable } from '@core/models/nullable';
import { AddCartProduct } from '@app/store/app/cart.actions';
import { AppState } from '@app/store/app/app.state';
import { SetUser } from '@app/store/app/user.actions';

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
    private router: Router,
  ) {}

  subscription = new Subscription();

  products$?: Observable<Product[]>;
  categories$: Observable<Category[]>;
  subcategories$: Observable<Subcategory[]>;
  activeCategoryId: number;
  activeSubcategoryId: number;


  ngOnInit(): void {
    this.products$ = this.catalogService.getCatalog();
    this.categories$ = this.catalogService.getCategories();
    this.subcategories$ = this.catalogService.getSubcategories();
  }

  categorySelected(categoryId: number): void {
    this.activeCategoryId = categoryId;

    if (categoryId) {
      this.products$ = this.catalogService.getCatalogByCategoryId(categoryId);
      this.subcategories$ = this.catalogService
        .getSubcategories()
        .pipe(
          switchMap((subcategories) =>
            of(
              subcategories.filter(
                (subcategory) => subcategory.parentCategory.id === categoryId
              )
            )
          )
        );
    } else {
      this.products$ = this.catalogService.getCatalog();
      this.subcategories$ = this.catalogService.getSubcategories();
      this.activeSubcategoryId = -1;
    }
  }

  addProductToCart(product: Product): void {
    this.store
      .dispatch(new AddCartProduct({ product, countProduct: 1 }));
  }

  openProductDetails(productId: number): void {
    const subscription = this.userService.getCurrentUser().subscribe((user: Nullable<User>) => {
      if (user?.roles.map((role) => role.id).includes(1)) {
        this.router.navigate(['catalog', 'admin', productId]);
      } else {
        this.router.navigate(['catalog', productId]);
      }
    });
    this.subscription.add(subscription);
  }

  subcategorySelected(subcategoryId: number): void {
    this.activeSubcategoryId = subcategoryId;

    if (subcategoryId) {
      this.products$ =
        this.catalogService.getCatalogBySubcategoryId(subcategoryId);
    } else {
      this.products$ = this.catalogService.getCatalogByCategoryId(
        this.activeCategoryId
      );
    }
  }

  addProductToFavourites(product: Product) {
    const subscription = this.userService.addProductToFavourites(product).subscribe((res) => {
      this.store.dispatch(
        // @ts-ignore
        new SetUser({ user: { ...res.user, favorites: res.favorites } })
      );
    });

    this.subscription.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
