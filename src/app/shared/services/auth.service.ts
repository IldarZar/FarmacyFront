import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  get() {
    this.httpClient.get('http://localhost:8888/apteka-api/categories').subscribe(res => console.log(res));
  }
}
