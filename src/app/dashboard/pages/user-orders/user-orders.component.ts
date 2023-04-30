import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@dashboard/services/dashboard.service';
import { Observable, switchMap } from 'rxjs';
import { UserOrder } from '@shared/models/user-order';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss'],
})
export class UserOrdersComponent implements OnInit {
  orderHistory$: Observable<UserOrder[]>;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.orderHistory$ = this.dashboardService.getOrderHistoryByDeliveryPoint();
  }

  setOrderStatus(userOrder: UserOrder) {
    this.orderHistory$ = this.dashboardService
      .setOrderStatus(userOrder)
      .pipe(
        switchMap(() => this.dashboardService.getOrderHistoryByDeliveryPoint())
      );
  }
}
