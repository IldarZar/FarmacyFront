import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../../shared/models/user/user";
import {BehaviorSubject, Observable, of, Subject, switchMap, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  private currentUser$ = new Subject<User | null>();

  getCurrentUser(): Observable<User> {
    if (localStorage.getItem('user')) {
      // @ts-ignore
      return of(JSON.parse(localStorage.getItem('user') as User));
    }

    // @ts-ignore
    return this.currentUser$;
  }

  login(login: string, password: string): Observable<User> {
    return this.http
      .get<User>(`/auth/login/?login=${ login }&password=${ password }`)
      .pipe(
        tap(user => {
          this.currentUser$.next(user);
          localStorage.setItem('user', JSON.stringify(user))
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser$.next(null);
  }
}
