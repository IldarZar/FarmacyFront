import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { User } from '@shared/models/user/user';
import { Observable, of, switchMap, tap } from 'rxjs';
import { Dictionary } from '@core/models/dictionary';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss'],
})
export class UserDataComponent {
  constructor(private route: ActivatedRoute) {}

  formGroup: FormGroup;

  ngOnInit() {
    this.route.data.subscribe(({ user }) => {
      this.formGroup = new FormGroup({
        name: new FormControl(''),
      });
    });
  }
}
