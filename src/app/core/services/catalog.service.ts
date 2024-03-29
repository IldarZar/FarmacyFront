import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {Product} from '@shared/models/product/product';
import {Category} from '@shared/models/product/category';
import {Subcategory} from '@shared/models/product/subcategory';
import {Nullable} from '@core/models/nullable';
import {SearchFilter} from '@shared/models/search-filter';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  searchText = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  private getContent(body: any) {
    return body.content.sort(function (a: any, b: any) {
      return a.id - b.id || a.name.localeCompare(b.name);
    });
  }

  private createParamsString(params: Nullable<SearchFilter>): string {
    return params
      ? Object.entries(params).reduce(
          (acc, [key, value]) => acc + `&${key}=${value ? value : ''}`,
          '?'
        )
      : '';

    // return params
    //   ? Object.entries(params).reduce(
    //     (acc, [key, value]) => {
    //       if(!value) {
    //         return acc;
    //       }
    //       return acc + `&${key}=${value ? value : ''}`;
    //     },
    //     '?'
    //   )
    //   : '';
  }

  getCatalog(filter: Nullable<SearchFilter> = null): Observable<Product[]> {
    // если указана подкатегория, то игнорируем категорию
    if (filter?.subCategoryId) {
      return this.http
        .get(
          `/products${this.createParamsString({ ...filter, categoryId: null })}`
        )
        .pipe(map(this.getContent));
    } else {
      return this.http
        .get(`/products${this.createParamsString(filter)}`)
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

  getSubcategories(category?: Nullable<Category>): Observable<Subcategory[]> {
    return category
      ? this.http
          .get<Subcategory[]>('/subcategories/parentCategory/' + category.id)
          .pipe(map(this.getContent))
      : this.getAllSubcategories();
  }

  getSubcategoriesByCategory(): Observable<Subcategory[]> {
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
   * [Admin] Добавление нового товара
   */
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('/products', product);
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
