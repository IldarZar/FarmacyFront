import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { DashboardService } from '@dashboard/services/dashboard.service';
import { Observable, Subscription, switchMap } from 'rxjs';
import { Select } from '@ngxs/store';
import { AppState } from '@app/store/app/app.state';
import { User } from '@shared/models/user/user';
import * as L from 'leaflet';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss'],
})
export class UserDataComponent implements OnDestroy {
  subscription = new Subscription();
  formGroup: FormGroup;

  private map!: L.Map;
  private markers: Map<string, L.Marker> = new Map();

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService
  ) {}

  @Select(AppState.getUser)
  user$: Observable<User>;

  ngOnInit() {
    const subscription = this.user$.subscribe((user) => {
      this.formGroup = new FormGroup({
        id: new FormControl(user.id),
        name: new FormControl(user.name),
        middleName: new FormControl(user.middleName),
        lastName: new FormControl(user.lastName),
      });

      this.initMap(user);
    });
    this.subscription.add(subscription);
  }

  updateUserData() {
    this.user$
      .pipe(
        switchMap((user) =>
          this.dashboardService.updateUserData({
            ...user,
            name: this.formGroup.get('name')?.value,
            middleName: this.formGroup.get('middleName')?.value,
            lastName: this.formGroup.get('lastName')?.value,
          })
        )
      )
      .subscribe();
  }

  initMap(user: User) {
    this.map = L.map('map', {
      center: [user.deliveryPoint.longitude, user.deliveryPoint.latitude],
      zoom: 12,
    });

    L.marker([user.deliveryPoint.longitude, user.deliveryPoint.latitude]).addTo(
      this.map
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
