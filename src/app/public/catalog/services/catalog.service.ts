import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {map, Observable, of, tap} from "rxjs";
import { Product } from "@app/public/catalog/models/product";
import {Category} from "@app/public/catalog/models/category";

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(
    private http: HttpClient
  ) { }

  private getContent(body: any) {
    return body.content;
  }

  getCatalog(): Observable<Product[]> {
    return this.http.get('/products').pipe(map(this.getContent));
  }

  getCategories(): Observable<Category[]> {
    return this.http.get('/categories').pipe(map(this.getContent));
  }

  getCatalogByCategoryId(categoryId: number): Observable<Product[]> {
    return this.http.get(`/products/category/${categoryId}`).pipe(map(this.getContent));
  }
}
