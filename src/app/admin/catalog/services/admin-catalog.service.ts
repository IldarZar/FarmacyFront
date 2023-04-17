import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../../../shared/models/product/product";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminCatalogService {

  constructor(
    private http: HttpClient,
  ) { }

  updateProduct(product: Product): Observable<Product> {
    console.log(product);
    return this.http.put<Product>('/products/' + product.id, product);
  }
}
