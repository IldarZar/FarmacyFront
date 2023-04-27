import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@dashboard/services/dashboard.service';
import { Observable } from 'rxjs';
import { UserOder } from '@shared/models/user-order';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss'],
})
export class UserOrdersComponent implements OnInit {
  orderHistory$: Observable<UserOder[]>;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.orderHistory$ = this.dashboardService.getOrderHistoryByDeliveryPoint();
  }
}
