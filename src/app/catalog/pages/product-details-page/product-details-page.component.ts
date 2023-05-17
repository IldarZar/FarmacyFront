import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@shared/models/product/product';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { AppState } from '@app/store/app/app.state';
import { User } from '@shared/models/user/user';
import { Select, Store } from '@ngxs/store';
import { Subcategory } from '@shared/models/product/subcategory';
import { FormControl, FormGroup } from '@angular/forms';
import { CatalogService } from '@core/services/catalog.service';
import { AddCartProduct } from '@app/store/app/cart.actions';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.scss'],
})
export class ProductDetailsPageComponent implements OnInit {
  @Select(AppState.getUser)
  user$: Observable<User>;

  subscription = new Subscription();

  product$ = new BehaviorSubject<Product>({} as Product);

  subcategories$: Observable<Subcategory[]>;

  formGroup: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    price: new FormControl(),
    imageUrl: new FormControl(),
    subCategory: new FormControl(),
  });

  constructor(
    protected route: ActivatedRoute,
    private catalogService: CatalogService,
    private store: Store,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const subscription = this.route.data
      .pipe(
        map(({ product }) => {
          this.formGroup.patchValue({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            subCategory: product.subCategory,
          });

          return product;
        })
      )
      .subscribe(this.product$);

    this.subcategories$ = this.catalogService.getAllSubcategories();

    this.subscription.add(subscription);
  }

  isUserAdmin(): Observable<boolean> {
    return this.user$.pipe(
      map((user) => user.roles.map((role) => role.id).includes(2))
    );
  }

  updateProduct() {
    this.catalogService
      .updateProduct(this.formGroup.value)
      .subscribe((product: Product) => {
        this.product$.next(product);
      });
  }

  createProduct() {
    this.catalogService
      .createProduct(this.formGroup.value)
      .subscribe((product: Product) => {
        this.product$.next(product);
      });
  }

  addProductToCart(product: Product): void {
    this.store.dispatch(new AddCartProduct({ product, countProduct: 1 }));
  }

  addProductToFavourites(product: Product, user: User) {
    const subscription = this.userService
      .updateFavourites(product, user)
      .subscribe();
    this.subscription.add(subscription);
  }

  subcategoryChanges(e: Subcategory) {
    this.formGroup.patchValue({ subCategory: e });
  }
}