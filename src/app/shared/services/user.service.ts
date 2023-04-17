import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  login(login: string, password: string) {
    return this.http.get<User>('/auth/login' + `?login=${login}&password=${password}`)
  }
}
