import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { AppState } from '@app/store/app/app.state';
import { User } from '@shared/models/user/user';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  @Select(AppState.getUser)
  user$: Observable<User>;

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const [{ path }] = route.url;

    const isUserAuthorized = !!localStorage.getItem('user');

    // Если пользователь пытается войти по роуту /auth и ...
    if (path === 'auth') {
      // ...он авторизован, то перекидываем его на страницу с товарами
      if (isUserAuthorized) {
        this.router.navigate(['/catalog']);
      }

      // ...он не авторизован, тогда даем войти
      return true;
    }
    // Если пользователь пытается войти по другим роутам (dashboard)
    else {
      if (isUserAuthorized) return true;

      this.router.navigate(['/catalog']);
      return false;
    }
  }
}
