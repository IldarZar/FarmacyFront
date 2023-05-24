import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { DashboardService } from '@dashboard/services/dashboard.service';
import { Observable, Subscription, switchMap, take, tap } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { AppState } from '@app/store/app/app.state';
import { User } from '@shared/models/user/user';
import { UpdateUser } from '@app/store/app/user.actions';
import { DeliveryPoint } from '@shared/models/delivery-point';
import { CartService } from '@core/services/cart.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss'],
})
export class UserDataComponent implements OnDestroy {
  subscription = new Subscription();
  formGroup: FormGroup;
  deliveryPoints$: Observable<DeliveryPoint[]>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private cartService: CartService
  ) {}

  @Select(AppState.getUser)
  user$: Observable<User>;

  ngOnInit() {
    this.formGroup = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      middleName: new FormControl(),
      lastName: new FormControl(),
      deliveryPoint: new FormControl(),
    });

    this.deliveryPoints$ = this.user$.pipe(
      take(1),
      switchMap((user: User) => {
        this.formGroup.patchValue({
          id: user.id,
          name: user.name,
          lastName: user.lastName,
          middleName: user.middleName,
          deliveryPoint: user.deliveryPoint,
        });
        return this.cartService.getAllDeliveryPoints();
      })
    );
  }

  updateUserData() {
    const subscription = this.user$
      .pipe(
        take(1),
        tap((user) => {
          this.store.dispatch(
            new UpdateUser({
              user: {
                ...user,
                name: this.formGroup.get('name')?.value,
                middleName: this.formGroup.get('middleName')?.value,
                lastName: this.formGroup.get('lastName')?.value,
                deliveryPoint: this.formGroup.get('deliveryPoint')?.value,
              },
            })
          );
        })
      )
      .subscribe();

    this.subscription.add(subscription);
  }

  deliveryPointChanges(deliveryPoint: DeliveryPoint) {
    this.formGroup.patchValue({ deliveryPoint });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
