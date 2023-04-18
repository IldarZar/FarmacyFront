import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {User} from "../../shared/models/user/user";
import {AuthService} from "../../public/auth/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User> {

  constructor(private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    // @ts-ignore
    console.log(JSON.parse(localStorage.getItem('user')));
    // @ts-ignore
    const user = JSON.parse(localStorage.getItem('user')) as User;
    return of(user);
  }
}
