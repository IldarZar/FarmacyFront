import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { DashboardService } from '@dashboard/services/dashboard.service';
import {map, Observable, Subscription, tap} from 'rxjs';
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
export class UserOrdersComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
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

  selectedStatusFilter = {
    id: OrderStatus.IN_PROGRESS,
    name: 'В процессе',
  }

  ngOnInit(): void {
    this.statusFilterChanged(this.selectedStatusFilter);
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

  /**
   * Устанавливает новый статус для одного заказа
   */
  statusChanged(newStatus: Dictionary<number>, userOrder: UserOrder) {
    const subscription = this.dashboardService.setOrderStatus(userOrder, newStatus).subscribe(() => {
      this.formGroup.controls['userOrders'].controls
        .find((el) => el.controls['id'].value === userOrder.id)
        ?.patchValue({ status: newStatus });
    });

    this.subscription.add(subscription);
  }

  createFormGroup(userOrder: UserOrder) {
    return new FormGroup({
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
  }

  /**
   * Отвечает за фильтрацию всех заказов
   */
  statusFilterChanged(newStatus: Dictionary<number>) {
    const subscription = this.dashboardService
      // @ts-ignore
      .getOrderHistoryByDeliveryPoint((a, b) => (new Date(b.orderDateTime) - new Date(a.orderDateTime)))
      .pipe(
        map((userOrders: UserOrder[]) =>
          userOrders.filter(({ status }) => this.setStatus(status).id === newStatus.id)
        )
      )
      .subscribe((userOrders: UserOrder[]) =>
        this.formGroup.controls.userOrders = new FormArray<FormGroup>(
          userOrders.map((userOrder: UserOrder) => this.createFormGroup(userOrder))
        )
      )

    this.subscription.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
