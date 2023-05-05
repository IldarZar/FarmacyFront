import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from '@shared/models/product/product';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { CatalogService } from '@core/services/catalog.service';
import { Subcategory } from '@shared/models/product/subcategory';

@Component({
  selector: 'app-admin-product-details-page',
  templateUrl: './admin-product-details-page.component.html',
  styleUrls: ['./admin-product-details-page.component.scss'],
})
export class AdminProductDetailsPageComponent implements OnInit {
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
    private route: ActivatedRoute,
    private catalogService: CatalogService
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

  updateProduct() {
    const product: Product = {
      id: this.formGroup.get('id')?.value,
      name: this.formGroup.get('name')?.value,
      price: +this.formGroup.get('price')?.value,
      imageUrl: this.formGroup.get('imageUrl')?.value,
      subCategory: this.formGroup.get('subCategory')?.value,
    } as Product;

    this.catalogService.updateProduct(product).subscribe((product: Product) => {
      this.product$.next(product);
    });
  }

  // TODO: доделать, когда на бэке появятся изменения
  selectedItemChanges(e: Subcategory) {
    this.formGroup.patchValue({ subCategory: e });

    console.log(this.formGroup.value);
  }
}
