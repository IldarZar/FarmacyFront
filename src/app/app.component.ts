import {Component, Inject, InjectionToken, OnInit} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'farmacy';

  constructor(
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    // setInterval(() => {
    //   this.authService.get();
    // }, 2000)
  }
}
