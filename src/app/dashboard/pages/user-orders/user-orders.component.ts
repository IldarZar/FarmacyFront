import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DashboardService } from '@dashboard/services/dashboard.service';
import { Observable, tap } from 'rxjs';
import { UserOrder } from '@shared/models/user-order';
import { OrderStatus } from '@shared/models/enums/order-status';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Dictionary } from '@core/models/dictionary';
import { User } from '@shared/models/user/user';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss'],
})
export class UserOrdersComponent implements OnInit {
  constructor(
    private dashboardService: DashboardService,
    private changeDetector: ChangeDetectorRef
  ) {}

  formGroup = new FormGroup({
    userOrders: new FormArray<FormGroup>([]),
  });

  statuses = [
    {
      id: OrderStatus.IN_PROGRESS,
      name: 'В процессе',
    },
    { id: OrderStatus.DONE, name: 'Выдан' },
    { id: OrderStatus.CANCELLED, name: 'Отменен' },
    { id: OrderStatus.EXPIRED, name: 'Закончился срок хранения' },
  ];

  orderHistory$: Observable<UserOrder[]>;
  ngOnInit(): void {
    this.orderHistory$ = this.dashboardService.getOrderHistoryByDeliveryPoint();

    this.dashboardService
      .getOrderHistoryByDeliveryPoint()
      .pipe(
        tap((userOrders) => {
          userOrders
            .sort(function(a: UserOrder, b: UserOrder){
              // @ts-ignore
              return new Date(b.orderDateTime) - new Date(a.orderDateTime);
            })
            .forEach((userOrder: UserOrder) => {
            this.formGroup.controls['userOrders'].push(
              new FormGroup({
                id: new FormControl(userOrder.id),
                orderDateTime: new FormControl(userOrder.orderDateTime),
                expectedDate: new FormControl(userOrder.expectedDate),
                lastStorageDay: new FormControl(userOrder.lastStorageDay),
                productOrder: new FormControl(userOrder.productOrder),
                sum: new FormControl(userOrder.sum),
                deliveryPoint: new FormControl(userOrder.deliveryPoint),
                status: new FormControl(this.setStatus(userOrder.status)),
                user: new FormControl<User>(userOrder.user),
              })
            );
          });
        })
      )
      .subscribe();
  }

  private setStatus(status: string | OrderStatus): {
    id: OrderStatus;
    name: string;
  } {
    switch (status) {
      case 'IN_PROGRESS':
        return this.statuses[0];
      case 'DONE':
        return this.statuses[1];
      case 'CANCELLED':
        return this.statuses[2];
      default:
        return this.statuses[3];
    }
  }

  statusChanged(newStatus: Dictionary<number>, userOrder: UserOrder) {
    console.log(newStatus, userOrder);

    this.dashboardService.setOrderStatus(userOrder, newStatus).subscribe(() => {
      this.formGroup.controls['userOrders'].controls
        .find((el) => el.controls['id'].value === userOrder.id)
        ?.patchValue({ status: newStatus });
    });
  }
}
