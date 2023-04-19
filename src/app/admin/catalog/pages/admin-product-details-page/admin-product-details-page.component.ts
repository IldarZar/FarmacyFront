import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from '@shared/models/product/product';
import { AdminCatalogService } from '@admin/catalog/services/admin-catalog.service';

@Component({
  selector: 'app-admin-product-details-page',
  templateUrl: './admin-product-details-page.component.html',
  styleUrls: ['./admin-product-details-page.component.scss'],
})
export class AdminProductDetailsPageComponent implements OnInit {
  product!: Product;

  formGroup: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    price: new FormControl(),
    imgUrl: new FormControl(),
    subCategory: new FormControl(),
  });

  constructor(
    private route: ActivatedRoute,
    private adminCatalog: AdminCatalogService
  ) {} // private route: ActivatedRoute

  ngOnInit(): void {
    this.product = this.route.snapshot.data[0];

    this.formGroup.patchValue({
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      imgUrl: this.product.imgUrl,
      subCategory: this.product.subCategory,
    });
  }

  updateProduct() {
    const product: Product = {
      id: this.formGroup.get('id')?.value,
      name: this.formGroup.get('name')?.value,
      price: +this.formGroup.get('price')?.value,
      imgUrl: this.formGroup.get('imgUrl')?.value,
      subCategory: this.formGroup.get('subCategory')?.value,
    } as Product;

    this.adminCatalog.updateProduct(product).subscribe((product) => {
      this.product = product;
    });
  }
}
