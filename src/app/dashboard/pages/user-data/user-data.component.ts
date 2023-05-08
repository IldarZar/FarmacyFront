import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { DashboardService } from '@dashboard/services/dashboard.service';
import { map, Observable, Subscription, switchMap, take, tap } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { AppState } from '@app/store/app/app.state';
import { User } from '@shared/models/user/user';
import * as L from 'leaflet';
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

  private map!: L.Map;
  private markers: Map<string, L.Marker> = new Map();

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
          name: user.middleName,
          lastName: user.lastName,
          middleName: user.middleName,
          deliveryPoint: user.deliveryPoint,
        });
        return this.cartService
          .getAllDeliveryPoints()
          .pipe(map((deliveryPoints) => ({ deliveryPoints, user })));
      }),
      tap(({ deliveryPoints, user }) => {
        this.initMap(user);
        deliveryPoints.forEach((deliveryPoint: DeliveryPoint) => {
          const marker = L.marker([
            deliveryPoint.longitude,
            deliveryPoint.latitude,
          ])
            .addTo(this.map)
            .bindPopup(deliveryPoint.name);
          this.markers.set(deliveryPoint.name, marker);
        });

        this.markers.get(user.deliveryPoint.name)?.openPopup();
      }),
      map(({ deliveryPoints, user }) => deliveryPoints)
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

  initMap(user: User) {
    this.map = L.map('map', {
      center: [user.deliveryPoint.longitude, user.deliveryPoint.latitude],
      zoom: 12,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);
  }

  deliveryPointChanges(deliveryPoint: DeliveryPoint) {
    this.markers.get(deliveryPoint.name)?.openPopup();
    this.map.setView([deliveryPoint.longitude, deliveryPoint.latitude]);
    this.formGroup.patchValue({ deliveryPoint });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
