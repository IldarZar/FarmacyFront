import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { AppState } from '@app/store/app/app.state';
import { User } from '@shared/models/user/user';
import { Select } from '@ngxs/store';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
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
    return this.user$.pipe(
      take(1),
      map((user: User) => user?.roles?.map((role) => role.id)?.includes(2)),
      tap((isUserAdmin: boolean) => !isUserAdmin && this.router.navigate(['/']))
    );
  }
}
