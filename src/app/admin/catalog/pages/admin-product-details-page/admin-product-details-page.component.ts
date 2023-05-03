import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from '@shared/models/product/product';
import { BehaviorSubject, map } from 'rxjs';
import { CatalogService } from '@core/services/catalog.service';

@Component({
  selector: 'app-admin-product-details-page',
  templateUrl: './admin-product-details-page.component.html',
  styleUrls: ['./admin-product-details-page.component.scss'],
})
export class AdminProductDetailsPageComponent implements OnInit {
  product$ = new BehaviorSubject<Product>({} as Product);

  formGroup: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    price: new FormControl(),
    imgUrl: new FormControl(),
    subCategory: new FormControl(),
  });

  constructor(
    private route: ActivatedRoute,
    private catalogService: CatalogService
  ) {}

  ngOnInit(): void {
    this.route.data
      .pipe(
        map(({ product }) => {
          this.formGroup.patchValue({
            id: product.id,
            name: product.name,
            price: product.price,
            imgUrl: product.imgUrl,
            subCategory: product.subCategory,
          });

          return product;
        })
      )
      .subscribe(this.product$);
  }

  updateProduct() {
    const product: Product = {
      id: this.formGroup.get('id')?.value,
      name: this.formGroup.get('name')?.value,
      price: +this.formGroup.get('price')?.value,
      imgUrl: this.formGroup.get('imgUrl')?.value,
      subCategory: this.formGroup.get('subCategory')?.value,
    } as Product;

    this.catalogService.updateProduct(product).subscribe((product: Product) => {
      this.product$.next(product);
    });
  }
}
