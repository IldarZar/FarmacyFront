import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {User} from "../../../../shared/models/user/user";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
  ) { }

  private subscription = new Subscription();

  formGroup: FormGroup = new FormGroup({
    login: new FormControl(),
    password: new FormControl(),
  });

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      console.log(data);
    })
  }

  login() {
    const subscription = this.authService
      .login(this.formGroup.get('login')?.value, this.formGroup.get('password')?.value)
      .subscribe(() => {
        this.router.navigate(['/catalog']);
      })

    this.subscription.add(subscription);
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}