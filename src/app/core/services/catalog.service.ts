import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Product } from '@shared/models/product/product';
import { Category } from '@shared/models/product/category';
import { Subcategory } from '@shared/models/product/subcategory';
import { Nullable } from '@core/models/nullable';
import { SearchFilter } from '@shared/models/search-filter';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  searchText = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  private getContent(body: any) {
    return body.content;
  }

  private createParamsString(params: Nullable<SearchFilter>): string {
    return params
      ? Object.entries(params).reduce(
          (acc, [key, value]) => acc + `&${key}=${value ? value : ''}`,
          '?'
        )
      : '';
  }

  getCatalog(params: Nullable<SearchFilter> = null): Observable<Product[]> {
    // если указана подкатегория, то игнорируем категорию
    if (params?.subCategoryId) {
      return this.http
        .get(
          `/products${this.createParamsString({ ...params, categoryId: null })}`
        )
        .pipe(map(this.getContent));
    } else {
      return this.http
        .get(`/products${this.createParamsString(params)}`)
        .pipe(map(this.getContent));
    }
  }

  getCategories(): Observable<Category[]> {
    return this.http.get('/categories').pipe(map(this.getContent));
  }

  getCategoryId(id: number): Observable<Category> {
    return this.http.get<Category>('/categories/' + id);
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
    return this.http.get<Product>(`/products/${productId}`);
  }

  /**
   * [Admin] Обновление данных о товаре
   */
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>('/products/' + product.id, product);
  }

  /**
   * [Admin] Получение всех подкатегорий
   */
  getAllSubcategories() {
    return this.http
      .get<Subcategory[]>('/subcategories')
      .pipe(map(this.getContent));
  }
}
