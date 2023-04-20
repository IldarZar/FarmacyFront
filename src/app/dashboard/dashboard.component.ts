import { Component, OnInit } from '@angular/core';
import {map, Observable, of, switchMap} from 'rxjs';
import { User } from '@shared/models/user/user';
import { Dictionary } from '@core/models/dictionary';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  currentUser$: Observable<User>;
  items$ = of<Dictionary[]>([
    {
      id: 1,
      name: 'Бонусная карта',
    },
    {
      id: 2,
      name: 'История заказов',
    },
    {
      id: 3,
      name: 'Личные данные',
    },
  ]);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.route.data.pipe(map(({ user }) => user));
  }

  logout(): void {
    this.userService.logout().subscribe((user) => {
      console.log(user);
      this.router.navigate(['catalog']);
    });
  }
}
