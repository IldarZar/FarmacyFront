import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {map, Observable, of} from "rxjs";
import { Product } from "@app/public/catalog/models/product";

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(
    private http: HttpClient
  ) { }

  getCatalog(): Observable<Product[]> {

    const data = of([
      {
        name: '123',
        price: 233,
        controlled: false,
        imgUrl: "https://athletic-store.ru/wp-content/uploads/2019/05/ppinkryr.jpg",
        category: {
          id: 2,
          name: 'Category1'
        }
      }  as Product,
      {
        name: '123',
        price: 233,
        controlled: false,
        imgUrl: "https://athletic-store.ru/wp-content/uploads/2019/05/ppinkryr.jpg",
        category: {
          id: 2,
          name: 'Category1'
        }
      }  as Product,
      {
        name: '123',
        price: 233,
        controlled: false,
        imgUrl: "https://athletic-store.ru/wp-content/uploads/2019/05/ppinkryr.jpg",
        category: {
          id: 2,
          name: 'Category1'
        }
      }  as Product,
      ]);

    return data;

    // @ts-ignore
    // return this.http.get('http://localhost:8888/apteka-api/products?name=test').pipe(map((products) => products.content));
  }
}
