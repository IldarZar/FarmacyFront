import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {

  constructor() { }

  formGroup: FormGroup = new FormGroup({
    login: new FormControl(),
    password: new FormControl(),
  });

  ngOnInit(): void {

  }

  authorize() {
    console.log(this.formGroup.get('login'), this.formGroup.get('password'));
  }
}
