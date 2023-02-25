import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Category } from "@app/public/catalog/models/category";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryAdminService {

  constructor(
    private http: HttpClient
  ) { }

  getCategories(): Observable<Category[]> {
    // @ts-ignore
    return this.http.get<Category[]>('/categories').pipe(map((categories) => categories.content));
  }

  addCategories() {
    const category = {
      name: 'категория2',
    }
    return this.http.post<Category[]>('/categories', category)
  }
}
