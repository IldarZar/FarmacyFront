import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '@dashboard/services/dashboard.service';
import { Observable } from 'rxjs';
import { UserOder } from '@shared/models/user-order';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit {
  orderHistory$: Observable<UserOder[]>;

  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.orderHistory$ = this.dashboardService.getOrderHistoryByUser();
  }
}
