import { Component, OnInit } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
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
  items$ = of<Dictionary<string>[]>([
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
  ]);

  activeItem: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
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
