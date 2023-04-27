import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Dictionary } from '@core/models/dictionary';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  items$: Observable<Dictionary<string>[]>;

  activeItem: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

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

    this.route.data.subscribe(({ user }) => {
      if (user.roles.map(({ id }: Dictionary<number>) => id).includes(2)) {
        tabs.push({
          id: 'user-orders',
          name: 'Обработка заявок',
        });
      }
      this.items$ = of<Dictionary<string>[]>(tabs);
    });
    this.activeItem = this.router.url.split('/')[2];
  }

  itemSelected(e: string) {
    this.router.navigate([e], { relativeTo: this.route });
  }

  logout(): void {
    this.userService.logout().subscribe((user) => {
      console.log(user);
      this.router.navigate(['catalog']);
    });
  }
}
