import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '@shared/models/product/product';

@Injectable({
  providedIn: 'root',
})
export class AdminCatalogService {
  constructor(private http: HttpClient) {}

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>('/products/' + product.id, product);
  }
}
