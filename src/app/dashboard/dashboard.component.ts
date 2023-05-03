import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Dictionary } from '@core/models/dictionary';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { Select } from '@ngxs/store';
import { AppState } from '@app/store/app/app.state';
import { User } from '@shared/models/user/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  items$: Observable<Dictionary<string>[]>;

  activeItem: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  @Select(AppState.getUser)
  user$: Observable<User>;

  ngOnInit(): void {
    const tabs = [
      {
        id: 'bonus-card',
        name: 'Бонусная карта',
      },
      {
        id: 'order-history',
        name: 'История заказов',
      },
      {
        id: 'user-data',
        name: 'Личные данные',
      },
    ];

    const subscription = this.user$.subscribe((user: User) => {
      if (user.roles.map(({ id }: Dictionary<number>) => id).includes(2)) {
        tabs.push({
          id: 'user-orders',
          name: 'Обработка заявок',
        });
      }
      this.items$ = of<Dictionary<string>[]>(tabs);
    });
    this.activeItem = this.router.url.split('/')[2];

    this.subscription.add(subscription);
  }

  itemSelected(e: string) {
    if (e === 'exit') {

    } else {
      this.router.navigate(['dashboard', e]);
    }
  }

  logout(): void {
    this.userService.logout().subscribe((user) => {
      this.router.navigate(['catalog']);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
