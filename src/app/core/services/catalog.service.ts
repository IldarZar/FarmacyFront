import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Product } from '@shared/models/product/product';
import { Category } from '@shared/models/product/category';
import { Subcategory } from '@shared/models/product/subcategory';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  constructor(private http: HttpClient) {}

  private getContent(body: any) {
    return body.content;
  }

  getCatalog(): Observable<Product[]> {
    return this.http.get('/products').pipe(map(this.getContent));
  }

  getCategories(): Observable<Category[]> {
    return this.http.get('/categories').pipe(map(this.getContent));
  }

  getSubcategoryId(id: number): Observable<Subcategory> {
    return this.http.get<Subcategory>('/subcategories/' + id);
  }

  getSubcategories(): Observable<Subcategory[]> {
    return this.http
      .get<Subcategory[]>('/subcategories')
      .pipe(map(this.getContent));
  }

  getProductById(productId: number): Observable<Product> {
    return this.http
      .get<Product>(`/products/${productId}`)
      .pipe(tap(console.log));
  }

  getCatalogByCategoryId(categoryId: number): Observable<Product[]> {
    return this.http
      .get(`/products/category/${categoryId}`)
      .pipe(map(this.getContent));
  }

  getCatalogBySubcategoryId(subcategoryId: number): Observable<Product[]> {
    return this.http
      .get(`/products/subcategories/${subcategoryId}`)
      .pipe(map(this.getContent));
  }

  /**
   * [Admin] Обновление данных о товаре
   */
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>('/products/' + product.id, product);
  }
}
