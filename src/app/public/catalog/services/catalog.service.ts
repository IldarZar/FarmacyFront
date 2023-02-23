import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {map, Observable} from "rxjs";
import { Product } from "@app/public/catalog/models/catalog";

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(
    private http: HttpClient
  ) { }

  getCatalog(): Observable<Product[]> {
    // @ts-ignore
    return this.http.get('/apteka-api/products').pipe(map((products) => products.content));
  }
}
