import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '@shared/models/product/product';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  constructor(private http: HttpClient) {}

  getFavouriteProducts(favouriteProductIds: number[]): Observable<Product[]> {
    return forkJoin(
      favouriteProductIds.map((favProdId) =>
        this.http.get<Product>(`/products/${favProdId}`)
      )
    );
  }
}
