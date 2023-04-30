import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '@app/core/services/user.service';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { AppState } from '@app/store/app/app.state';
import { User } from '@shared/models/user/user';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements OnDestroy {
  subscription = new Subscription();

  formGroup: FormGroup = new FormGroup({
    login: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: UserService
  ) {}

  @Select(AppState.getUser)
  user$: Observable<User>;

  login() {
    const subscription = this.authService
      .login(
        this.formGroup.get('login')?.value,
        this.formGroup.get('password')?.value
      )
      .subscribe(() => {
        this.router.navigate(['/catalog']);
      });

    this.subscription.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
