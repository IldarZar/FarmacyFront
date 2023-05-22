import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Dictionary } from '@core/models/dictionary';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { Select } from '@ngxs/store';
import { AppState } from '@app/store/app/app.state';
import { User } from '@shared/models/user/user';
import {Nullable} from "@core/models/nullable";
import {MenuItem} from "@shared/models/menu-item";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  items$: Observable<MenuItem[]>;

  activeItem: Nullable<MenuItem>;

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
        icon: 'icon-card',
      },
      {
        id: 'order-history',
        name: 'История заказов',
        icon: 'icon-history',
      },
      {
        id: 'user-data',
        name: 'Личные данные',
        icon: 'icon-settings',
      },
    ];

    const subscription = this.user$.subscribe((user: User) => {
      if (
        user.roles.map(({ id }: Dictionary<number>) => id).includes(2) &&
        !tabs.find((tab) => tab.id === 'user-orders')
      ) {
        tabs.push({
          id: 'user-orders',
          name: 'Обработка заказов',
          icon: 'icon-orders',
        });
      }
      this.items$ = of<Dictionary<string>[]>(tabs);
    });
    this.activeItem = tabs.find(x => x.id === this.router.url.split('/')[2]) as MenuItem;

    this.subscription.add(subscription);
  }

  itemSelected(e: MenuItem) {
    if (e.id === 'exit') {
    } else {
      this.router.navigate(['dashboard', e.id]);
    }
  }

  logout(): void {
    this.subscription.add(
      this.userService.logout().subscribe((user) => {
        this.router.navigate(['catalog']);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
