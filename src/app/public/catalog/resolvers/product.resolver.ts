import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Product } from '@shared/models/product/product';
import { HttpClient } from '@angular/common/http';
import { CatalogService } from '@public/catalog/services/catalog.service';

@Injectable({
  providedIn: 'root',
})
export class ProductResolver implements Resolve<Product> {
  constructor(
    private catalogService: CatalogService,
    private http: HttpClient
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product> {
    const productId = route.params['id'];

    return this.catalogService.getProductById(productId);
  }
}
