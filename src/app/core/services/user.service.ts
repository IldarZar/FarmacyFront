import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, ReplaySubject, Subject, tap } from 'rxjs';
import { Nullable } from '@app/core/models/nullable';
import { User } from '@shared/models/user/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private currentUser$ = new ReplaySubject<Nullable<User>>(1);

  getCurrentUser(): Observable<Nullable<User>> {
    this.currentUser$.subscribe((res) => console.log(res));
    console.log(localStorage.getItem('user'));

    if (localStorage.getItem('user')) {
      // @ts-ignore
      const localUser = JSON.parse(localStorage.getItem('user')) as User;
      this.currentUser$.next(localUser);
    }

    // Если его там нет, то возвращаем currentUser$ со значением null
    return this.currentUser$;
  }

  login(login: string, password: string): Observable<User> {
    return this.http
      .get<User>(`/auth/login/?login=${login}&password=${password}`)
      .pipe(
        tap((user) => {
          this.currentUser$.next(user);
          localStorage.setItem('user', JSON.stringify(user));
        })
      );
  }

  logout() {
    return this.http.get('/auth/logout').pipe(
      tap(() => {
        this.currentUser$.next(null);

        localStorage.removeItem('user');
      })
    );
  }
}
