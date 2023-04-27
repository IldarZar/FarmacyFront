import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '@shared/models/user/user';
import { UserService } from '@app/core/services/user.service';
import { Nullable } from '@core/models/nullable';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<Nullable<User>> {
  constructor(private authService: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Nullable<User>> {
    // @ts-ignore
    const user = JSON.parse(localStorage.getItem('user')) as Nullable<User>;
    return of<Nullable<User>>(user);
  }
}
