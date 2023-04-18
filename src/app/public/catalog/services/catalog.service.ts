import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { Product } from '../../../shared/models/product/product';
import { Category } from '../../../shared/models/product/category';
import {Subcategory} from "../../../shared/models/product/subcategory";

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  constructor(private http: HttpClient) {}

  private getContent(body: any) {
    return body.content;
  }

  getCatalog(): Observable<Product[]> {

    this.http.post('/login', {
      "user_name": 'testt',
      'password': 'testt'
    }, {
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
          'Accept-Language': 'ru-RU,ru',
        }
      }
    )

    return this.http.get('/products').pipe(map(this.getContent));
  }

  getCategories(): Observable<Category[]> {
    return this.http.get('/categories').pipe(map(this.getContent));
  }

  getSubcategories(): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>('/subcategories').pipe(map(this.getContent));
  }

  getCatalogByCategoryId(categoryId: number): Observable<Product[]> {
    return this.http
          .get(`/products/category/${categoryId}`)
          .pipe(map(this.getContent));
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`/products/${productId}`).pipe(tap(console.log));
  }

  getCatalogBySubcategoryId(subcategoryId: number): Observable<Product[]> {
    return this.http
        .get(`/products/subcategories/${subcategoryId}`)
        .pipe(map(this.getContent));
  }
}
