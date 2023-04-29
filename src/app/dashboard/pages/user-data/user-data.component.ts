import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { DashboardService } from '@dashboard/services/dashboard.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss'],
})
export class UserDataComponent {
  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService
  ) {}

  formGroup: FormGroup;

  ngOnInit() {
    this.route.data.subscribe(({ user }) => {
      console.log(user);
      this.formGroup = new FormGroup({
        id: new FormControl(user.id),
        name: new FormControl(user.name),
        middleName: new FormControl(user.middleName),
        lastName: new FormControl(user.lastName),
      });
    });
  }

  updateUserData() {
    this.route.data
      .pipe(
        switchMap(({ user }) =>
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
}
